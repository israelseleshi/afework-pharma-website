# 🏗️ Afework Pharma Website - Project Structure

## 📁 Directory Overview

```
afework-pharma-website/
├── 📄 README.md                     # Main project documentation
├── 📄 README-RESTRUCTURED.md        # Restructured project guide
├── 📄 PROJECT-STRUCTURE.md          # This file
├── 📄 package.json                  # Node.js dependencies and scripts
├── 📄 package-lock.json             # Dependency lock file
├── 📄 tsconfig.json                 # TypeScript configuration
├── 📄 tailwind.config.js            # Tailwind CSS configuration
├── 📄 vite.config.ts                # Vite build configuration
├── 📄 postcss.config.js             # PostCSS configuration
├── 📄 .env                          # Environment variables (local)
├── 📄 .env.example                  # Environment variables template
├── 📄 .gitignore                    # Git ignore rules
├── 📄 vercel.json                   # Vercel deployment config
├── 📄 deploy.js                     # Production deployment script
├── 📄 server.js                     # Express.js backend server
├── 📄 setup-cms-database.js         # Database setup script
├── 📄 index.html                    # Main HTML template
├── 📄 database-setup.html           # Database setup interface
│
├── 📁 src/                          # 🎯 FRONTEND SOURCE CODE
│   ├── 📁 components/               # React components
│   │   ├── 📁 ui/                   # Reusable UI components (buttons, inputs, etc.)
│   │   ├── 📁 layout/               # Layout components (header, footer, etc.)
│   │   ├── 📁 sections/             # Page sections (hero, features, etc.)
│   │   └── 📁 forms/                # Form components
│   ├── 📁 pages/                    # Page components
│   │   ├── 📄 HomePage.tsx          # Home page
│   │   ├── 📄 AboutPage.tsx         # About page
│   │   ├── 📄 SolutionsPage.tsx     # Solutions page
│   │   ├── 📄 ProjectsPage.tsx      # Projects page
│   │   ├── 📄 ContactPage.tsx       # Contact page
│   │   └── 📄 AdminPage.tsx         # Admin dashboard
│   ├── 📁 hooks/                    # Custom React hooks
│   │   ├── 📄 useAuth.ts            # Authentication hook
│   │   ├── 📄 useContent.ts         # Content management hook
│   │   └── 📄 useApi.ts             # API interaction hook
│   ├── 📁 lib/                      # Utility functions and libraries
│   │   ├── 📄 utils.ts              # General utilities
│   │   ├── 📄 api.ts                # API client
│   │   └── 📄 constants.ts          # Application constants
│   ├── 📁 types/                    # TypeScript type definitions
│   │   ├── 📄 api.ts                # API response types
│   │   ├── 📄 content.ts            # Content types
│   │   └── 📄 auth.ts               # Authentication types
│   ├── 📁 styles/                   # CSS and styling files
│   │   ├── 📄 globals.css           # Global styles
│   │   └── 📄 components.css        # Component-specific styles
│   └── 📄 main.tsx                  # React application entry point
│
├── 📁 public/                       # 🌐 STATIC ASSETS & PUBLIC FILES
│   ├── 📁 api/                      # PHP API endpoints
│   │   ├── 📁 PHPMailer/            # 📧 Email functionality (PRESERVED)
│   │   │   ├── 📄 src/              # PHPMailer source files
│   │   │   └── 📄 composer.json     # PHPMailer dependencies
│   │   └── 📄 content.php           # Content management API
│   ├── 📁 assets/                   # Static assets
│   │   ├── 📁 images/               # Image files
│   │   ├── 📁 icons/                # Icon files
│   │   └── 📁 documents/            # PDF and document files
│   ├── 📁 uploads/                  # User-uploaded files
│   ├── 📄 .htaccess                 # Apache configuration
│   ├── 📄 robots.txt                # SEO robots file
│   ├── 📄 sitemap.xml               # SEO sitemap
│   ├── 📄 404.html                  # Custom 404 page
│   ├── 📄 cms-api.php               # CMS API endpoint
│   ├── 📄 setup-cms.php             # CMS setup script
│   ├── 📄 setup-database.php        # Database setup script
│   ├── 📄 find-db-config.php        # Database configuration finder
│   ├── 📄 test-cms-api.php          # CMS API tester
│   ├── 📄 create-tables.sql         # Database schema
│   └── 📄 google-site-verification  # Google verification files
│
├── 📁 api/                          # 🔧 BACKEND API (Content Management)
│   └── 📁 content/                  # Content management endpoints
│       ├── 📄 all.php               # Get all content
│       └── 📄 batch.php             # Batch content updates
│
├── 📁 database/                     # 🗄️ DATABASE RELATED FILES
│   └── 📄 schema.sql                # Database schema definitions
│
├── 📁 scripts/                      # 🛠️ UTILITY SCRIPTS
│   ├── 📄 create-admin.js           # Create admin user script
│   ├── 📄 backup-db.js              # Database backup script
│   ├── 📄 security-test.js          # Security testing script
│   └── 📄 deploy-helper.js          # Deployment helper
│
├── 📁 tests/                        # 🧪 TEST FILES
│   └── 📁 handlers/                 # API handler tests
│       ├── 📄 check-handlers.php    # Handler validation
│       ├── 📄 check-syntax.php      # Syntax checking
│       ├── 📄 test-handler-version.php # Version testing
│       └── 📄 test-simple.php       # Simple functionality tests
│
├── 📁 docs/                         # 📚 DOCUMENTATION
│   ├── 📄 DIRECTADMIN_DEPLOYMENT_GUIDE.md # DirectAdmin deployment guide
│   ├── 📄 PRODUCTION_DEPLOYMENT_CHECKLIST.md # Production checklist
│   ├── 📄 PRICE_QUOTATION.md        # Project pricing information
│   ├── 📄 api-documentation.md      # API documentation
│   └── 📄 deployment-guide.md       # General deployment guide
│
├── 📁 build/                        # 🏗️ PRODUCTION BUILD OUTPUT
│   ├── 📁 assets/                   # Compiled assets
│   ├── 📁 api/                      # Copied API files
│   ├── 📄 index.html                # Built HTML
│   ├── 📄 server.js                 # Production server
│   └── 📄 package.json              # Production dependencies
│
└── 📁 node_modules/                 # 📦 NODE.JS DEPENDENCIES (auto-generated)
```

