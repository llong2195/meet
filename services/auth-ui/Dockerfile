################################
# Build assets
################################
FROM node:24.0.2-alpine as builder

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

COPY --from=builder /app/dist ./dist
COPY scripts/ ./scripts
COPY server.js .

RUN npm i fastify @fastify/static

ENTRYPOINT [ "sh" ]
CMD [  "scripts/entrypoint" ]
EXPOSE 80
