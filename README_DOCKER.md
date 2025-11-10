# Clay Realtime Events — Docker

## Entorno local

Levantar Mongo y Redis:
```bash
docker compose up -d mongo redis
```

Ejecutar servicios:
```bash
pnpm install
pnpm run dev:all
```

O versión completa:
```bash
docker compose up --build
```

Servicios:
- API → localhost:3000
- Frontend → localhost:5173
- MongoDB / Redis internos