## 🎯 Key Components

### Frontend Architecture
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Framer Motion**: Animation library

### Backend Architecture
- **Express.js**: Web application framework
- **MySQL**: Relational database
- **JWT**: Authentication tokens
- **Joi**: Input validation
- **Multer**: File upload handling
- **Helmet**: Security middleware

### Content Management System
- **Dynamic Content**: Database-driven content
- **Admin Interface**: Web-based content management
- **Media Management**: File upload and organization
- **User Authentication**: Secure admin access

## 🔄 Data Flow

```
User Request → Vite Dev Server → Proxy → Express.js → MySQL → Response
                     ↓
              Static Assets (public/)
                     ↓
              React Components (src/)
```

## 🚀 Development Workflow

1. **Frontend Development**: `npm run dev`
   - Vite serves React application
   - Hot module replacement for fast development
   - Proxy API requests to Express server

2. **Backend Development**: `npm run server`
   - Express.js serves API endpoints
   - MySQL database connection
   - JWT authentication

3. **Full Stack Development**: `npm run dev:full`
   - Both frontend and backend running concurrently
   - Complete development environment

## 📦 Build Process

1. **Frontend Build**: Vite compiles React application
2. **Asset Optimization**: Images, CSS, and JS optimization
3. **API Copy**: PHP files copied to build directory
4. **Server Setup**: Production server configuration
5. **Package Creation**: Production-ready package

## 🔒 Security Layers

- **Input Validation**: Joi schema validation
- **Authentication**: JWT token-based auth
- **Password Security**: bcrypt hashing
- **Rate Limiting**: API request limiting
- **CORS**: Cross-origin request security
- **Helmet**: Security headers

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoint System**: Tailwind CSS responsive utilities
- **Touch Optimization**: Mobile-friendly interactions
- **Performance**: Optimized for all devices

## 🎨 UI/UX Architecture

- **Design System**: Consistent component library
- **Accessibility**: WCAG compliant components
- **Animation**: Smooth, purposeful animations
- **Theming**: Consistent color and typography system

---

**This structure provides a clean, maintainable, and scalable foundation for the Afework Pharma website.**
