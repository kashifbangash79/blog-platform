# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY apps/blog-platform/package*.json ./app/
RUN npm install

# Copy all files
COPY . .

# Build the app
RUN npx nx build blog-platform

# Stage 2: Run
FROM node:18-alpine
WORKDIR /app

# Copy built files
COPY --from=builder /app/dist/apps/blog-platform ./dist
COPY --from=builder /app/node_modules ./node_modules

# Environment variables
ENV PORT=3006
ENV NODE_ENV=production
ENV DB_HOST=db
ENV DB_PORT=5432
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=kashif123
ENV DB_NAME=blog
ENV DB_SSL=false

EXPOSE $PORT
CMD ["node", "dist/main.js"]