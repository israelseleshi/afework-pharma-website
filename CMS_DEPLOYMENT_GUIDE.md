# 🚀 CMS Deployment Guide for Afework Pharma Website

## 📋 **Pre-Deployment Checklist**

### **✅ Database Setup (Complete in cPanel)**
1. **Create MySQL Database** (already done):
   - Database name: `afeworcn_afework_content`
   - User: `afeworcn_afework_admin`

2. **Run SQL Commands in phpMyAdmin**:
   ```sql
   -- Create the main content table
   CREATE TABLE `site_content` (
     `id` INT AUTO_INCREMENT PRIMARY KEY,
     `section_key` VARCHAR(100) UNIQUE NOT NULL,
     `content_type` ENUM('text', 'html', 'json', 'image') DEFAULT 'text',
     `content_value` TEXT NOT NULL,
     `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );

   -- Create the media library table
   CREATE TABLE `media_library` (
     `id` INT AUTO_INCREMENT PRIMARY KEY,
     `filename` VARCHAR(255) NOT NULL,
     `original_name` VARCHAR(255) NOT NULL,
     `file_path` VARCHAR(500) NOT NULL,
     `file_type` VARCHAR(50) NOT NULL,
     `file_size` INT NOT NULL,
     `uploaded_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Create the admin users table
   CREATE TABLE `admin_users` (
     `id` INT AUTO_INCREMENT PRIMARY KEY,
     `username` VARCHAR(50) UNIQUE NOT NULL,
     `password_hash` VARCHAR(255) NOT NULL,
     `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### **✅ Files Ready for Upload**
- All source files (src/, public/, etc.)
- `server.js` (updated with CMS functionality)
- `package.json` (with new dependencies)
- `build/` folder (after running `npm run build`)
- `scripts/seedContent.js` (for initial data)

---

## 🔧 **Step-by-Step Deployment Process**

### **Step 1: Install Dependencies Locally**
```bash
# Install new dependencies
npm install

# Build the React application
npm run build
```

### **Step 2: Upload Files to cPanel**
Upload these files/folders to your cPanel `public_html` directory:
- ✅ `server.js` (updated with CMS)
- ✅ `package.json` (with new dependencies)
- ✅ `build/` folder (entire folder)
- ✅ `public/` folder (for static assets)
- ✅ `scripts/` folder (for seed script)

### **Step 3: Install Dependencies on Server**
In cPanel Terminal or SSH:
```bash
cd public_html
npm install --production
```

### **Step 4: Configure Environment Variables**
Create a `.env` file in your `public_html` directory:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=afeworcn_afework_admin
DB_PASSWORD=your_actual_database_password
DB_NAME=afeworcn_afework_content

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration
EMAIL_HOST=afeworkpharmaet.com
EMAIL_PORT=465
EMAIL_USER=contact@afeworkpharmaet.com
EMAIL_PASS=your_email_password

# Admin User
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Environment
NODE_ENV=production
PORT=3000
```

### **Step 5: Populate Database with Initial Content**
```bash
# Run the seed script to populate database
node scripts/seedContent.js
```

### **Step 6: Start Your Node.js Application**

**Option A: Node.js App (Recommended)**
1. In cPanel, go to **Node.js Apps**
2. Create a new Node.js app
3. Set startup file: `server.js`
4. Set Node.js version: 18+ (recommended)
5. Add environment variables from Step 4
6. Start the app

**Option B: Manual Start**
```bash
# Navigate to your directory
cd public_html

# Start the server
NODE_ENV=production node server.js
```

---

## 🎯 **CMS Features Available**

### **✅ Admin Dashboard Access**
- **URL**: `https://yourdomain.com/admin/login`
- **Default Credentials**: 
  - Username: `admin`
  - Password: `admin123`

### **✅ Content Management**
- **Hero Section**: Edit headline, subheadline, statistics
- **Value Propositions**: Manage 4 key value cards
- **Solutions**: Edit medical solutions and products
- **Projects**: Manage featured projects
- **About Page**: Edit mission, vision, timeline, team
- **Contact Info**: Update contact details
- **Media Library**: Upload and manage images

### **✅ API Endpoints**
- `GET /api/content/all` - Fetch all content
- `GET /api/content/:section` - Fetch specific section
- `PUT /api/content/:section` - Update content (protected)
- `GET /api/media` - List media files
- `POST /api/media/upload` - Upload images (protected)
- `POST /api/admin/login` - Admin authentication

---

## 🧪 **Testing Your CMS**

### **Step 1: Test Website**
1. **Website loads** → `https://yourdomain.com`
2. **Content displays** → All sections show current content
3. **Contact form works** → Emails are sent successfully

### **Step 2: Test Admin Access**
1. **Go to admin login** → `https://yourdomain.com/admin/login`
2. **Login with credentials** → `admin` / `admin123`
3. **Access dashboard** → See content management options
4. **Test content editing** → Make changes and verify they appear on website

### **Step 3: Test Content Updates**
1. **Edit hero section** → Change headline or statistics
2. **Update value propositions** → Modify descriptions
3. **Upload new images** → Test media library
4. **Verify changes** → Check website reflects updates

---

## 🔒 **Security Features**

### **✅ Authentication**
- JWT token-based authentication
- Password hashing with bcrypt
- Rate limiting on login attempts (5 attempts per 15 minutes)
- Token expiration (24 hours)

### **✅ Input Validation**
- All user inputs sanitized
- SQL injection protection
- File upload restrictions (images only, 5MB max)
- XSS prevention

### **✅ Access Control**
- Admin routes protected
- CORS configured for production domains
- Environment variables for sensitive data

---

## 📊 **Content Structure**

### **Editable Sections (28 total):**

**Home Page:**
1. Hero headline
2. Hero subheadline  
3. Hero statistics (3 numbers)
4. Value propositions (4 cards)
5. Solutions overview (5 solutions)
6. Featured projects (2 projects)

**About Page:**
7. Mission statement
8. Vision statement
9. Company timeline (4 milestones)
10. Leadership team (3 members)
11. Key achievements (4 items)

**Solutions Page:**
12-16. Full details for each solution (5 sections)

**Projects Page:**
17-18. Full project details (2 projects)

**Contact Page:**
19. Phone numbers
20. Email addresses
21. Physical address
22. Business hours
23. Department contacts (3 departments)
24. FAQ items (4 questions)

**Footer:**
25. Company description
26. Social media links
27. Quick links
28. Copyright text

---

## 🚨 **Troubleshooting**

### **Issue 1: Database Connection Error**
**Solution**: 
- Verify database credentials in `.env` file
- Check if database tables exist in phpMyAdmin
- Ensure MySQL service is running

### **Issue 2: Admin Login Not Working**
**Solution**:
- Check if admin user exists in database
- Verify JWT_SECRET is set
- Check server logs for authentication errors

### **Issue 3: Content Not Updating**
**Solution**:
- Verify API endpoints are accessible
- Check browser console for errors
- Ensure database connection is working

### **Issue 4: Images Not Uploading**
**Solution**:
- Check `public/uploads/` directory exists
- Verify file permissions (755)
- Check file size limits (5MB max)

---

## 📞 **Support & Maintenance**

### **Regular Tasks:**
- **Backup database** monthly
- **Update dependencies** quarterly
- **Monitor server logs** for errors
- **Test admin functionality** after updates

### **Security Updates:**
- **Change default admin password** immediately
- **Update JWT_SECRET** regularly
- **Monitor failed login attempts**
- **Keep dependencies updated**

---

## ✅ **Deployment Complete!**

Your Afework Pharma website now has:
- ✅ **Full Content Management System**
- ✅ **Password-protected admin dashboard**
- ✅ **Dynamic content editing**
- ✅ **Media library with upload**
- ✅ **Professional email functionality**
- ✅ **Secure authentication**
- ✅ **Production-ready performance**

**🎉 Your website is now fully manageable by non-technical users!**

### **Next Steps:**
1. **Change default admin password**
2. **Train content managers on CMS usage**
3. **Set up regular backups**
4. **Monitor system performance**

**Admin Access**: `https://yourdomain.com/admin/login`
**Default Login**: `admin` / `admin123` (change immediately!)

