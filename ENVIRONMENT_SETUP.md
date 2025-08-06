# Environment Variables Setup

Create a `.env` file in the root directory of your project with the following variables:

## Required Environment Variables

```bash
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
SESSION_SECRET=your_very_secure_session_secret_minimum_32_characters_long

# Server Configuration
HOST=0.0.0.0
```

## Optional Environment Variables

```bash
# Contact form integration (replace with your Formspree endpoint)
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID

# Domain configuration (if using Replit authentication)
REPLIT_DOMAINS=your-domain.com
```

## Security Notes

1. **SESSION_SECRET**: Must be at least 32 characters long and cryptographically secure
2. **Database Password**: Use a strong password with mixed case, numbers, and special characters
3. **File Permissions**: Ensure `.env` file has restricted permissions (600)
4. **Version Control**: Never commit `.env` files to version control

## Generating Secure Values

```bash
# Generate a secure session secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate a secure database password
openssl rand -base64 32
```

## Setting File Permissions

```bash
chmod 600 .env
chown $USER:$USER .env
```