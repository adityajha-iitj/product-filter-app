# Step 1: Build Vite app
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve using Nginx
FROM nginx:alpine

# Set environment variable (optional)
ENV PORT=8080

# Copy built app to nginx's default html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace Nginx default config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
