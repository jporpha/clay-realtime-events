# =========================
#  Clay Realtime Events API
# =========================
FROM node:18-alpine AS base

WORKDIR /usr/src/app

# Copiamos los archivos raíz del monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api ./apps/api
COPY packages ./packages

RUN npm install -g pnpm && pnpm install --filter api --prod

WORKDIR /usr/src/app/apps/api

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["pnpm", "start"]
