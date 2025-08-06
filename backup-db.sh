#!/bin/bash
BACKUP_DIR="/home/$USER/backups"
DB_NAME="riskwisetech"
DB_USER="riskwisetech_user"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

PGPASSWORD="your_secure_password" pg_dump -h localhost -U $DB_USER $DB_NAME > $BACKUP_DIR/riskwisetech_$DATE.sql

# Keep only last 7 days of backups
find $BACKUP_DIR -name "riskwisetech_*.sql" -mtime +7 -delete