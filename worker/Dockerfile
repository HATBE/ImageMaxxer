# worker/Dockerfile

# Use official Node.js 22 image
FROM node:22

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build TypeScript
RUN npm run build

# Use node to run compiled JavaScript
CMD ["node", "dist/app.js"]
