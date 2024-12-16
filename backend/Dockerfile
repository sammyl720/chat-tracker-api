# Stage 1: Build
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy backend package files
COPY backend/package.json backend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy backend source code
COPY backend/src ./src
COPY backend/tsconfig.json ./

# Build the backend
RUN npm run build

# Stage 2: Run
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy built backend from builder
COPY --from=builder /app/dist ./dist
COPY backend/package.json backend/package-lock.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the backend port
EXPOSE 8080

# Start the backend server
CMD ["node", "dist/server.js"]
