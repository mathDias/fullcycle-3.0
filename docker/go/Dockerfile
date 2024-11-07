FROM golang:1.23.3-alpine3.20 AS builder
WORKDIR /app
COPY app /app
RUN go build -v -ldflags="-s -w" -o ./ message.go

FROM scratch
WORKDIR /exec
COPY --from=builder /app .
CMD ["./message"]

