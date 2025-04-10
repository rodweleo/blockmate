# Use Node.js LTS version as base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the package
RUN npm run build

# Run tests
RUN npm test

# Set environment variables
ENV NODE_ENV=production

# Create a non-root user
RUN useradd -m -u 1000 nodeuser
USER nodeuser

# Default command (can be overridden)
CMD ["npm", "run", "build"] 