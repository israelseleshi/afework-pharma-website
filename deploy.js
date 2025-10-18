// Production deployment script for Afework Pharma website
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Preparing for production deployment...');

// Create production environment file
const prodEnv = `# Production Environment Configuration
NODE_ENV=production
DB_HOST=mysql.lu-shared04.dapanel.net
DB_USER=afeworcn_afework_admin
DB_PASSWORD=mQ+3HMm2(g)q.R758J!;Lb
DB_NAME=afeworcn_afework_content
JWT_SECRET=afework_pharma_2024_super_secure_jwt_secret_key_production
ADMIN_EMAIL=admin@afeworkpharmaet.com
CONTACT_EMAIL=contact@afeworkpharmaet.com
`;

// Write production environment file to build directory
const buildDir = path.join(__dirname, 'build');
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
}

fs.writeFileSync(path.join(buildDir, '.env'), prodEnv);
console.log('✅ Production environment file created');

// Copy server files to build directory
const serverFiles = [
    'server.js',
    'package.json',
    'package-lock.json',
    '.htaccess',
    'database-setup.html'
];

// Copy API directory
const apiDir = path.join(__dirname, 'api');
const buildApiDir = path.join(buildDir, 'api');

if (fs.existsSync(apiDir)) {
    // Create api directory in build
    if (!fs.existsSync(buildApiDir)) {
        fs.mkdirSync(buildApiDir, { recursive: true });
    }
    
    // Copy api files recursively
    function copyDir(src, dest) {
        const entries = fs.readdirSync(src, { withFileTypes: true });
        
        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);
            
            if (entry.isDirectory()) {
                if (!fs.existsSync(destPath)) {
                    fs.mkdirSync(destPath, { recursive: true });
                }
                copyDir(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }
    
    copyDir(apiDir, buildApiDir);
    console.log('✅ Copied API directory to build');
}

serverFiles.forEach(file => {
    const srcPath = path.join(__dirname, file);
    const destPath = path.join(buildDir, file);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ Copied ${file} to build directory`);
    }
});

// Create production package.json with only production dependencies
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
const prodPackageJson = {
    ...packageJson,
    scripts: {
        start: "node server.js",
        "start:prod": "NODE_ENV=production node server.js"
    },
    devDependencies: {} // Remove dev dependencies for production
};

fs.writeFileSync(path.join(buildDir, 'package.json'), JSON.stringify(prodPackageJson, null, 2));
console.log('✅ Production package.json created');

// Create deployment instructions
const deployInstructions = `# 🚀 Afework Pharma - Production Deployment Instructions

## Files to Upload to public_html:

1. **Upload all files from the 'build' folder** to your public_html directory
2. **Set up the database** using the database-setup.html file
3. **Configure environment variables** on your hosting panel

## Server Setup:

1. **Install Node.js dependencies:**
   \`\`\`bash
   npm install --production
   \`\`\`

2. **Start the server:**
   \`\`\`bash
   npm start
   \`\`\`

## Database Setup:

1. **Open database-setup.html** in your browser
2. **Enter your database credentials:**
   - Host: mysql.lu-shared04.dapanel.net
   - Database: afeworcn_afework_content
   - Username: afeworcn_afework_admin
   - Password: [your database password]

3. **Click "Setup Database"** to initialize all tables and content

## Admin Access:

- **URL:** https://yourdomain.com/admin-dashboard
- **Username:** admin
- **Password:** AfeworkAdmin2024!

## Features Included:

✅ **Complete CMS System**
- Hero Section Editor with real-time updates
- Content management for all pages
- Professional edit/save/cancel interface
- Database integration with fallback to simulation

✅ **Production Ready**
- Optimized build with code splitting
- Minified assets
- Error handling and logging
- Secure authentication

✅ **Real-time Content Updates**
- Changes in admin dashboard update main website instantly
- No page refresh needed
- Cached content for performance

## Support:

If you encounter any issues, check the server logs and browser console for detailed error messages.
`;

fs.writeFileSync(path.join(buildDir, 'DEPLOYMENT.md'), deployInstructions);
console.log('✅ Deployment instructions created');

console.log('\n🎉 Production deployment preparation complete!');
console.log('📁 All files are ready in the "build" folder');
console.log('📖 See DEPLOYMENT.md for upload instructions');
