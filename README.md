# Afework Pharma Website

A modern, responsive website for Afework Pharma - Premium Medical Equipment & Healthcare Solutions.

## 🏗️ Project Structure

```
afework-pharma-website/
├── src/                          # React application source code
│   ├── components/              # Reusable UI components
│   ├── pages/                   # Page components
│   ├── contexts/                # React contexts
│   ├── hooks/                   # Custom React hooks
│   ├── utils/                   # Utility functions
│   └── styles/                  # Global styles
├── public/                      # Public assets and API
│   ├── assets/                  # Static assets
│   │   ├── images/             # Medical equipment images
│   │   └── logos/              # Company logos and certificates
│   ├── api/                    # PHP API handlers
│   │   ├── contact-handler.php # Contact form handler
│   │   └── content.php         # Content management API
│   ├── uploads/                # User uploads directory
│   ├── robots.txt              # SEO configuration
│   ├── sitemap.xml             # Site map
│   └── 404.html                # Custom 404 page
├── tests/                      # Test and debugging files
│   ├── email/                  # Email testing utilities
│   ├── smtp/                   # SMTP testing utilities
│   └── handlers/               # API handler testing
├── docs/                       # Documentation
│   ├── setup/                  # Setup guides
│   ├── deployment/             # Deployment guides
│   └── api/                    # API documentation
├── scripts/                    # Utility scripts
│   ├── backup-db.js           # Database backup
│   ├── create-admin.js        # Admin user creation
│   ├── security-test.js       # Security testing
│   └── seedContent.js         # Content seeding
├── build/                      # Production build output
└── [config files]             # Configuration files
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PHP 8.0+
- MySQL/MariaDB

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd afework-pharma-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp docs/deployment/env.production.example .env
   # Edit .env with your configuration
   ```

4. **Set up database**
   ```bash
   node docs/setup/setup-database.js
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Directory Details

### `/src` - React Application
- **components/**: Reusable UI components (Header, Footer, ContactSection, etc.)
- **pages/**: Page-level components (HomePage, AboutPage, ContactPage, etc.)
- **contexts/**: React contexts for state management
- **hooks/**: Custom React hooks
- **utils/**: Utility functions and services

### `/public` - Public Assets & API
- **assets/images/**: Medical equipment and facility images
- **assets/logos/**: Company logos, certificates, and branding
- **api/**: PHP handlers for contact forms and content management
- **uploads/**: Directory for user-uploaded files

### `/tests` - Testing & Debugging
- **email/**: Email functionality testing utilities
- **smtp/**: SMTP configuration testing
- **handlers/**: API endpoint testing

### `/docs` - Documentation
- **setup/**: Installation and setup guides
- **deployment/**: Production deployment instructions
- **api/**: API documentation and examples

## 🔧 Configuration

### Environment Variables
See `docs/deployment/env.production.example` for required environment variables.

### Database Setup
Run the setup script to create necessary tables:
```bash
node docs/setup/setup-database.js
```

### Email Configuration
The contact form uses the configured email account. Ensure your hosting provider's SMTP settings are properly configured.

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Steps
1. Upload the `build/` directory contents to your web server
2. Upload the `public/` directory contents to your web server
3. Configure your web server to serve the React app
4. Set up PHP for API endpoints
5. Configure database connection

See `docs/deployment/deployment-guide.md` for detailed instructions.

## 🧪 Testing

### Email Testing
Test email functionality using files in `tests/email/`:
- `test-email-config.php` - Test email configuration
- `test-simple-email.php` - Test contact form

### API Testing
Test API endpoints using files in `tests/handlers/`:
- `test-handler-version.php` - Test API handlers
- `check-syntax.php` - Check PHP syntax

## 📚 Documentation

- **Setup Guide**: `docs/setup/CMS_SETUP_GUIDE.md`
- **Deployment Guide**: `docs/deployment/deployment-guide.md`
- **Testing Guide**: `docs/TESTING.md`
- **Production Summary**: `docs/deployment/PRODUCTION-READY-SUMMARY.md`

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: PHP 8+, MySQL
- **Build Tool**: Vite
- **UI Components**: Radix UI, Lucide Icons
- **Animations**: Framer Motion

## 📞 Contact

For technical support or questions about this website, contact the development team.

---

**Afework Pharma** - Premium Medical Equipment & Healthcare Solutions