# 🚀 Clay Realtime Events API  
**Backend para ingesta, monitoreo y publicación de eventos en tiempo real.**

---

## 🧩 Tecnologías principales
- **Node.js + Express**  
- **TypeScript + BullMQ + ioredis**  
- **MongoDB Atlas (Base de datos principal)**  
- **Redis (Upstash Cloud, TLS/SSL)**  
- **Swagger/OpenAPI Docs**  
- **Render.com Deployment**

---

## ⚙️ Estructura del monorepo

```
clay-realtime-events/
│
├── apps/
│   ├── api/          → API principal (Express)
│   ├── worker/       → Worker BullMQ (procesa eventos)
│   └── web/          → (futuro frontend opcional)
│
├── packages/
│   └── shared/       → Código compartido (DTOs, servicios de alertas, etc.)
│
├── docs/             → Documentación adicional
├── infra/            → Configuración Docker / Render
└── README_DEPLOY.md  → Este archivo ❤️
```

---

## 🧠 Variables de entorno

Ejemplo base para `.env`:

```bash
# ========================
# 🔌 Core Config
# ========================
NODE_ENV=production
PORT=3000

# ========================
# 🧠 MongoDB Atlas
# ========================
MONGO_URI=mongodb+srv://<user>:<password>@clay.lypx6qs.mongodb.net/?retryWrites=true&w=majority

# ========================
# ⚡ Redis (Upstash)
# ========================
REDIS_URL=rediss://default:<token>@prompt-joey-34650.upstash.io:6379

# ========================
# 📢 Alertas opcionales
# ========================
ALERT_EMAIL=your-email@example.com
ALERT_WEBHOOK=https://hooks.slack.com/services/XXXXX/YYYYY/ZZZZZ
```

---

## 🧱 Redis (Upstash) - configuración actual

Usamos **Upstash Redis**, con conexión **TLS habilitada**.  
Ya no se usa `REDIS_HOST` ni `REDIS_PORT`.  
La conexión se establece con una única URL segura.

### Ejemplo de conexión en código:
```ts
import { Redis } from 'ioredis';

export const redisConnection = new Redis(process.env.REDIS_URL || '', {
  tls: {}, // Requerido por Upstash
});
```

### Ejemplo de uso en BullMQ:
```ts
import { Queue, Worker } from 'bullmq';
import { redisConnection } from './queue';

export const eventsQueue = new Queue('events_queue', { connection: redisConnection });
export const eventsWorker = new Worker('events_queue', async (job) => {
  console.log('Processing event:', job.data);
}, { connection: redisConnection });
```

---

## 🌍 Despliegue en Render

### 1️⃣ Crear servicios

- **Web Service** → para `apps/api`
- **Background Worker** → para `apps/worker`
- Ambos conectados al mismo repositorio de GitHub.

### 2️⃣ Variables de entorno

Agregar en ambos servicios:

| Variable | Valor |
|-----------|--------|
| `NODE_ENV` | `production` |
| `PORT` | `3000` |
| `MONGO_URI` | *(Mongo Atlas connection string)* |
| `REDIS_URL` | *(Upstash Redis URL)* |
| `ALERT_EMAIL` | opcional |
| `ALERT_WEBHOOK` | opcional |

### 3️⃣ Build & Start Commands

**API (Web Service):**
```bash
cd apps/api && pnpm install && pnpm run build
```
Start:
```bash
node dist/index.js
```

**Worker (Background Worker):**
```bash
cd apps/worker && pnpm install && pnpm run build
```
Start:
```bash
node dist/index.js
```

---

## ✅ Verificación post-deploy

- Visita tu URL principal:
  ```
  https://clay-realtime-events.onrender.com/
  ```
  → Debe mostrar `🚀 Clay Realtime Events API is running!`

- Swagger UI:
  ```
  https://clay-realtime-events.onrender.com/docs
  ```

- OpenAPI JSON:
  ```
  https://clay-realtime-events.onrender.com/openapi.json
  ```

---

## 🧠 Troubleshooting

| Error | Causa | Solución |
|-------|--------|-----------|
| `ECONNREFUSED 127.0.0.1:6379` | Redis local inexistente | Configurar `REDIS_URL` de Upstash |
| `Cannot GET /` | No hay ruta raíz en Express | Agregar `app.get('/')` para status |
| `MongooseError: buffering timed out` | Mongo mal configurado | Revisar `MONGO_URI` y permitir IP en Atlas |
| `MODULE_NOT_FOUND @shared/...` | Alias no resuelto | Revisar `tsconfig.paths` y rebuild con `pnpm run build` |

---

## 🎉 Estado final esperado

Logs de Render:
```
✅ Redis connection established via Upstash
✅ Connected to MongoDB from API
✅ API listening on port 3000
==> Your service is live 🎉
```

---

👨‍💻 **Autor:** JP Orphanopoulos  
🧠 **Infra Stack:** Node.js · TypeScript · MongoDB Atlas · Upstash Redis · Render.com  
📅 **Última actualización:** Noviembre 2025
