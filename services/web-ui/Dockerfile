################################
# Build assets
################################
FROM node:24.0.2-alpine as builder

ARG VITE_SENTRY_DSN

WORKDIR /app

COPY . .
RUN npm ci -D --legacy-peer-deps
RUN npm run build


################################
# Create server
################################
FROM node:24.0.2-alpine

WORKDIR /app

ENV PORT=80

COPY --from=builder /app/dist ./build
COPY server.js .
RUN npm i fastify @fastify/static

ENTRYPOINT [ "node" ]
CMD [  "server.js" ]
EXPOSE 80
