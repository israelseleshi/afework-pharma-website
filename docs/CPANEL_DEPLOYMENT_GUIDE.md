# 🚀 cPanel Deployment Guide - Afework Pharma CMS

## 📋 Pre-Deployment Checklist

### ✅ Database Setup Required
Before uploading files, you need to set up the database:

1. **Login to cPanel**
2. **Go to phpMyAdmin** (or MySQL Databases)
3. **Create Database** (if not exists): `afeworcn_afework_content`
4. **Run SQL Script**: Execute the contents of `database/cms_home_content.sql`

### ✅ Database Credentials Configured
The system is configured with these production credentials:
- **Host**: `mysql.lu-shared04.dapanel.net`
- **Database**: `afeworcn_afework_content`
- **Username**: `afeworcn_afework_admin`
- **Password**: `mQ+3HMm2(g)q.R758J!;Lb`

## 📁 Deployment Steps

### Step 1: Upload Build Folder
1. **Zip the build folder** or upload contents directly
2. **Upload to your domain's public_html directory**
3. **Extract if zipped**

### Step 2: Verify File Structure
After upload, your file structure should look like:
```
public_html/
├── index.html
├── assets/
│   ├── index-*.css
│   ├── index-*.js
│   └── ...
├── api/
│   ├── config/
│   │   └── database.php
│   ├── cms/
│   │   └── home-content.php
│   ├── test-db.php
│   ├── deployment-check.php
│   └── ...
└── ...
```

### Step 3: Database Setup
1. **Access phpMyAdmin** from cPanel
2. **Select database**: `afeworcn_afework_content`
3. **Import SQL file**: Upload and execute `database/cms_home_content.sql`
4. **Verify tables created**: Check that `cms_home_content` table exists

### Step 4: Test Deployment
1. **Visit your website**: `https://yourdomain.com`
2. **Test database connection**: `https://yourdomain.com/api/deployment-check.php`
3. **Test API endpoint**: `https://yourdomain.com/api/test-db.php`

## 🔧 Verification URLs

After deployment, test these URLs:

### 🏠 Main Website
- **Homepage**: `https://yourdomain.com`
- **Admin Dashboard**: `https://yourdomain.com/admin-dashboard`

### 🔍 API Testing
- **Deployment Check**: `https://yourdomain.com/api/deployment-check.php`
- **Database Test**: `https://yourdomain.com/api/test-db.php`
- **CMS API**: `https://yourdomain.com/api/cms/home-content.php`

## 🎯 Expected Results

### ✅ Successful Deployment
- **Homepage loads** with content from database
- **Admin dashboard** shows content management interface
- **Database connection** shows green success messages
- **API endpoints** return JSON responses

### ❌ Common Issues & Solutions

#### Database Connection Failed
**Problem**: "Unknown server host" or connection timeout
**Solution**: 
1. Verify database credentials in `api/config/database.php`
2. Check if database server allows external connections
3. Contact hosting provider if needed

#### Table Not Found
**Problem**: "Table cms_home_content does not exist"
**Solution**: 
1. Run the SQL script in phpMyAdmin
2. Verify database name is correct
3. Check table was created successfully

#### API 500 Errors
**Problem**: Internal server errors on API calls
**Solution**:
1. Check PHP error logs in cPanel
2. Verify file permissions (755 for directories, 644 for files)
3. Ensure PHP version is 7.4+ with PDO MySQL extension

## 📊 Database Schema

The CMS uses this table structure:
```sql
cms_home_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_type ENUM('hero', 'value_proposition', 'solutions_overview', 'featured_projects'),
    section_title VARCHAR(255),
    section_subtitle TEXT,
    section_description TEXT,
    content_data JSON,
    display_order INT,
    is_active BOOLEAN,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)
```

## 🔐 Admin Access

### Login Credentials
- **URL**: `https://yourdomain.com/admin-dashboard`
- **Username**: `admin`
- **Password**: `adm@123` (change after first login)

### Admin Features
- ✅ **Home Page Management**: Edit hero, value propositions, solutions, projects
- ✅ **Real-time Database Updates**: Changes save directly to MySQL
- ✅ **Loading States**: Professional UI with spinners and feedback
- ✅ **Error Handling**: Clear error messages and recovery options

## 🚀 Post-Deployment

### 1. Test All Features
- [ ] Homepage loads with database content
- [ ] Admin login works
- [ ] Content editing saves to database
- [ ] Changes appear on live website

### 2. Security Recommendations
- [ ] Change default admin password
- [ ] Set up SSL certificate (HTTPS)
- [ ] Regular database backups
- [ ] Monitor error logs

### 3. Performance Optimization
- [ ] Enable gzip compression
- [ ] Set up caching headers
- [ ] Optimize images
- [ ] Monitor database performance

## 📞 Support

If you encounter issues:
1. **Check deployment-check.php** for detailed diagnostics
2. **Review cPanel error logs**
3. **Verify database credentials and connectivity**
4. **Ensure all files uploaded correctly**

---

**🏥 Afework Pharma CMS** - Advanced Medical Solutions for a Healthier Ethiopia  
**Status**: Production Ready ✅  
**Last Updated**: $(date)
