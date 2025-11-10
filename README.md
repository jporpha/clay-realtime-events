# Clay Realtime Events — Sistema de Ingesta y Visualización en Tiempo Real

Este proyecto implementa una **plataforma completa de ingesta, procesamiento y visualización en tiempo real de eventos**, diseñada para **Clay**.  
Integra **Node.js + Express + MongoDB + Redis + React**, con despliegue en **Render**, monitoreo y alertas.

---

## 1. Descripción general

El sistema recibe eventos JSON, los encola en **Redis (Upstash)**, los procesa en un **Worker BullMQ**, los almacena en **MongoDB Atlas**, y los muestra en un **Dashboard React** con métricas actualizadas en tiempo casi real.

---

## 2. Arquitectura técnica

### Componentes principales
- **API (Express):** expone endpoints REST (`/events`, `/metrics`, `/stream`, `/docs`).
- **Worker:** procesa eventos asincrónicamente desde Redis y los guarda en MongoDB.
- **Frontend (React + Vite):** muestra métricas y eventos en tiempo real.
- **MongoDB Atlas:** almacenamiento NoSQL optimizado para consultas por tipo y tiempo.
- **Redis (Upstash):** sistema de mensajería distribuida (BullMQ).
- **Render:** despliegue con SSL automático para todos los servicios.

### Flujo general
1. El cliente envía un evento `POST /events`.
2. La API valida y encola el evento en Redis.
3. El Worker procesa y guarda el evento en MongoDB.
4. La API expone flujos SSE (Server-Sent Events) y métricas.
5. El Frontend consume los endpoints y renderiza los datos en vivo.

---

## 3. Stack tecnológico

| Componente | Tecnología |
|-------------|-------------|
| Backend API | Node.js + Express + TypeScript |
| Worker | BullMQ + Redis (Upstash) |
| Base de datos | MongoDB Atlas |
| Frontend | React + Vite + Chart.js |
| Testing | Jest + ts-jest |
| CI/CD | Render Deploy |
| Documentación | Swagger / OpenAPI |

---

## 4. Configuración de entornos

El sistema está diseñado para funcionar de forma idéntica en **entornos locales y producción**, gracias a las variables `.env`.

### Entorno local
El frontend se comunica con la API en `http://localhost:3000`.

```bash
pnpm install
cp .env.example .env
docker compose up -d mongo redis
pnpm run dev:all
```

Esto levanta:
- **API** → http://localhost:3000  
- **Frontend** → http://localhost:5173  
- **MongoDB** y **Redis** en contenedores locales

---

### Entorno en Render (producción)

| Variable | Valor |
|-----------|--------|
| `VITE_API_URL` | `https://clay-realtime-api.onrender.com` |

**Servicios activos:**
- **Frontend:** https://clay-realtime-frontend.onrender.com  
- **API:** https://clay-realtime-api.onrender.com  

Ventajas:
- Despliegues independientes  
- SSL automático  
- Migración simple a AWS / Railway / ECS  

---

## 5. Instalación rápida (local)

```bash
git clone https://github.com/jporpha/clay-realtime-events.git
cd clay-realtime-events
pnpm install
cp .env.example .env
docker compose up -d
pnpm run dev:all
```

---

## 6. Variables de entorno (.env)

```env
# Base
PORT=3000
NODE_ENV=development

# MongoDB Atlas
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/clay

# Redis (Upstash)
REDIS_URL=rediss://<token>@<host>.upstash.io:6379

# Alertas
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
ALERT_EMAIL_FROM=alerts@clay.com
ALERT_EMAIL_TO=devops@clay.com
```

---

## 7. Despliegue en Render

| Servicio | Tipo | Build Command | Start Command |
|-----------|------|----------------|----------------|
| **API** | Web Service | `pnpm --filter api run build` | `node dist/index.js` |
| **Worker** | Background Worker | `pnpm --filter worker run build` | `node dist/index.js` |
| **Frontend** | Static Site | `pnpm --filter web run build` | N/A |

Integraciones externas:
- **MongoDB Atlas**
- **Redis Upstash**
- SSL automático incluido en Render

---

## 8. Decisiones técnicas (ADR resumen)

