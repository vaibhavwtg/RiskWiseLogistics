# RiskWise Tech - Ubuntu Server Deployment Guide

This guide covers deploying the RiskWise Tech application on Ubuntu server with PostgreSQL, Nginx, and PM2.

## Prerequisites

- Ubuntu 20.04 LTS or later
- PostgreSQL installed and running
- Node.js 18+ installed
- Nginx installed
- PM2 installed globally
- Git installed

## 1. Database Setup

### 1.1 Create Database and User

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database
CREATE DATABASE riskwisetech;

# Create user with password
CREATE USER riskwisetech_user WITH PASSWORD 'your_secure_password_here';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE riskwisetech TO riskwisetech_user;
GRANT ALL ON SCHEMA public TO riskwisetech_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO riskwisetech_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO riskwisetech_user;

# Exit PostgreSQL
\q
```

### 1.2 Configure PostgreSQL for TCP/IP connections

Edit PostgreSQL configuration:

```bash
sudo nano /etc/postgresql/14/main/postgresql.conf
```

Ensure these settings:
```
listen_addresses = 'localhost'
port = 5432
```

Edit pg_hba.conf:
```bash
sudo nano /etc/postgresql/14/main/pg_hba.conf
```

Add/ensure this line exists:
```
local   all             riskwisetech_user                               md5
host    all             riskwisetech_user   127.0.0.1/32               md5
```

Restart PostgreSQL:
```bash
sudo systemctl restart postgresql
```

## 2. Application Setup

### 2.1 Clone and Setup Application

```bash
# Navigate to web directory
cd /var/www

# Clone repository (replace with your actual repo)
sudo git clone https://github.com/yourusername/riskwisetech.git
sudo chown -R $USER:$USER /var/www/riskwisetech
cd riskwisetech

# Install dependencies
npm install

# Build the application
npm run build
```

### 2.2 Environment Configuration

Create production environment file:

```bash
nano .env
```

Add these variables (replace with your actual values):
```env
# Database Configuration
DATABASE_URL=postgresql://riskwisetech_user:your_secure_password@localhost:5432/riskwisetech
PGHOST=localhost
PGPORT=5432
PGUSER=riskwisetech_user
PGPASSWORD=your_secure_password
PGDATABASE=riskwisetech

# Application Configuration
NODE_ENV=production
PORT=3000
SESSION_SECRET=your_very_secure_session_secret_minimum_32_chars_long

# Server Configuration
HOST=0.0.0.0

# Optional: Formspree integration
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

### 2.3 Database Migration

Run database migration:

```bash
npm run db:push
```

## 3. Nginx Configuration

### 3.1 Create Nginx Site Configuration

```bash
sudo nano /etc/nginx/sites-available/riskwisetech
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Redirect HTTP to HTTPS (after SSL setup)
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL Configuration (after obtaining certificates)
    # ssl_certificate /path/to/your/certificate.crt;
    # ssl_certificate_key /path/to/your/private.key;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    # Static files
    location /assets/ {
        alias /var/www/riskwisetech/client/dist/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /favicon.png {
        alias /var/www/riskwisetech/client/public/favicon.png;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Proxy to Node.js application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # API routes
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # API timeout settings
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }
}
```

### 3.2 Enable Site and Test Configuration

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/riskwisetech /etc/nginx/sites-enabled/

# Remove default site if exists
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## 4. PM2 Configuration

### 4.1 Create PM2 Ecosystem File

```bash
nano ecosystem.config.js
```

Add this configuration:

```javascript
module.exports = {
  apps: [{
    name: 'riskwisetech',
    script: './server/index.ts',
    interpreter: 'node',
    interpreter_args: '--loader tsx',
    instances: 2, // or 'max' for all CPU cores
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOST: '0.0.0.0'
    },
    log_file: '/var/log/pm2/riskwisetech.log',
    out_file: '/var/log/pm2/riskwisetech-out.log',
    error_file: '/var/log/pm2/riskwisetech-error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024',
    watch: false,
    ignore_watch: ['node_modules', 'client/dist', 'logs'],
    restart_delay: 4000,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
```

### 4.2 Create Log Directory

```bash
sudo mkdir -p /var/log/pm2
sudo chown $USER:$USER /var/log/pm2
```

### 4.3 Start Application with PM2

```bash
# Start the application
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Generate startup script
pm2 startup

# Follow the instructions provided by the startup command
```

## 5. SSL Certificate Setup (Optional but Recommended)

### 5.1 Using Certbot (Let's Encrypt)

```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

## 6. Firewall Configuration

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 7. Monitoring and Maintenance

### 7.1 PM2 Commands

```bash
# Check application status
pm2 status

# View logs
pm2 logs riskwisetech

# Restart application
pm2 restart riskwisetech

# Stop application
pm2 stop riskwisetech

# Monitor resources
pm2 monit
```

### 7.2 Database Backup Script

Create a backup script:

```bash
nano /home/$USER/backup-db.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/home/$USER/backups"
DB_NAME="riskwisetech"
DB_USER="riskwisetech_user"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

PGPASSWORD="your_secure_password" pg_dump -h localhost -U $DB_USER $DB_NAME > $BACKUP_DIR/riskwisetech_$DATE.sql

# Keep only last 7 days of backups
find $BACKUP_DIR -name "riskwisetech_*.sql" -mtime +7 -delete
```

Make executable and add to crontab:
```bash
chmod +x /home/$USER/backup-db.sh

# Add to crontab for daily backups
crontab -e

# Add this line for daily backup at 2 AM
0 2 * * * /home/$USER/backup-db.sh
```

## 8. Deployment Script

Create deployment script for updates:

```bash
nano deploy.sh
```

```bash
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
```

Make executable:
```bash
chmod +x deploy.sh
```

## 9. Troubleshooting

### 9.1 Common Issues

**Database Connection Issues:**
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check database connectivity
psql -h localhost -U riskwisetech_user -d riskwisetech
```

**Application Issues:**
```bash
# Check PM2 logs
pm2 logs riskwisetech

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

**Performance Issues:**
```bash
# Check system resources
htop
pm2 monit
```

### 9.2 Log Locations

- Application logs: `/var/log/pm2/riskwisetech*.log`
- Nginx access logs: `/var/log/nginx/access.log`
- Nginx error logs: `/var/log/nginx/error.log`
- PostgreSQL logs: `/var/log/postgresql/postgresql-14-main.log`

## 10. Security Checklist

- [ ] PostgreSQL configured for local connections only
- [ ] Strong database passwords
- [ ] SSL certificates installed
- [ ] Firewall properly configured
- [ ] Regular security updates
- [ ] Database backups automated
- [ ] Application logs monitored
- [ ] Non-root user for application
- [ ] Fail2ban installed (optional)

## Support

For issues or questions, refer to the application documentation or contact the development team.