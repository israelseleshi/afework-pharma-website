# CMS Setup Guide for Afework Pharma Website

## Problem Analysis

The login errors you encountered indicate that the backend server is not running. Here's what's happening:

1. **ERR_CONNECTION_REFUSED on :3000/api/content/all** - Backend server not running
2. **404 Not Found on api/admin/login** - API endpoints not accessible  
3. **SyntaxError: Unexpected end of JSON input** - Failed to parse empty response

## Complete Solution

### Step 1: Install Dependencies

```bash
npm install dotenv
```

### Step 2: Create Environment Configuration

1. Copy the `.env.example` file to `.env`:
```bash
copy .env.example .env
```

2. Edit the `.env` file with your actual database credentials:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=afeworcn_afework_admin
DB_PASSWORD=YOUR_ACTUAL_DATABASE_PASSWORD
DB_NAME=afeworcn_afework_content

# JWT Secret for Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Email Configuration
EMAIL_HOST=afeworkpharmaet.com
EMAIL_PORT=465
EMAIL_USER=contact@afeworkpharmaet.com
EMAIL_PASS=mQ+3HMm2(g)q.R758J!;Lb

# Server Configuration
NODE_ENV=development
PORT=3000
```

### Step 3: Setup Database Tables

Run the database setup script to create required tables and admin user:

```bash
npm run setup-db
```

This will:
- Create the `admin_users` table
- Create the `site_content` table  
- Create the `media_library` table
- Add a default admin user with credentials: `admin` / `adm@123`

### Step 4: Start the Backend Server

```bash
npm run server
```

You should see:
```
✅ Database connection pool created
✅ SMTP Server is ready to send emails
🚀 Afework Pharma server running on port 3000
📧 Email service configured for contact@afeworkpharmaet.com
```

### Step 5: Start the Frontend (in another terminal)

```bash
npm run dev
```

### Step 6: Test the Login

1. Navigate to the admin login page
2. Use credentials:
   - **Username**: `admin`
   - **Password**: `adm@123`

## Alternative: Run Both Together

You can run both frontend and backend simultaneously:

```bash
npm run dev:full
```

## Troubleshooting

### Database Connection Issues

If you get database connection errors:

1. **Check MySQL is running**
2. **Verify database credentials** in `.env` file
3. **Ensure database exists** - create `afeworcn_afework_content` if needed
4. **Check user permissions** - ensure `afeworcn_afework_admin` has access

### Common Error Messages

- **"ECONNREFUSED"** - MySQL server not running
- **"ER_ACCESS_DENIED_ERROR"** - Wrong database credentials
- **"ER_BAD_DB_ERROR"** - Database doesn't exist

### Port Conflicts

If port 3000 is in use, change the PORT in `.env` file:
```env
PORT=3001
```

## Security Notes

1. **Change default password** after first login
2. **Use strong JWT_SECRET** in production
3. **Never commit `.env` file** to version control
4. **Use HTTPS** in production environment

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in `.env`
2. Use strong passwords and secrets
3. Configure proper database backups
4. Set up SSL certificates
5. Use process manager like PM2

## File Structure

```
afework-pharma-website/
├── .env                    # Environment variables (create this)
├── .env.example           # Environment template
├── setup-database.js      # Database setup script
├── server.js              # Backend server
├── src/
│   └── pages/
│       └── admin/
│           └── AdminLogin.tsx  # Enhanced login component
└── CMS_SETUP_GUIDE.md     # This guide
```

## Success Indicators

When everything is working correctly:

1. ✅ Backend server starts without errors
2. ✅ Database connection established
3. ✅ Admin login works with `admin`/`adm@123`
4. ✅ No console errors in browser
5. ✅ CMS dashboard loads after login

## Next Steps

After successful login:
1. Change the default admin password
2. Add content through the CMS interface
3. Upload media files
4. Configure additional admin users if needed

The CMS is now ready for content management!
