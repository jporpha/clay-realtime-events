# Clay Realtime Events – Tech Challenge Solution

## 🧩 Overview

This repository implements a **real‑time event ingestion platform** for Clay's technical challenge.  
It demonstrates scalable event processing using **Node.js, TypeScript, Express, MongoDB, Redis, and React** — following SOLID principles, clean architecture, and best practices for maintainability.

---

## 🏗️ Monorepo Structure

```
clay-realtime-events/
├── apps/
│   ├── api/            # Express API (REST + Metrics + Stream)
│   ├── worker/         # BullMQ Worker for event ingestion
│   └── web/            # React dashboard (metrics + events)
├── packages/
│   └── shared/         # DTOs, alert services, utilities
├── docker-compose.yml  # Services: MongoDB + Redis
├── .env.example        # Example environment configuration
├── README.md           # Documentation (this file)
└── pnpm-workspace.yaml
```

---

## ⚙️ Technologies

- **Backend:** Node.js + TypeScript + Express  
- **Queue Processing:** BullMQ + Redis  
- **Database:** MongoDB (Mongoose ODM)  
- **Frontend:** React + Vite + TypeScript + Recharts  
- **Testing:** Jest + ts-jest  
- **Dev Tools:** PNPM, ESLint, Docker, GitHub Actions  
- **Alerting (Bonus):** Slack webhook + SMTP (fallback to console)  

---

## 🚀 Quick Start

### 1️⃣ Clone & Install
```bash
git clone https://github.com/jporpha/clay-realtime-events.git
cd clay-realtime-events
pnpm install
```

### 2️⃣ Environment Variables
Copy `.env.example` to `.env` and fill with your local values:

```
MONGO_URI=mongodb://localhost:27017/clay-events
REDIS_HOST=localhost
REDIS_PORT=6379
SLACK_WEBHOOK_URL=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
ALERT_EMAIL_TO=
```

### 3️⃣ Start Services (Mongo + Redis)
```bash
docker compose up -d mongo redis
```

### 4️⃣ Run the system
```bash
pnpm run dev
```
That runs **API**, **Worker**, and **Web** simultaneously using `concurrently`.

Then visit:  
🔗 http://localhost:5173

---

## 🧠 Architecture Diagram

```
        ┌─────────────┐
        │   React UI  │
        └──────┬──────┘
               │ REST / Stream
               ▼
        ┌─────────────┐
        │   API (Express)
        │  /events /metrics /stream
        └──────┬──────┘
               │ BullMQ Queue
               ▼
        ┌─────────────┐
        │   Worker (BullMQ)
        │   Validates + Persists
        └──────┬──────┘
               │ MongoDB
               ▼
        ┌─────────────┐
        │   Database  │
        └─────────────┘
```

---

## 🔔 Alerts System (Bonus)

The shared package `alert.service.ts` defines an extensible system to send alerts through:
- **Slack Webhook** (if configured)
- **SMTP email** (if configured)
- Otherwise logs to console ✅

```ts
await sendSystemAlert('Database connection failed');
```

If neither Slack nor Mail are configured, the system prints the message safely without interrupting execution.

---

## 🧪 Testing & Reliability

All unit tests were implemented with **Jest + ts‑jest**, covering DTOs, controllers, alerts and environment sanity.

### 🧱 File structure
```
packages/shared/src/dto/event.dto.test.ts
packages/shared/src/alerts/alert.service.test.ts
apps/api/src/controllers/event.controller.test.ts
packages/shared/src/test-sanity.test.ts
```

### ▶ Run tests
```bash
pnpm run test
```

### ✅ Latest Test Results
```
 PASS  packages/shared/src/test-sanity.test.ts
  Sanity check
    √ runs Jest correctly (8 ms)

 PASS  packages/shared/src/dto/event.dto.test.ts
  EventDtoSchema
    √ accepts valid event (15 ms)
    √ rejects invalid event (12 ms)

 PASS  packages/shared/src/alerts/alert.service.test.ts
  sendSystemAlert
    √ should run without throwing when no transports are configured (16 ms)
    √ should handle Error objects gracefully (1 ms)

 PASS  apps/api/src/controllers/event.controller.test.ts
  POST /events
    √ should accept a valid event and return 202 (65 ms)
    √ should reject invalid event (11 ms)

Test Suites: 4 passed, 4 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        3.04 s
Ran all test suites.
```

All components behave as expected even with missing environment variables.

---

## 🧰 Docker & Deployment

### 🐳 Docker Compose
Build and run all components (Mongo + Redis + API + Worker + Web):

```bash
docker compose up --build
```

### ☁️ Deploy Targets
Ready for deployment on:
- **Render / Railway / AWS ECS / GCP Cloud Run / Vercel**
- SSL supported via Nginx proxy or hosting provider

---

## 🧩 CI/CD (optional setup)

A sample GitHub Action can be used for CI:

```yaml
name: Node CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - run: pnpm install
      - run: pnpm run test
```

---

## 📦 Deliverables Summary

✅ Express + TypeScript API  
✅ Worker (BullMQ + Redis)  
✅ MongoDB persistence  
✅ React dashboard with metrics & stream  
✅ Dockerized environment  
✅ CI/CD ready  
✅ Alerts via Slack/Email fallback  
✅ Jest unit tests (4 suites, 7 tests, 100% passing)  
✅ Comprehensive README + architecture diagram

---

## 🧠 Author

**Juan Pablo Orphanopoulos (JP Orpha)**  
💻 Software Engineer | 🎶 Music Producer  
🇨🇱 Santiago, Chile  
GitHub: [@jporpha](https://github.com/jporpha)


## 🧱 Autor

**Juan Pablo Orphanopoulos (JP Orpha)**  
Back End Engineer & Tech Lead  
🎵 También conocido como [JP Orpha](https://open.spotify.com/artist/4uYAkR5V3zWZACqkOMxG1H)

---
