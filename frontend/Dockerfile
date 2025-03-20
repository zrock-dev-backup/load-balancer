FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS production
RUN addgroup -S nonrootgroup && adduser -S nonroot -G nonrootgroup
WORKDIR /app
RUN chown -R nonroot:nonrootgroup /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
ARG PORT=5000
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:$PORT/ || exit 1
USER nonroot
EXPOSE $PORT
CMD ["serve", "-s", "dist", "-l", "5000"]
