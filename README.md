
# Clay Realtime Events

A full‑stack real‑time events processing system built with **Node.js**, **Redis**, **MongoDB**, and **React (Vite + TypeScript)**.  
This project was developed as a technical challenge for the Tech Lead position at **Clay**.

---

## 🚀 Overview

The system ingests events through an HTTP API, processes them asynchronously via a Redis queue (BullMQ), stores them in MongoDB, and displays them in a live dashboard built with React using Server‑Sent Events (SSE).

**Stack summary:**

| Layer | Tech |
|-------|------|
| API | Node.js + Express + Zod |
| Worker | BullMQ + Redis + Mongoose |
| Database | MongoDB |
| Frontend | React + Vite + TypeScript + Recharts |
| Infrastructure | Docker Compose |
| Dev tools | pnpm + concurrently + eslint + prettier |

---

## 📂 Project Structure

```
clay-realtime-events/
│
├── apps/
│   ├── api/            → Express REST API for event ingestion and queries
│   ├── worker/         → Background processor (BullMQ)
│   └── web/            → React + Vite dashboard (metrics, stream, event list)
│
├── packages/
│   └── shared/         → Shared DTOs and schemas (Zod)
│
├── docker-compose.yml  → MongoDB + Redis + network
└── README.md
```

---

## 🧠 Architecture Flow

1. **Event ingestion:** Clients send events to `/events` via POST.
2. **Queueing:** Events are validated and added to Redis (`eventsQueue`).
3. **Processing:** The worker consumes events and stores them in MongoDB.
4. **Analytics:** `/metrics` aggregates events from the last 60s.
5. **Streaming:** `/stream` pushes live updates using Server‑Sent Events (SSE).
6. **Dashboard:** React frontend displays metrics, recent events, and live feed.

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js ≥ 18
- pnpm ≥ 9
- Docker Desktop running (for Mongo + Redis)

### 1. Clone the repo
```bash
git clone https://github.com/jporpha/clay-realtime-events.git
cd clay-realtime-events
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Start Docker services
```bash
docker compose up -d mongo redis
```

### 4. Run all apps
```bash
pnpm run dev:all
```

### 5. Access the dashboard
Frontend: http://localhost:5173  
API: http://localhost:3000

---

## 🧩 API Endpoints

| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/events` | Ingest new event |
| GET | `/events` | List events (filters by type, range, limit) |
| GET | `/metrics` | Metrics for the last 60s |
| GET | `/stream` | SSE stream for live updates |

### Example request
```bash
curl -X POST http://localhost:3000/events -H "Content-Type: application/json" -d '{"eventType":"login","userId":"123","timestamp":1730912345,"metadata":{"device":"mobile"}}'
```

The API normalizes timestamps automatically to milliseconds.

---

## 💻 Frontend Overview

The **React + Vite** dashboard includes:

- **MetricsPanel:** Recharts graph of event counts by type (auto‑refresh 5s)
- **LivePanel:** Real‑time SSE feed of most recent events
- **EventsTable:** Paginated view of stored events

All components use isolated hooks (`useEventsStream`, etc.) and TypeScript types for safety.

---

## 🧪 Development Details

### Scripts
| Command | Description |
|----------|-------------|
| `pnpm run dev` | Run API, Worker, or Web individually |
| `pnpm run dev:all` | Run all 3 concurrently |
| `docker compose up -d` | Start Mongo + Redis |
| `docker compose down` | Stop containers |

### Installed libraries (main)
**Backend**
- express
- mongoose
- bullmq
- redis
- zod
- dotenv
- cors
- ts-node-dev

**Frontend**
- react, react-dom
- vite, typescript
- axios
- date-fns
- recharts

**Dev tools**
- concurrently
- @types/node, @types/express, @types/cors

---

## 🧱 Design Principles

- ✅ **SOLID & Clean Code:** Each module with single responsibility (API routes, controllers, models, services).
- ✅ **DTO validation:** Shared schemas via Zod.
- ✅ **Queue‑based scalability:** Redis + BullMQ decouple ingestion and persistence.
- ✅ **Reactive UI:** SSE for true real‑time visualization.
- ✅ **Dockerized environment:** Reproducible local setup.
- ✅ **Type‑safe front and back:** Full TypeScript across layers.

---

## 🧩 Future Improvements

- Authentication & multi‑tenant event tracking  
- Historical metrics persistence  
- Real‑time WebSocket alternative (optional)  
- CI/CD with GitHub Actions  
- Cloud deploy (Render, Railway, or AWS ECS)  

---

## ✨ Author
**Juan Pablo Orphanopoulos (JP Orpha)**  
Full‑stack Engineer · Tech Lead candidate for Clay  
📧 jporpha@gmail.com

---
