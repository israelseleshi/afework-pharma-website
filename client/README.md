# Afework Pharma - Client (Frontend)

## Overview
This is the frontend application for Afework Pharma website built with React, TypeScript, and Tailwind CSS.

## 📁 Project Structure

```
client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── layout/         # Layout components (Header, Footer, Sidebar)
│   │   ├── features/       # Feature-specific components
│   │   ├── ui/             # Reusable UI components (Button, Card, Modal)
│   │   └── common/         # Shared utility components
│   ├── pages/              # Page-level components
│   ├── contexts/           # React contexts for state management
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript type definitions
│   ├── constants/          # Application constants
│   ├── styles/             # Global styles
│   ├── config/             # Configuration files
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
│   ├── assets/
│   │   ├── images/        # Product and solution images
│   │   ├── logos/         # Company logos
│   │   ├── icons/         # Icon assets
│   │   └── fonts/         # Custom fonts
│   ├── robots.txt
│   ├── sitemap.xml
│   └── 404.html
├── index.html              # HTML entry point
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── components.json         # Component library config
├── package.json            # Frontend dependencies
├── .env.example            # Environment variables template
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Available Scripts

- `npm run dev` - Start development server (port 5174)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🛠️ Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **UI Components**: Radix UI, shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **HTTP Client**: Axios

## 🎨 Component Guidelines

### Component Structure
Each component should follow this structure:

```
ComponentName/
├── ComponentName.tsx       # Component implementation
├── ComponentName.types.ts  # TypeScript types (if complex)
├── ComponentName.module.css # Component styles (if needed)
├── ComponentName.test.tsx  # Component tests
└── index.ts               # Export file
```

### Naming Conventions
- Use `PascalCase` for component files: `Header.tsx`, `ContactForm.tsx`
- Use `camelCase` for utility files: `formatDate.ts`, `validateEmail.ts`
- Use `UPPERCASE_SNAKE_CASE` for constants: `API_BASE_URL`, `MAX_FILE_SIZE`

## 🌍 Environment Variables

Create a `.env` file in the client directory:

```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Afework Pharma
```

See `.env.example` for all available variables.

## 📚 Documentation

- [Development Guide](../../docs/DEVELOPMENT.md)
- [Component Structure](../../docs/architecture/COMPONENT_STRUCTURE.md)
- [Contributing Guidelines](../../docs/CONTRIBUTING.md)

## 🤝 Contributing

Please read [CONTRIBUTING.md](../../docs/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is private and proprietary to Afework Pharma.
