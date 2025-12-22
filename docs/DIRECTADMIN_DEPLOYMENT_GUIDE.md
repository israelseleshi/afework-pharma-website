# DirectAdmin Deployment Guide - Afework Pharma Website

## 🎯 Pure PHP Email Solution - Ready for DirectAdmin

This guide provides step-by-step instructions for deploying the Afework Pharma website to DirectAdmin hosting with **PHP-only email functionality**.

## 📋 Pre-Deployment Checklist

### ✅ Files Ready for Upload:
- `build/` folder (React app compiled)
- `contact-handler.php` (PHP email handler)
- `test-email.php` (Email testing script)

### ✅ Email Configuration:
- **Recipient**: contact@afeworkpharmaet.com
- **Method**: PHP mail() function
- **No SMTP required**: Works with DirectAdmin's built-in mail system
- **No auto-reply**: Only sends to business email as requested

## 🚀 Deployment Steps

### Step 1: Build the React Application
```bash
npm run build
```
This creates a `build/` folder with all compiled files.

### Step 2: Upload Files to DirectAdmin
1. **Login to DirectAdmin** at your hosting control panel
2. **Go to File Manager**
3. **Navigate to public_html directory**
4. **Upload all contents** of the `build/` folder to `public_html/`
5. **Upload PHP files**:
   - `contact-handler.php` → `public_html/contact-handler.php`
   - `test-email.php` → `public_html/test-email.php`

### Step 3: Set File Permissions
Set the following permissions via File Manager:
- `contact-handler.php`: 644 (read/write for owner, read for others)
- `test-email.php`: 644 (read/write for owner, read for others)
- All other files: 644
- Directories: 755

### Step 4: Test Email Functionality
1. **Visit**: `https://afeworkpharmaet.com/test-email.php`
2. **Check the test results**:
   - ✅ PHP mail() function available
   - ✅ Test email sent successfully
   - ✅ Contact form simulation works

### Step 5: Test Contact Form
1. **Visit**: `https://afeworkpharmaet.com/contact`
2. **Fill out the contact form** with test data
3. **Submit the form**
4. **Check email**: contact@afeworkpharmaet.com should receive the inquiry

## 📧 Email Configuration Details

### How It Works:
```php
// Uses DirectAdmin's built-in PHP mail() function
$to = 'contact@afeworkpharmaet.com';
$subject = 'New Website Inquiry: ' . $inquiryType;
$headers = 'From: noreply@afeworkpharmaet.com';

$result = mail($to, $subject, $message, $headers);
```

### Email Content Includes:
- Customer name, email, phone, organization
- Inquiry type and message
- Submission timestamp (Ethiopia Time)
- IP address and user agent for security
- Professional formatting

### Security Features:
- Rate limiting (3 submissions per minute)
- Input validation and sanitization
- XSS protection
- CSRF headers
- Error logging

## 🔧 Troubleshooting

### If Emails Don't Send:
1. **Check PHP mail() function**:
   - Visit `/test-email.php`
   - Verify "PHP mail() function is available" shows ✅

2. **Check email account**:
   - Ensure contact@afeworkpharmaet.com exists in DirectAdmin
   - Check spam/junk folders

3. **Check server logs**:
   - Look for `contact_form.log` in the same directory
   - Check DirectAdmin error logs

4. **Common Issues**:
   - **Mail function disabled**: Contact hosting provider
   - **Email account doesn't exist**: Create in DirectAdmin Email Accounts
   - **Server mail limits**: Check with hosting provider

### Debug Information:
The contact handler provides detailed debug information:
```json
{
  "success": true,
  "debug": {
    "timestamp": "2025-10-13 14:30:00 EAT",
    "to": "contact@afeworkpharmaet.com",
    "php_version": "8.1.0",
    "mail_function": "available"
  }
}
```

## 📁 File Structure After Deployment

```
public_html/
├── index.html                 (React app entry point)
├── assets/                    (CSS, JS, images)
│   ├── index-[hash].css
│   ├── index-[hash].js
│   └── ...
├── contact-handler.php        (Email handler)
├── test-email.php            (Email testing)
└── contact_form.log          (Generated log file)
```

## 🎯 Testing Checklist

### ✅ Before Going Live:
- [ ] Website loads at https://afeworkpharmaet.com
- [ ] All pages navigate correctly
- [ ] Contact form submits successfully
- [ ] Email received at contact@afeworkpharmaet.com
- [ ] Form validation works (try invalid email)
- [ ] Rate limiting works (submit multiple times quickly)
- [ ] Mobile responsiveness works
- [ ] All images and assets load

### ✅ Email Test Cases:
1. **Valid submission**: All fields filled correctly
2. **Missing fields**: Try submitting without required fields
3. **Invalid email**: Use malformed email address
4. **Long message**: Test with 2000+ character message
5. **Special characters**: Test with unicode/emoji in message
6. **Rate limiting**: Submit 4+ times within a minute

## 🔒 Security Considerations

### Implemented Security:
- **Input sanitization**: All user input is filtered
- **Email validation**: Proper email format checking
- **Rate limiting**: Prevents spam submissions
- **XSS protection**: Special characters escaped
- **Error logging**: All attempts logged for monitoring
- **File permissions**: Secure file access permissions

### Recommended Additional Security:
- **SSL Certificate**: Ensure HTTPS is enabled
- **Firewall**: Configure DirectAdmin firewall rules
- **Backup**: Regular backups of website files
- **Updates**: Keep DirectAdmin and PHP updated
- **Monitoring**: Monitor contact_form.log for suspicious activity

## 📞 Support Information

### If You Need Help:
1. **Check the log file**: `contact_form.log` in public_html
2. **Test email function**: Visit `/test-email.php`
3. **Contact hosting provider**: For server-level issues
4. **Check DirectAdmin docs**: For email account setup

### Contact Form Features:
- ✅ **Single email recipient**: contact@afeworkpharmaet.com
- ✅ **No auto-reply**: As requested
- ✅ **Professional formatting**: Clean, readable emails
- ✅ **Complete information**: All form data included
- ✅ **Security**: Rate limiting and validation
- ✅ **Logging**: All submissions logged
- ✅ **DirectAdmin compatible**: Uses standard PHP mail()

## 🎉 Deployment Complete!

Once deployed, your contact form will:
1. **Accept inquiries** from website visitors
2. **Send professional emails** to contact@afeworkpharmaet.com
3. **Provide user feedback** with success/error messages
4. **Log all attempts** for monitoring
5. **Work reliably** on DirectAdmin hosting

**Your website is now ready for production use!** 🚀
