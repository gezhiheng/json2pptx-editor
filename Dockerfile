FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM nginx:1.27-alpine

COPY deploy/nginx/container.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/website/out /usr/share/nginx/html
COPY --from=builder /app/apps/playground/dist /usr/share/nginx/html/playground

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz >/dev/null || exit 1
