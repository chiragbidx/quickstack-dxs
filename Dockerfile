FROM node:20

WORKDIR /app

RUN corepack enable \
  && apt-get update \
  && apt-get install -y git \
  && rm -rf /var/lib/apt/lists/*

# Copy repo
COPY . .

# Install dependencies
RUN pnpm install

EXPOSE 8080

CMD ["node", "scripts/dev-supervisor.js"]
