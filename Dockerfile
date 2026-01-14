FROM node:20

WORKDIR /app

# Enable pnpm + install git
RUN corepack enable \
  && apt-get update \
  && apt-get install -y git \
  && rm -rf /var/lib/apt/lists/*

EXPOSE 8080

CMD ["pnpm", "dev"]
