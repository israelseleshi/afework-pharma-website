# PHP Development Server Setup

## Quick Start

The admin dashboard requires a PHP server to execute the CMS API endpoints. Here are the easiest ways to get it running:

### Option 1: Using npm scripts (Recommended)

```bash
# Start PHP server only
npm run php-server

# Or start both Vite dev server and PHP server together
npm run dev:php
```

### Option 2: Manual PHP server

```bash
# In project root directory
php -S localhost:8000 -t public
```

## Requirements

- **PHP 7.4+** installed on your system
- **MySQL** database with the CMS tables set up

## Installation Options

### Windows
1. **XAMPP** (easiest): Download from https://www.apachefriends.org/
2. **PHP directly**: Download from https://www.php.net/downloads
3. **WAMP**: Download from https://www.wampserver.com/

### macOS
```bash
# Using Homebrew
brew install php

# Using MacPorts
sudo port install php81
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install php php-mysql php-pdo
```

## Verification

1. Check PHP installation:
   ```bash
   php --version
   ```

2. Start the PHP server:
   ```bash
   npm run php-server
   ```

3. Test the API endpoint:
   ```
   http://localhost:8000/api/cms/home-content.php
   ```

## Database Configuration

The PHP APIs connect to your MySQL database using the credentials in:
- `public/api/cms/home-content.php`

Make sure your database is running and the CMS tables are created.

## Troubleshooting

### "php: command not found"
- PHP is not installed or not in your PATH
- Install PHP using one of the methods above

### "Connection refused" errors
- Make sure the PHP server is running on port 8000
- Check if another service is using port 8000

### Database connection errors
- Verify MySQL is running
- Check database credentials in the PHP files
- Ensure CMS tables exist in your database

## Development Workflow

1. **Start development servers:**
   ```bash
   npm run dev:php
   ```

2. **Access the application:**
   - Frontend: http://localhost:5174
   - PHP API: http://localhost:8000
   - Admin Dashboard: http://localhost:5174/admin-dashboard

3. **Make changes and test:**
   - Frontend changes: Auto-reload via Vite
   - PHP changes: Refresh browser to see updates
