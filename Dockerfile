FROM node:20

WORKDIR /app

# Enable pnpm
RUN corepack enable

# Copy only lockfiles first (better caching)
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy the rest of the app
COPY . .

# Expose Next.js dev port
EXPOSE 3000

# Start Next.js dev server
CMD ["pnpm", "dev"]
