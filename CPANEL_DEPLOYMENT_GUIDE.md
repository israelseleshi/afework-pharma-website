# 🚀 cPanel Deployment Guide for Afework Pharma Website

## 📋 **Pre-Deployment Checklist**

### **✅ Files Ready for Upload:**
- All source files (src/, public/, etc.)
- `server.js` (Express server with email functionality)
- `package.json` (with production dependencies)
- `build/` folder (after running `npm run build`)

### **✅ Email Configuration:**
- SMTP settings already configured for `afeworkpharmaet.com`
- Email credentials: `contact@afeworkpharmaet.com`
- Port 465 (SSL/TLS) - should work on most hosting providers

---

## 🔧 **Step-by-Step Deployment Process**

### **Step 1: Build Your Application Locally**
```bash
# Build the React application
npm run build

# This creates the 'build' folder with optimized files
```

### **Step 2: Upload Files to cPanel**
Upload these files/folders to your cPanel public_html directory:
- `server.js`
- `package.json`
- `build/` folder (entire folder)
- `public/` folder (for static assets)

### **Step 3: Install Dependencies on Server**
In cPanel Terminal or SSH:
```bash
cd public_html
npm install --production
```

### **Step 4: Configure Environment Variables**
Create a `.env` file in your public_html directory:
```env
NODE_ENV=production
PORT=3000
EMAIL_HOST=afeworkpharmaet.com
EMAIL_PORT=465
EMAIL_USER=contact@afeworkpharmaet.com
EMAIL_PASS=mQ+3HMm2(g)q.R758J!;Lb
```

### **Step 5: Start the Application**
```bash
# Start the production server
npm run production

# Or directly:
NODE_ENV=production node server.js
```

---

## 🌐 **Production URL Configuration**

### **How It Works in Production:**
- **Development**: `http://localhost:3000/send-message`
- **Production**: `https://www.afeworkpharmaet.com/send-message`

The code automatically detects the environment:
```javascript
const apiUrl = process.env.NODE_ENV === 'production' 
  ? '/send-message'  // Uses relative URL in production
  : 'http://localhost:3000/send-message';  // Full URL in development
```

---

## 📧 **Email Functionality in Production**

### **✅ What Works Automatically:**
- SMTP connection to `afeworkpharmaet.com:465`
- SSL/TLS encryption
- Email sending to `contact@afeworkpharmaet.com`
- Auto-reply emails to customers
- Professional HTML email templates with DM Sans font

### **✅ Expected Behavior:**
1. **User submits contact form** → `https://www.afeworkpharmaet.com`
2. **Form posts to** → `https://www.afeworkpharmaet.com/send-message`
3. **Server processes** → Validates and sends emails
4. **Two emails sent**:
   - Business notification → `contact@afeworkpharmaet.com`
   - Auto-reply → Customer's email
5. **Success message** → Vibrant celebration animation

---

## 🔧 **cPanel-Specific Configurations**

### **Option 1: Node.js App (Recommended)**
If your cPanel supports Node.js apps:
1. **Create Node.js App** in cPanel
2. **Set startup file**: `server.js`
3. **Set Node.js version**: 18+ (recommended)
4. **Environment variables**: Add production settings

### **Option 2: Process Manager**
If using PM2 or similar:
```bash
# Install PM2 globally
npm install -g pm2

# Start application with PM2
pm2 start server.js --name "afework-pharma"

# Save PM2 configuration
pm2 save
pm2 startup
```

### **Option 3: Manual Start**
```bash
# Navigate to your directory
cd public_html

# Start the server
nohup node server.js &
```

---

## 🚨 **Troubleshooting Common Issues**

### **Issue 1: "Cannot GET /" Error**
**Solution**: Ensure `build/` folder is uploaded and `server.js` serves static files correctly.

### **Issue 2: Email Not Sending**
**Possible Causes**:
- SMTP port blocked by hosting provider
- Email credentials incorrect
- SSL/TLS configuration issues

**Solutions**:
1. **Contact hosting support** to enable SMTP on port 465
2. **Verify email credentials** in cPanel email accounts
3. **Try alternative ports**: 587 (STARTTLS) or 25

### **Issue 3: 404 on /send-message**
**Solution**: Ensure Express server is running and routing is configured correctly.

### **Issue 4: CORS Errors**
**Solution**: Update CORS configuration in `server.js` if needed:
```javascript
app.use(cors({
  origin: ['https://www.afeworkpharmaet.com', 'https://afeworkpharmaet.com'],
  credentials: true
}));
```

---

## 📊 **Testing Your Deployment**

### **✅ Test Checklist:**
1. **Website loads** → `https://www.afeworkpharmaet.com`
2. **Navigate to Contact page** → Form displays correctly
3. **Submit test message** → No console errors
4. **Check email** → Both notification and auto-reply received
5. **Success animation** → Celebration message appears

### **🔍 Debugging Tools:**
- **Browser Console** → Check for JavaScript errors
- **Network Tab** → Verify API requests to `/send-message`
- **cPanel Error Logs** → Check server-side errors
- **Email logs** → Verify SMTP connections

---

## 🎯 **Production Optimization**

### **Performance Enhancements:**
- **Gzip compression** enabled
- **Static file caching** configured
- **CDN integration** (optional)
- **SSL certificate** installed

### **Security Measures:**
- **Environment variables** for sensitive data
- **HTTPS enforcement**
- **Rate limiting** on contact form
- **Input validation** and sanitization

---

## 📞 **Support & Maintenance**

### **Monitoring:**
- **Server uptime** monitoring
- **Email delivery** tracking
- **Error logging** and alerts
- **Performance metrics**

### **Updates:**
- **Regular dependency updates**
- **Security patches**
- **Feature enhancements**
- **Content updates**

---

## ✅ **Deployment Complete!**

Your Afework Pharma website is now ready for production with:
- ✅ **Professional contact form** with email functionality
- ✅ **Responsive design** across all devices
- ✅ **SEO optimization** for Ethiopian healthcare market
- ✅ **Professional email templates** with DM Sans font
- ✅ **Secure HTTPS** connection
- ✅ **Production-ready** performance

**🎉 Your website is live and ready to receive customer inquiries!**
