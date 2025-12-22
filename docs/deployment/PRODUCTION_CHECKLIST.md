# 🚀 Production Deployment Checklist - CMS System

## ✅ **Pre-Deployment Requirements**

### **1. Database Setup (CRITICAL)**
- [ ] **Login to DirectAdmin** → **phpMyAdmin**
- [ ] **Select your database**: `afeworcn_afework_content`
- [ ] **Run SQL script**: Copy and paste entire contents of `cms_schema.sql`
- [ ] **Verify tables created**:
  - `cms_admins` (admin users)
  - `cms_hero_content` (hero section content)
  - `cms_content_history` (change tracking)

### **2. Files to Upload**
- [ ] **Upload `cms-api.php`** to `public_html/cms-api.php`
- [ ] **Upload all `build/` contents** to `public_html/`
- [ ] **Upload `contact-directadmin-fix.php`** (email handler)
- [ ] **Upload `test-email.php`** (email testing)

### **3. File Permissions**
- [ ] **Set `cms-api.php`** to 644 permissions
- [ ] **Set all PHP files** to 644 permissions
- [ ] **Set directories** to 755 permissions

## 🔧 **Production Configuration**

### **API Endpoints (Automatic)**
- **Development**: Uses `/api/cms` (Node.js simulation)
- **Production**: Uses `/cms-api.php` (actual PHP + database)
- **Auto-detection**: Based on hostname (localhost vs afeworkpharmaet.com)

### **Database Connection**
The `cms-api.php` uses your existing database:
```php
$db_config = [
    'host' => 'mysql.lu-shared04.dapanel.net',
    'user' => 'afeworcn_afework_admin', 
    'password' => 'mQ+3HMm2(g)q.R758J!;Lb',
    'database' => 'afeworcn_afework_content'
];
```

## 🧪 **Testing After Deployment**

### **1. Database Verification**
- [ ] **Check phpMyAdmin**: Verify tables exist with data
- [ ] **Check admin user**: Should see username 'admin'
- [ ] **Check hero content**: Should see 3 default entries

### **2. CMS Login Test**
- [ ] **Visit**: `https://afeworkpharmaet.com/admin`
- [ ] **Login with**:
  - Username: `admin`
  - Password: `AfeworkAdmin2024!`
- [ ] **Should see**: Admin dashboard with hero content

### **3. Content Editing Test**
- [ ] **Edit hero headline** in admin panel
- [ ] **Save changes**
- [ ] **Visit homepage**: `https://afeworkpharmaet.com`
- [ ] **Verify**: Homepage shows updated headline

### **4. Database Changes Verification**
- [ ] **Check phpMyAdmin** → `cms_hero_content` table
- [ ] **Verify**: `content_value` field updated with new text
- [ ] **Check**: `updated_at` timestamp changed
- [ ] **Check**: `cms_content_history` table has change record

## 🎯 **Expected Results**

### **✅ Working CMS System:**
1. **Admin login works** at `/admin`
2. **Content editing** updates database in real-time
3. **Homepage reflects changes** immediately
4. **phpMyAdmin shows** updated records
5. **Change history** is tracked

### **✅ Database Integration:**
- **Real-time updates** to MySQL database
- **Persistent changes** (survive server restarts)
- **Change tracking** with timestamps
- **Admin authentication** via database

## 🔍 **Troubleshooting**

### **If Login Fails:**
1. **Check database connection** in `cms-api.php`
2. **Verify admin user exists** in `cms_admins` table
3. **Check PHP error logs** in DirectAdmin
4. **Test database access** via phpMyAdmin

### **If Content Doesn't Update:**
1. **Check `cms_hero_content` table** in phpMyAdmin
2. **Verify file permissions** (cms-api.php should be 644)
3. **Check browser console** for JavaScript errors
4. **Test API directly**: Visit `/cms-api.php` (should show JSON)

### **If Homepage Doesn't Change:**
1. **Clear browser cache** (Ctrl+F5)
2. **Check ContentContext** is fetching from CMS
3. **Verify homepage** is using `useContent` hook
4. **Check network tab** for API calls

## 📊 **Success Indicators**

### **✅ CMS Working:**
- Login redirects to dashboard
- Content fields are editable
- Save button works without errors
- Success messages appear

### **✅ Database Integration:**
- phpMyAdmin shows updated records
- Timestamps change when content updated
- History table tracks changes
- Admin sessions persist

### **✅ Homepage Integration:**
- Homepage loads updated content
- Changes appear without page refresh
- Statistics update correctly
- Fallback content works if API fails

## 🎉 **Deployment Complete!**

Once all checkboxes are ✅, your CMS system is fully operational:

- **Admins can login** at `/admin`
- **Content updates** in real-time
- **Database stores** all changes
- **Homepage reflects** latest content
- **Change history** is maintained

**Your website now has a professional Content Management System!** 🚀
