# Afework Pharma - Server (Backend)

## Overview
This is the backend API server for Afework Pharma website built with Express.js, TypeScript, and MySQL.

## 📁 Project Structure

```
server/
├── src/
│   ├── routes/             # API route definitions
│   │   ├── auth.ts        # Authentication routes
│   │   ├── content.ts     # Content management routes
│   │   ├── contact.ts     # Contact form routes
│   │   └── admin.ts       # Admin routes
│   ├── controllers/        # Business logic controllers
│   │   ├── authController.ts
│   │   ├── contentController.ts
│   │   └── contactController.ts
│   ├── middleware/         # Express middleware
│   │   ├── auth.ts        # Authentication middleware
│   │   ├── validation.ts  # Request validation
│   │   ├── errorHandler.ts # Error handling
│   │   └── cors.ts        # CORS configuration
│   ├── services/           # Business logic services
│   │   ├── database.ts    # Database service
│   │   ├── emailService.ts # Email service
│   │   └── authService.ts # Authentication service
│   ├── models/             # Database models/schemas
│   │   ├── User.ts
│   │   ├── Content.ts
│   │   └── Contact.ts
│   ├── utils/              # Utility functions
│   │   ├── validators.ts  # Validation helpers
│   │   ├── logger.ts      # Logging utility
│   │   └── helpers.ts     # General helpers
│   ├── config/             # Configuration
│   │   ├── database.ts    # Database config
│   │   ├── email.ts       # Email config
│   │   ├── environment.ts # Environment config
│   │   └── security.ts    # Security config
│   ├── types/              # TypeScript type definitions
│   │   ├── express.d.ts   # Express type extensions
│   │   └── models.ts      # Data model types
│   └── server.ts           # Main server entry point
├── scripts/                # Utility scripts
│   ├── setup-database.ts  # Database setup
│   ├── seed-content.ts    # Content seeding
│   ├── backup-db.ts       # Database backup
│   └── create-admin.ts    # Admin user creation
├── migrations/             # Database migrations
│   ├── 001-initial-schema.sql
│   └── 002-add-content-table.sql
├── tests/                  # Test files
│   ├── unit/              # Unit tests
│   ├── integration/       # Integration tests
│   └── fixtures/          # Test data
├── package.json            # Backend dependencies
├── tsconfig.json           # TypeScript configuration
├── .env.example            # Environment variables template
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MySQL 8.0+

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Set up database
npm run setup-db

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run setup-db` - Set up database schema
- `npm run seed` - Seed database with initial content
- `npm run backup-db` - Backup database
- `npm run create-admin` - Create admin user
- `npm run test` - Run tests

## 🛠️ Tech Stack

- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL 8.0+
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer
- **Email**: SMTP

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Request validation with Joi
- CORS protection
- Rate limiting
- Helmet security headers
- SQL injection prevention
- XSS protection

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - User logout

### Content
- `GET /api/content` - List all content
- `GET /api/content/:id` - Get specific content
- `POST /api/content` - Create content (admin)
- `PUT /api/content/:id` - Update content (admin)
- `DELETE /api/content/:id` - Delete content (admin)

### Contact
- `POST /api/contact` - Submit contact form

### Admin
- `GET /api/admin/users` - List users (admin)
- `GET /api/admin/stats` - Get statistics (admin)

See [API Documentation](../../docs/API.md) for detailed endpoint documentation.

## 🌍 Environment Variables

Create a `.env` file in the server directory:

```
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=afework_pharma

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# Server
NODE_ENV=development
PORT=3000

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=200
```

See `.env.example` for all available variables.

## 📚 Documentation

- [Development Guide](../../docs/DEVELOPMENT.md)
- [API Documentation](../../docs/API.md)
- [Database Setup](../../docs/setup/DATABASE_SETUP.md)
- [Email Configuration](../../docs/guides/EMAIL_SETUP.md)
- [Contributing Guidelines](../../docs/CONTRIBUTING.md)

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🤝 Contributing

Please read [CONTRIBUTING.md](../../docs/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is private and proprietary to Afework Pharma.
