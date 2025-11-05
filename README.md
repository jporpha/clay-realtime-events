# Clay Realtime Events

Sistema de procesamiento y visualización de eventos en tiempo real.

## 🚀 Objetivo
Demostrar diseño arquitectónico, escalabilidad y buenas prácticas con Node.js, TypeScript, Redis, MongoDB y React.

## 🧩 Arquitectura general
```
web (React)
   │
   ▼
api (Express + TS) → Redis Queue → worker (Node)
                          │
                          ▼
                       MongoDB
```

- **API:** recibe eventos (`POST /events`), los valida y los encola.
- **Worker:** consume desde Redis, los procesa y guarda en Mongo.
- **MongoDB:** almacena los eventos y permite agregaciones.
- **React (Vite):** muestra eventos y métricas en vivo.
- **Redis:** buffer asíncrono de alta velocidad.

## 🧰 Tecnologías
| Capa | Stack |
|------|--------|
| Backend | Node.js + TypeScript + Express |
| Cola | Redis + BullMQ |
| Base de datos | MongoDB |
| Frontend | React + Vite + TypeScript |
| Testing | Jest + Supertest |
| Infra | Docker + docker-compose |

## ⚙️ Instalación local
```bash
# 1. Clonar el repo
git clone https://github.com/jporpha/clay-realtime-events.git
cd clay-realtime-events

# 2. Crear archivo .env a partir del ejemplo
cp .env.example .env

# 3. Levantar todo
docker-compose up --build
```

Servicios:
- API → http://localhost:3000  
- Worker (background)  
- Mongo → mongodb://localhost:27017  
- Redis → localhost:6379  
- Web → http://localhost:5173

## 📡 Endpoints principales
| Método | Endpoint | Descripción |
|--------|-----------|-------------|
| POST | `/events` | Encola un evento |
| GET | `/events` | Lista eventos (filtros por tipo / fecha) |
| GET | `/metrics` | Métricas de ingestión |
| GET | `/stream` | SSE: flujo en vivo |

## 🧪 Tests
```bash
pnpm test
```

## 🧱 Estructura de carpetas
```
apps/
 ├─ api/
 ├─ worker/
 └─ web/
packages/shared/
infra/
docs/
```

## 🔐 Variables de entorno
Revisar `.env.example` para configuración de Redis, Mongo, y puertos.

## 🚀 Deploy sugerido
- API / Worker: Render o Railway  
- Web: Vercel  
- DB: MongoDB Atlas  
- Redis: Upstash o ElastiCache  
- CI/CD: GitHub Actions

## 🧭 ADRs
- [ADR-0001](docs/ADR-0001-node-ts-mongo-redis.md): Elección de arquitectura base.
