FROM node:20

WORKDIR /app

RUN corepack enable \
  && apt-get update \
  && apt-get install -y git \
  && rm -rf /var/lib/apt/lists/*

# Copy ONLY bootstrap code (not app code)
COPY bootstrap ./bootstrap

EXPOSE 8080

CMD ["node", "bootstrap/dev-supervisor.js"]
