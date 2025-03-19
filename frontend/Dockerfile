FROM node:20.19-alpine3.20 as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ENTRYPOINT [ "npm", "run", "dev" ]
