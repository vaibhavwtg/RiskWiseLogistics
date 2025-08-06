#!/bin/bash

echo "Starting deployment..."

# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Build application
npm run build

# Run database migrations
npm run db:push

# Restart PM2 application
pm2 restart riskwisetech

# Reload Nginx
sudo systemctl reload nginx

echo "Deployment completed!"