### 🔹 Worker como Background Worker
Render solo permite background workers en plan pago; por eso se configuró así.  
En local puede levantarse vía `docker-compose` o `pnpm dev`.

> **Motivo:** separación de responsabilidades y estabilidad en producción.  
> **Futuro:** escalar a AWS ECS o Cloud Run.

### 🔹 Redis Upstash con TLS
Configurado con `rediss://` y `maxRetriesPerRequest: null` para evitar errores `ECONNRESET`.

### 🔹 API con fallback React
Express sirve automáticamente `index.html` del frontend si no encuentra rutas.

---

## 9. Endpoints principales

### POST `/events`
```bash
curl -X POST https://clay-realtime-api.onrender.com/events   -H "Content-Type: application/json"   -d '{
    "eventType": "user_login",
    "userId": "u123",
    "timestamp": 1731180000000,
    "metadata": { "device": "mobile", "country": "CL" }
  }'
```

### GET `/events`
Obtiene eventos recientes desde MongoDB.

### GET `/stream`
Flujo **SSE** para eventos en tiempo real.

### GET `/docs`
Swagger UI con la documentación de la API.

---

## 10. Alertas y manejo de fallos

- Alertas configurables por Slack o Email.
- Reporte de errores críticos en API y Worker.
- Definido en `packages/shared/src/alerts/alert.service.ts`.

---

## 11. Frontend (React)

**Stack:** React + Vite + Chart.js + Axios + SSE  
**Componentes:**
- `EventsTable.tsx` — lista de eventos recientes  
- `MetricsPanel.tsx` — gráficos de métricas  
- `App.tsx` — vista principal (stream en vivo)

---

## 12. Estructura del monorepo

```
clay-realtime-events/
├── apps/
│   ├── api/        # API Express
│   ├── worker/     # BullMQ Worker
│   └── web/        # React Dashboard
├── packages/
│   └── shared/     # DTOs, alertas, utilidades
├── docker-compose.yml
├── README.md
└── .env.example
```

---

## 13. Estado final

| Componente | Estado |
|-------------|---------|
| API | ✅ Activa en Render |
| Worker | ✅ Procesando jobs |
| MongoDB | ✅ Persistencia estable |
| Redis | ✅ Upstash (TLS) |
| Frontend | ✅ Dashboard activo |
| Swagger | ✅ Documentación online |
| Docker | ✅ Ejecutable localmente |

---

## 14. Cumplimiento de Requerimientos y Puntos Bonus
| Categoría | Estado y	Descripción | 
|-------------|---------|
| Ingesta de eventos	| ✅	Endpoint /events en Node.js + TypeScript, validado con DTO y esquema Zod.| 
| Procesamiento	| ✅	Pipeline asíncrono con Redis (BullMQ) y Worker independiente.| 
| Almacenamiento	| ✅	Persistencia optimizada en MongoDB (índices por timestamp y tipo).| 
| Visualización en tiempo real	| ✅	Dashboard React con Server-Sent Events (SSE) y métricas.| 
| Tests unitarios	| ✅	Implementados con Jest y Supertest.| 
| Alertas	| ✅	Integración con Slack y soporte para envío por email (Nodemailer).| 
| Documentación técnica	| ✅	README completo + ADR + Swagger/OpenAPI.| 
| Contenedorización	| ✅	Docker Compose local para API, Worker, Redis y MongoDB.| 
| Infraestructura como código	| ✅	Configuración declarativa mediante docker-compose.yml y .env.example.| 
| CI/CD	| ✅	Despliegue automatizado en Render con build independiente por servicio.| 
| Certificado SSL	| ✅	HTTPS activo por Render (SSL automático).| 
| Entrega Git	| ✅	Repositorio GitHub público con historial de commits.| 
| Modelo de datos	| ✅	Esquema de Mongoose versionado en /models/event.model.ts.| 

**Resumen**
Todos los entregables fueron completados y desplegados con éxito.
El sistema está funcionando en entorno productivo y puede ser probado en tiempo real mediante los enlaces provistos.

---

## 15. Autor

**Juan Pablo Orphanopoulos**  
Software Engineer | Tech Lead  
🎵 También conocido como [JP Orpha](https://open.spotify.com/intl-es/artist/3REJn6StXyULabBENwXnhK?si=nRZRier2TdCBs_bum8R1pA)
