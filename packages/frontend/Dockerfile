FROM node:22-alpine as builder

RUN mkdir /app
WORKDIR /app

COPY $PWD/package*.json ./
COPY $PWD/lerna.json ./
COPY $PWD/nx.json ./

RUN npm ci

COPY $PWD/packages/common ./packages/common
COPY $PWD/packages/frontend ./packages/frontend

RUN npm install
RUN npm run bootstrap
RUN npm run build:fe

FROM node:22-alpine

RUN mkdir /app
WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/packages/frontend/node_modules /app/packages/frontend/node_modules
COPY --from=builder /app/packages/frontend/dist /app/packages/frontend/dist
COPY --from=builder /app/packages/frontend/.env /app/packages/frontend/dist/.env
COPY --from=builder /app/packages/frontend/package.json /app/packages/frontend/package.json
COPY --from=builder /app/packages/frontend/server.cjs /app/packages/frontend/server.cjs

COPY --from=builder --chown=node:node /app/packages/common/lib /app/packages/common/lib
COPY --from=builder --chown=node:node /app/packages/common/package.json /app/packages/common/package.json

WORKDIR /app/packages/frontend
CMD ["node", "server.cjs"]
