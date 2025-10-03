FROM node:22-alpine as builder

RUN mkdir /app
WORKDIR /app

COPY $PWD/package*.json ./
COPY $PWD/lerna.json ./
COPY $PWD/nx.json ./

RUN npm ci

COPY $PWD/packages/common ./packages/common
COPY $PWD/packages/backend ./packages/backend

RUN npm install
RUN npm run bootstrap
RUN npm run build:be

FROM node:22-alpine

RUN mkdir /app
WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/packages/backend/node_modules /app/packages/backend/node_modules
COPY --from=builder /app/packages/backend/dist /app/packages/backend/dist
COPY --from=builder /app/packages/backend/.env /app/packages/backend/dist/.env

COPY --from=builder --chown=node:node /app/packages/common/lib /app/packages/common/lib
COPY --from=builder --chown=node:node /app/packages/common/package.json /app/packages/common/package.json

WORKDIR /app/packages/backend/dist
CMD ["node", "--env-file=.env", "main.js"]