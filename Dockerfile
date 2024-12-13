FROM rust:1.75 as builder

WORKDIR /usr/src/app
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
COPY --from=builder /usr/src/app/target/release/tippay-api /usr/local/bin/
CMD ["tippay-api"] 