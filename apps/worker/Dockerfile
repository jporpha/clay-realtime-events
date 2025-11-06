# ==========================
#  Clay Realtime Worker
# ==========================
FROM node:18-alpine AS base

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/worker ./apps/worker
COPY packages ./packages

RUN npm install -g pnpm && pnpm install --filter worker --prod

WORKDIR /usr/src/app/apps/worker

ENV NODE_ENV=production

CMD ["pnpm", "start"]
