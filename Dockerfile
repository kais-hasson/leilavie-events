# ==============================
# Stage 1: Build Angular SSR app
# ==============================
FROM node:22-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy project
COPY . .

# Build production SSR application
RUN npm run build


# ==============================
# Stage 2: Run SSR server
# ==============================
FROM node:22-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production

# Copy built Angular application
COPY --from=build /app/dist ./dist

# Railway provides PORT dynamically
ENV PORT=3000

EXPOSE 3000

# Start Angular SSR server
CMD ["node", "dist/leilavie-events/server/server.mjs"]