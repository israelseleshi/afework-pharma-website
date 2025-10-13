# Afework Pharma Website - cPanel Deployment Guide

## Overview
This guide provides step-by-step instructions for deploying the Afework Pharma website to cPanel shared hosting with enhanced security features.

## Prerequisites
- cPanel hosting account with Node.js support
- MySQL database access
- FTP/SFTP access to your hosting account
- Domain configured and pointing to your hosting

## Pre-Deployment Checklist

### 1. Environment Configuration
- [ ] Copy `env.production.example` to `.env`
- [ ] Update database credentials in `.env`
- [ ] Generate strong JWT secret: `openssl rand -base64 64`
- [ ] Configure email settings (SMTP)
- [ ] Set production domain in CORS_ORIGINS

### 2. Security Configuration
- [ ] Remove default admin credentials
- [ ] Set strong database passwords
- [ ] Configure secure file upload settings
- [ ] Review rate limiting settings

## Deployment Steps

### Step 1: Prepare Files for Upload

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Create deployment package:**
   ```bash
   # Create deployment directory
   mkdir afework-pharma-deployment
   
   # Copy necessary files
   cp -r build afework-pharma-deployment/
   cp -r public afework-pharma-deployment/
   cp -r uploads afework-pharma-deployment/
   cp server.js afework-pharma-deployment/
   cp package.json afework-pharma-deployment/
   cp .env afework-pharma-deployment/
   cp .htaccess afework-pharma-deployment/
   cp setup-database.js afework-pharma-deployment/
   cp -r scripts afework-pharma-deployment/
   ```

### Step 2: Upload to cPanel

1. **Access cPanel File Manager**
   - Login to your cPanel account
   - Navigate to File Manager
   - Go to your domain's public_html directory

2. **Upload Files**
   - Upload the entire `afework-pharma-deployment` folder
   - Extract if uploaded as ZIP
   - Move contents to public_html root

3. **Set Permissions**
   ```bash
   # Set proper permissions
   chmod 755 public_html
   chmod 644 public_html/*.js
   chmod 644 public_html/*.json
   chmod 755 public_html/uploads
   chmod 755 public_html/uploads/secure
   ```

### Step 3: Database Setup

1. **Create MySQL Database**
   - In cPanel, go to MySQL Databases
   - Create database: `afeworcn_afework_content`
   - Create user: `afeworcn_afework_admin`
   - Assign user to database with ALL PRIVILEGES

2. **Update Environment Variables**
   - Edit `.env` file with your database credentials
   - Update `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`

3. **Initialize Database**
   ```bash
   # Run database setup
   node setup-database.js
   ```

### Step 4: Node.js Application Setup

1. **Create Node.js Application**
   - In cPanel, go to Node.js Selector
   - Create new application
   - Set Node.js version (18.x or higher)
   - Set application root to your domain directory
   - Set application URL to your domain

2. **Install Dependencies**
   ```bash
   npm install --production
   ```

3. **Set Environment Variables**
   - In Node.js application settings
   - Add all variables from your `.env` file
   - Ensure `NODE_ENV=production`

### Step 5: Configure Apache (.htaccess)

The `.htaccess` file should be automatically created. If not, create it with:

```apache
RewriteEngine On

# Handle Angular and React Router
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [QSA,L]

# Security Headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Cache static assets
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 month"
</FilesMatch>
```

### Step 6: Start Application

1. **Start Node.js Application**
   - In cPanel Node.js Selector
   - Click "Start App" for your application
   - Check logs for any errors

2. **Verify Deployment**
   - Visit your domain
   - Test admin login: `/admin`
   - Test contact form
   - Check API endpoints: `/api/ping`

## Post-Deployment Configuration

### 1. Create Admin User
```bash
# Run the admin creation script
node scripts/create-admin.js
```

### 2. Configure Email
- Update SMTP settings in `.env`
- Test email functionality with contact form

### 3. Set Up Backups
```bash
# Create backup script
node scripts/backup-db.js
```

### 4. Security Hardening
- Remove development files
- Set up SSL certificate
- Configure firewall rules
- Enable security monitoring

## Troubleshooting

### Common Issues

1. **Application Won't Start**
   - Check Node.js version compatibility
   - Verify all environment variables are set
   - Check file permissions

2. **Database Connection Failed**
   - Verify database credentials
   - Check if database exists
   - Ensure user has proper permissions

3. **Email Not Working**
   - Verify SMTP settings
   - Check email provider credentials
   - Test with different ports (587, 465)

4. **File Upload Issues**
   - Check upload directory permissions
   - Verify file size limits
   - Check allowed file types

### Log Files
- Application logs: Check cPanel Node.js logs
- Error logs: `/error_logs/` directory
- Access logs: Available in cPanel

## Security Checklist

- [ ] All hardcoded credentials removed
- [ ] Strong JWT secret configured
- [ ] Database credentials secured
- [ ] File upload security enabled
- [ ] Rate limiting configured
- [ ] Security headers implemented
- [ ] SSL certificate installed
- [ ] Regular backups scheduled

## Maintenance

### Regular Tasks
- Monitor application logs
- Update dependencies monthly
- Backup database weekly
- Review security settings quarterly

### Updates
```bash
# Update dependencies
npm update

# Rebuild application
npm run build

# Restart application
# Use cPanel Node.js Selector
```

## Support

For technical support:
- Check application logs first
- Review this deployment guide
- Contact hosting provider for server issues
- Review security best practices

## Rollback Procedure

If issues occur after deployment:

1. **Stop Node.js Application**
2. **Restore from backup**
3. **Revert to previous version**
4. **Check logs for errors**
5. **Test functionality**

---

**Important:** Always test in a staging environment before deploying to production.
