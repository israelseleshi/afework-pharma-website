# Afework Pharma Website - Restructured

## 🏗️ Project Structure

```
afework-pharma-website/
├── 📁 src/                          # Frontend source code
│   ├── 📁 components/               # React components
│   │   ├── 📁 ui/                   # Reusable UI components
│   │   ├── 📁 layout/               # Layout components
│   │   └── 📁 sections/             # Page sections
│   ├── 📁 pages/                    # Page components
│   ├── 📁 hooks/                    # Custom React hooks
│   ├── 📁 lib/                      # Utility functions
│   ├── 📁 types/                    # TypeScript type definitions
│   └── 📁 styles/                   # CSS and styling files
├── 📁 public/                       # Static assets
│   ├── 📁 api/                      # API endpoints
│   │   └── 📁 PHPMailer/            # Email functionality (preserved)
│   ├── 📁 assets/                   # Images, icons, etc.
│   └── 📁 uploads/                  # User uploads
├── 📁 api/                          # Backend API (content management)
│   └── 📁 content/                  # Content management endpoints
├── 📁 database/                     # Database related files
├── 📁 scripts/                      # Utility scripts
├── 📁 tests/                        # Test files
├── 📁 docs/                         # Documentation
└── 📁 build/                        # Production build output
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MySQL database
- Web server (Apache/Nginx)

### Installation

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd afework-pharma-website
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Database Setup**
   ```bash
   npm run setup-db
   npm run create-admin
   ```

4. **Development**
   ```bash
   npm run dev        # Frontend only
   npm run server     # Backend only
   npm run dev:full   # Both frontend and backend
   ```

5. **Production Build**
   ```bash
   npm run build
   npm run start
   ```

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run server` | Start Express.js backend |
| `npm run dev:full` | Start both frontend and backend |
| `npm run setup-db` | Initialize database |
| `npm run create-admin` | Create admin user |
| `npm run production` | Build and start production server |

## 🏛️ Architecture

### Frontend (React + TypeScript + Vite)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6.3.5
- **UI Library**: Radix UI + Tailwind CSS
- **Animations**: Framer Motion + GSAP
- **State Management**: React hooks
- **Routing**: React Router

### Backend (Node.js + Express)
- **Runtime**: Node.js with ES modules
- **Framework**: Express.js
- **Database**: MySQL with mysql2
- **Authentication**: JWT + bcrypt
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate limiting
- **File Upload**: Multer

### Database Schema
- **Content Management**: Dynamic content system
- **User Management**: Admin authentication
- **Media Management**: File upload and storage

## 🔧 Configuration

### Environment Variables
```env
# Database
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=afework_pharma_cms

# Security
JWT_SECRET=your_jwt_secret
ADMIN_PASSWORD=your_admin_password

# Server
PORT=3000
NODE_ENV=production
```

### Vite Configuration
- **Proxy**: API requests proxied to Express server
- **Build**: Optimized for production
- **Assets**: Static asset handling

## 📡 API Endpoints

### Content Management
- `GET /api/content/:section` - Get content by section
- `PUT /api/content/:section` - Update content (admin only)
- `POST /api/content/batch` - Batch update content (admin only)

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/change-password` - Change admin password
- `GET /api/auth/verify` - Verify JWT token

### Media Management
- `POST /api/upload` - Upload media files
- `DELETE /api/media/:filename` - Delete media files

### System
- `GET /api/ping` - Health check
- `GET /api/test-db` - Database connection test

## 🎨 UI Components

### Component Library
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library
- **Custom Components**: Built on Radix primitives

### Design System
- **Colors**: Professional medical theme
- **Typography**: Clean, readable fonts
- **Spacing**: Consistent spacing scale
- **Animations**: Smooth, purposeful animations

## 🔒 Security Features

- **Authentication**: JWT-based admin authentication
- **Password Security**: bcrypt hashing
- **Rate Limiting**: API request limiting
- **Input Validation**: Joi schema validation
- **XSS Protection**: Helmet security headers
- **CORS**: Configured cross-origin requests

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Tailwind CSS responsive system
- **Touch Friendly**: Optimized for touch interfaces
- **Performance**: Optimized loading and rendering

## 🚀 Deployment

### Production Checklist
1. ✅ Environment variables configured
2. ✅ Database setup completed
3. ✅ Admin user created
4. ✅ Build process completed
5. ✅ Server configuration verified

### Build Process
```bash
npm run build
```
This creates a `build/` directory with:
- Optimized React application
- API endpoints copied
- Server configuration
- Production package.json

### Server Requirements
- **Node.js**: 18+
- **MySQL**: 5.7+
- **Web Server**: Apache/Nginx (optional)
- **SSL**: Recommended for production

## 📊 Performance

### Frontend Optimization
- **Code Splitting**: Automatic route-based splitting
- **Asset Optimization**: Image and CSS optimization
- **Caching**: Browser caching strategies
- **Bundle Size**: Optimized bundle sizes

### Backend Optimization
- **Database**: Connection pooling
- **Caching**: Response caching where appropriate
- **Compression**: Gzip compression
- **Rate Limiting**: API protection

## 🧪 Testing

### Test Structure
```
tests/
├── handlers/          # API handler tests
└── [other tests]      # Additional test suites
```

### Running Tests
```bash
npm run test:security  # Security tests
```

## 📚 Documentation

### Additional Documentation
- `DIRECTADMIN_DEPLOYMENT_GUIDE.md` - DirectAdmin deployment
- `PRODUCTION_DEPLOYMENT_CHECKLIST.md` - Production checklist
- `PRICE_QUOTATION.md` - Project pricing information

## 🤝 Contributing

### Development Workflow
1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

### Code Standards
- **TypeScript**: Strict type checking
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Conventional Commits**: Commit message format

## 📞 Support

For support and questions:
- **Email**: contact@afeworkpharmaet.com
- **Phone**: +251 929 092 353

## 📄 License

This project is proprietary software developed for Afework Pharma.

---

**Built with ❤️ for Afework Pharma -  Medical Equipment & Healthcare Solutions**
