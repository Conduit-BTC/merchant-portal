FROM oven/bun:1.1.9-alpine AS builder

WORKDIR /app

COPY . .

RUN bun install
RUN bun run build

FROM caddy:latest

WORKDIR /srv

COPY --from=builder /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile
