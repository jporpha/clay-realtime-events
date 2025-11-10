# ADR: Arquitectura Clay Realtime Events

## Contexto

Clay solicitó un sistema distribuido, escalable y observable para procesar eventos en tiempo casi real.

## Decisiones

- **Backend:** Node.js + TypeScript (Express)
- **Worker:** BullMQ + Redis
- **DB:** MongoDB
- **Frontend:** React + Vite + SSE
- **Infraestructura:** Render (API, Worker, Web) + Docker local

## Motivos

- Render simplifica el deploy y SSL sin costo adicional.
- Arquitectura desacoplada y portable a AWS o ECS.
- Worker y API escalan independientemente.
- Docker-compose permite replicar entorno local fácilmente.

## Estado

✅ **Aceptado** — Versión estable de entrega final.
