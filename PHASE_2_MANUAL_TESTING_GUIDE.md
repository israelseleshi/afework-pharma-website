# 📋 Phase 2: Manual Testing Guide

This guide explains how to perform the remaining manual tests for Phase 2.

---

## Overview

The following tests need to be performed manually:
1. Test frontend rendering
2. Test API endpoints
3. Test database connectivity
4. Test email functionality

---

## Prerequisites

Before starting, ensure:
- ✅ All Phase 2 migration tasks are complete
- ✅ Node.js 18+ is installed
- ✅ npm is installed
- ✅ MySQL database is running
- ✅ Environment variables are configured

---

## Test 1: Test Frontend Rendering

### Step 1: Install Dependencies
```bash
cd /home/joy/Documents/Afework\ Pharma/afework-pharma-website\ -1/afework-pharma-website
npm install
```

### Step 2: Start Frontend Development Server
```bash
npm run dev:client
```

**Expected Output:**
```
  VITE v6.3.5  ready in XXX ms

  ➜  Local:   http://localhost:5174/
  ➜  press h + enter to show help
```

### Step 3: Open Browser
- Open your browser and navigate to: `http://localhost:5174/`

### Step 4: Verify Frontend Rendering
✅ Check:
- [ ] Page loads without errors
- [ ] Logo displays correctly
- [ ] Navigation menu appears
- [ ] Hero section renders
- [ ] Images load properly
- [ ] No red errors in browser console

### Step 5: Check Browser Console
- Press `F12` to open Developer Tools
- Go to **Console** tab
- Verify: No red error messages
- Verify: No broken imports warnings

### Step 6: Stop Server
- Press `Ctrl + C` in terminal

---

## Test 2: Test API Endpoints

### Step 1: Start Backend Server
```bash
npm run dev:server
```

**Expected Output:**
```
🔍 Environment variables check:
DB_HOST: localhost (or your configured host)
DB_USER: your_user
DB_PASSWORD: ***SET***
DB_NAME: your_database

🔧 Database configuration: {...}
Server running on port 3000
```

### Step 2: Test API with curl or Postman

#### Option A: Using curl (Terminal)

**Test 1: Check if server is running**
```bash
curl http://localhost:3000
```

**Expected:** Server responds (may return 404 or welcome message)

**Test 2: Test API endpoint**
```bash
curl http://localhost:3000/api/content
```

**Expected:** Returns JSON response or error message

#### Option B: Using Postman (GUI)

1. Open Postman
2. Create new request
3. Set method to `GET`
4. Set URL to `http://localhost:3000/api/content`
5. Click **Send**
6. Verify response appears

### Step 3: Check Server Console
✅ Check:
- [ ] No error messages
- [ ] Requests are logged
- [ ] Database connection successful
- [ ] No TypeScript errors

### Step 4: Stop Server
- Press `Ctrl + C` in terminal

---

## Test 3: Test Database Connectivity

### Step 1: Verify Database Configuration
Check that `.env` file in server folder has:
```
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
```

### Step 2: Start Backend Server
```bash
npm run dev:server
```

### Step 3: Check Database Connection
Look for this message in console:
```
🔧 Database configuration: {
  host: 'your_host',
  user: 'your_user',
  database: 'your_database',
  password: '***hidden***',
  environment: 'development'
}
```

### Step 4: Verify Connection
✅ Check:
- [ ] No "Connection refused" errors
- [ ] No "Unknown database" errors
- [ ] No "Access denied" errors
- [ ] Database configuration shows correct values

### Step 5: Test Database Query
If you have a test endpoint, call it:
```bash
curl http://localhost:3000/api/content
```

✅ Check:
- [ ] Returns data from database (not error)
- [ ] Response is valid JSON
- [ ] No SQL errors in console

### Step 6: Stop Server
- Press `Ctrl + C` in terminal

---

## Test 4: Test Email Functionality

### Step 1: Check Email Configuration
Verify `.env` file has email settings:
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@afeworkpharmaet.com
```

### Step 2: Start Backend Server
```bash
npm run dev:server
```

### Step 3: Test Email Endpoint (if available)
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

### Step 4: Check Email Logs
✅ Check:
- [ ] No "SMTP connection failed" errors
- [ ] No "Authentication failed" errors
- [ ] Email sent successfully message appears
- [ ] Check your email inbox for test message

### Step 5: Verify Email Received
- Check your email account
- Look for email from configured sender
- Verify email content is correct

### Step 6: Stop Server
- Press `Ctrl + C` in terminal

---

## Troubleshooting

### Frontend Won't Start
**Problem:** `npm run dev:client` fails
**Solution:**
```bash
cd client
npm install
npm run dev
```

### Backend Won't Start
**Problem:** `npm run dev:server` fails
**Solution:**
```bash
# Check if port 3000 is in use
lsof -i :3000
# Kill process if needed
kill -9 <PID>
```

### Database Connection Failed
**Problem:** "Connection refused" error
**Solution:**
1. Verify MySQL is running
2. Check `.env` file has correct credentials
3. Verify database exists
4. Test connection manually:
```bash
mysql -h your_host -u your_user -p your_database
```

### Email Not Sending
**Problem:** Email endpoint returns error
**Solution:**
1. Verify email credentials in `.env`
2. Check if SMTP port is correct (465 for SSL, 587 for TLS)
3. Verify email account allows SMTP access
4. Check firewall isn't blocking SMTP port

---

## Checklist for Manual Tests

### Frontend Rendering
- [ ] Page loads without errors
- [ ] Logo displays
- [ ] Navigation works
- [ ] Images load
- [ ] No console errors
- [ ] Responsive design works

### API Endpoints
- [ ] Server starts on port 3000
- [ ] API responds to requests
- [ ] JSON responses are valid
- [ ] No API errors

### Database Connectivity
- [ ] Database connection successful
- [ ] No connection errors
- [ ] Database queries work
- [ ] Data returns correctly

### Email Functionality
- [ ] Email configuration is correct
- [ ] SMTP connection works
- [ ] Emails send successfully
- [ ] Emails are received

---

## How to Mark Tests as Complete

Once you've completed all manual tests successfully, update the checklist:

```bash
# Edit RESTRUCTURING_CHECKLIST.md
# Change:
- [ ] Test frontend rendering (manual)
- [ ] Test API endpoints (manual)
- [ ] Test database connectivity (manual)
- [ ] Test email functionality (manual)

# To:
- [x] Test frontend rendering (manual) ✅ PASSED
- [x] Test API endpoints (manual) ✅ PASSED
- [x] Test database connectivity (manual) ✅ PASSED
- [x] Test email functionality (manual) ✅ PASSED
```

---

## Quick Commands Reference

```bash
# Install all dependencies
npm install

# Run both client and server
npm run dev

# Run only client (port 5174)
npm run dev:client

# Run only server (port 3000)
npm run dev:server

# Type check
npm run type-check

# Build both
npm run build

# Run linting
npm run lint
```

---

## Next Steps

After completing all manual tests:
1. Mark tests as complete in checklist
2. Update Phase 2 completion status
3. Proceed to Phase 3: Configuration Management

---

**Created**: December 11, 2025  
**Purpose**: Manual testing guide for Phase 2  
**Status**: Ready to use

---

## Support

If you encounter issues:
1. Check the Troubleshooting section above
2. Review error messages carefully
3. Verify all prerequisites are met
4. Check environment variables are correct
5. Ensure ports 3000 and 5174 are available

Good luck with testing! 🚀
