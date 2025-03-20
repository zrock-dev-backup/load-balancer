FROM golang:1.22.7-alpine3.19 AS builder
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download
COPY . .

# Build the application with security flags
# CGO_ENABLED=0: Build a statically linked binary
# -ldflags="-s -w": Strip debug information to reduce binary size
# -trimpath: Remove file system paths from the resulting binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build \
    -ldflags="-s -w -extldflags '-static'" \
    -trimpath \
    -o /go/bin/app ./cmd/main.go

FROM alpine:3.19 AS production
#Non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app
COPY --from=builder /go/bin/app .
ENV GO_ENV=production \
    TZ=UTC-4
USER appuser
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:$PORT/ || exit 1
CMD ["./app"]
