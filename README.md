# Clay Realtime Events — Sistema de Ingesta y Visualización en Tiempo Real

Este proyecto implementa una **plataforma completa de ingesta, procesamiento y visualización en tiempo real de eventos**, diseñada para Clay.  
Integra **Node.js + Express + MongoDB + Redis + React**, con despliegue en **Render**, monitoreo, alertas y documentación OpenAPI.

---

## 🧱 1. Descripción general

El sistema recibe eventos en formato JSON, los encola mediante **Redis (Upstash)**, los procesa en un **Worker BullMQ**, los almacena en **MongoDB Atlas** y los muestra en un **Dashboard React** con métricas actualizadas en tiempo real.

---

## ⚙️ 2. Arquitectura técnica

**Componentes principales:**
- **API (Express):** expone endpoints REST (`/events`, `/metrics`, `/stream`, `/docs`).
- **Worker:** procesa los eventos encolados con BullMQ.
- **Frontend React (Vite):** muestra métricas y eventos.
- **MongoDB Atlas:** base de datos en la nube.
- **Redis (Upstash):** cola de mensajería para procesamiento asíncrono.
- **Render:** despliegue de servicios con SSL automático.

**Flujo general:**
1. El cliente envía un evento `POST /events`.
2. El evento se valida y se encola en Redis.
3. El worker procesa el evento y lo guarda en MongoDB.
4. El API expone métricas y flujos SSE.
5. El frontend consume los endpoints y renderiza en vivo.

---

## 🧩 3. Stack tecnológico

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

## ⚙️ 4. Configuración de entornos (local y producción)

El sistema Clay Realtime Events está diseñado para funcionar de forma idéntica tanto en entorno local como en producción (Render), utilizando variables de entorno para definir las direcciones base de los servicios.

🌍 Entorno local

En desarrollo local, el frontend se comunica con la API mediante la URL por defecto http://localhost:3000.
Esta configuración está implementada en el archivo:

apps/web/src/service/api.ts


Código relevante:

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10_000,
});


Esto permite que, si no se define la variable VITE_API_URL, el sistema funcione automáticamente apuntando al backend local.

Archivo .env en entorno local (apps/web/.env):

VITE_API_URL=http://localhost:3000


Para ejecutar todo el sistema localmente:

pnpm install
pnpm run dev:all


Esto levanta API, Frontend y Worker simultáneamente, comunicándose entre sí mediante las URLs locales.

☁️ Entorno en Render (producción)

En Render, la variable VITE_API_URL debe configurarse en las variables de entorno del servicio de frontend:

Variable	Valor
VITE_API_URL	https://clay-realtime-events.onrender.com

De este modo, el frontend desplegado en:

https://clay-realtime-frontend.onrender.com


se comunicará correctamente con la API activa en:

https://clay-realtime-events.onrender.com


No se requiere modificar ningún archivo del código para cambiar entre entornos:
el sistema detecta automáticamente la variable definida y ajusta las peticiones de red en tiempo de ejecución.

✅ Ventajas de esta configuración

Portabilidad total: el mismo código funciona sin cambios en cualquier entorno.

Separación clara de responsabilidades: cada servicio (API, Frontend, Worker) puede desplegarse, escalar o reiniciarse independientemente.

Facilidad de testing: los desarrolladores o revisores de Clay pueden ejecutar todo el sistema localmente sin necesidad de acceder a Render.

Mantenibilidad: futuras migraciones (por ejemplo, a AWS o Vercel) solo requerirían cambiar las variables .env, sin ajustes de código.


## 🧾 5. Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/jporphanopoulos/clay-realtime-events.git
cd clay-realtime-events

# Instalar dependencias
pnpm install

# Crear archivo de entorno
cp .env.example .env

# Levantar servicios Docker (Mongo + Redis locales)
docker compose up -d

# Ejecutar todo en modo desarrollo
pnpm run dev:all
```

---

## 🔑 6. Variables de entorno (.env)

```env
# Base
PORT=3000
NODE_ENV=development

# MongoDB Atlas
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/clay

# Redis (Upstash)
REDIS_URL=rediss://<clave>@<host>.upstash.io

