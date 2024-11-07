FROM golang:latest AS builder
WORKDIR /app
COPY app /app
RUN go build message.go

FROM scratch
WORKDIR /exec
COPY --from=builder /app .
CMD ["./message"]

