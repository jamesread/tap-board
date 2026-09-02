FROM node:26-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY index.html vite.config.js logo.svg ./
COPY public ./public
COPY resources ./resources

RUN npm run build

FROM node:26-alpine

WORKDIR /app

LABEL org.opencontainers.image.source="https://github.com/jamesread/tap-board"

ENV PORT=8080
ENV HOST=0.0.0.0
ENV NODE_ENV=production

RUN npm install --omit=dev connect@3.7.0 serve-static@2.2.1 \
	&& npm cache clean --force

COPY --from=build /app/dist ./dist
COPY node-http-server.js ./

EXPOSE 8080

USER node

CMD ["node", "node-http-server.js"]