# Alertas opcionales
ALERT_EMAILS=soporte@clay.com,devops@clay.com
```

---

## ☁️ 7. Despliegue en Render

**Servicios utilizados:**
- **Web Service (API):** build command `pnpm --filter api run build`, start `node dist/index.js`.
- **Worker:** build command `pnpm --filter worker run build`, start `node dist/index.js`.
- **Frontend:** `pnpm --filter web run build` con static site.

**Integraciones externas:**
- MongoDB Atlas: conexión externa en MONGO_URI.
- Redis Upstash: cola persistente REDIS_URL.
- SSL automático provisto por Render.

URL de despliegue:  
🔗 [https://clay-realtime-events.onrender.com](https://clay-realtime-events.onrender.com)

---

## 📡 8. Endpoints y documentación Swagger

### Swagger UI
➡️ [`/docs`](https://clay-realtime-events.onrender.com/docs)

### OpenAPI JSON
➡️ [`/openapi.json`](https://clay-realtime-events.onrender.com/openapi.json)

### Endpoints principales

#### ➤ POST /events
Recibe un evento JSON.

**Request**
```json
{
  "eventType": "login",
  "userId": "123",
  "timestamp": 1731000000000,
  "metadata": { "device": "mobile" }
}
```

**Response**
```json
{ "accepted": true }
```

#### ➤ GET /events
Obtiene eventos almacenados.

**Parámetros opcionales:** `type`, `from`, `to`, `limit`

**Response**
```json
[
  {
    "eventType": "login",
    "userId": "123",
    "timestamp": 1731000000000,
    "metadata": { "device": "mobile" },
    "ingestedAt": "2025-11-06T21:45:00Z"
  }
]
```

#### ➤ GET /metrics
Devuelve estadísticas por tipo de evento.

```json
{
  "totalEvents": 25,
  "byType": {
    "login": 12,
    "signup": 8,
    "logout": 5
  }
}
```

#### ➤ GET /stream
Canal SSE (Server-Sent Events) para monitoreo en tiempo real.

---

## 🧠 9. Alertas y manejo de fallos

- Sistema de alertas con **nodemailer** y **Slack (axios)**.  
- Se ejecutan automáticamente en caso de error crítico o fallo de conexión.  
- Variables configurables en `.env` (`ALERT_EMAILS`, `SLACK_WEBHOOK_URL`).

---

## 🧪 10. Tests unitarios (Jest)

Ejecutar todos los tests:

```bash
pnpm run test
```

**Resultado esperado:**
```
PASS  apps/api/src/controllers/event.controller.test.ts
PASS  packages/shared/src/alerts/alert.service.test.ts
PASS  packages/shared/src/dto/event.dto.test.ts
PASS  packages/shared/src/test-sanity.test.ts
Test Suites: 4 passed, 4 total
Tests:       7 passed, 7 total
```

---

## 📊 11. Dashboard React (Frontend)

El dashboard se desarrolló en **React + Vite + Chart.js**, con componentes:

- `EventsTable.tsx`: muestra lista paginada de eventos.  
- `MetricsPanel.tsx`: gráficos de métricas por tipo de evento.  
- `App.tsx`: página principal con navegación entre secciones.

Ejecutar localmente:

```bash
pnpm --filter web run dev
```

---

## 🧱 12. Estructura de carpetas

```
clay-realtime-events/
├── apps/
│   ├── api/                # Backend API
│   ├── worker/             # Procesador BullMQ
│   └── web/                # Frontend React
├── packages/
│   └── shared/             # DTOs, esquemas y servicios comunes
├── docker-compose.yml
├── README.md
└── .env.example
```

---

## 🧭 13. Estado final del proyecto

✅ API funcional  
✅ Worker operativo conectado a Redis Upstash  
✅ MongoDB Atlas activo y persistente  
✅ Dashboard React compilado correctamente  
✅ Documentación Swagger y OpenAPI  
✅ Tests Jest 100% verdes  
✅ Deploy Render con SSL automático  

---

## 👤 14. Autor

**Juan Pablo Orphanopoulos**  
Software Engineer | Tech Lead  
🎵 También conocido como [JP Orpha](https://open.spotify.com/artist/4uYAkR5V3zWZACqkOMxG1H)

---

© 2025 — Proyecto técnico para Clay — Todos los derechos reservados.



