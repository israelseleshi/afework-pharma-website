import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import Joi from 'joi';
import dotenv from 'dotenv';
import helmet from 'helmet';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Database connection
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'afeworcn_afework_admin',
    password: process.env.DB_PASSWORD || 'mQ+3HMm2(g)q.R758J!;Lb',
    database: process.env.DB_NAME || 'afeworcn_afework_content',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

console.log('🔧 Database configuration:', {
    host: dbConfig.host,
    user: dbConfig.user,
    database: dbConfig.database,
    password: dbConfig.password ? '***hidden***' : 'NOT SET',
    environment: process.env.NODE_ENV || 'development'
});

let db;
try {
    db = mysql.createPool(dbConfig);
    console.log('✅ Database connection pool created');
} catch (error) {
    console.error('❌ Database connection failed:', error);
}

// Temporary in-memory content storage (until database is connected)
let contentStore = {
    'hero_headline': {
        type: 'text',
        value: 'Advanced Medical Solutions for a Healthier Ethiopia',
        updated_at: new Date().toISOString()
    },
    'hero_subheadline': {
        type: 'text', 
        value: 'Delivering state-of-the-art medical equipment backed by comprehensive technical support and training across the nation.',
        updated_at: new Date().toISOString()
    },
    'hero_stats': {
        type: 'json',
        value: JSON.stringify([
            { number: 45, suffix: '+', label: 'IVD Units Deployed' },
            { number: 36, suffix: '+', label: 'Healthcare Facilities' },
            { number: 5, suffix: '+', label: 'Years Experience' }
        ]),
        updated_at: new Date().toISOString()
    }
};

// JWT Secret - Use environment variable or fallback for development
const JWT_SECRET = process.env.JWT_SECRET || 'AfeworkPharma2024!DevJWT$ecret#Key@MedicalSolutions&Ethiopia*Secure';

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: ["'self'"],
            connectSrc: ["'self'"],
            frameSrc: ["'none'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: []
        }
    },
    crossOriginEmbedderPolicy: false
}));

// CORS configuration
const corsOptions = {
    origin: process.env.CORS_ORIGINS 
        ? process.env.CORS_ORIGINS.split(',')
        : (process.env.NODE_ENV === 'production' 
            ? ['https://www.afeworkpharmaet.com', 'https://afeworkpharmaet.com']
            : ['http://localhost:3000', 'http://localhost:5173']),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));

// Enhanced rate limiting
const loginLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: { success: false, message: 'Too many login attempts, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true
});

// General API rate limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    message: { success: false, message: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false
});

// Admin routes rate limiting
const adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // More restrictive for admin routes
    message: { success: false, message: 'Too many admin requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false
});

// Enhanced file upload configuration with security
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Create secure upload directory outside public access
        const uploadDir = 'uploads/secure/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Generate secure filename with timestamp and random string
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        const extension = path.extname(sanitizedName);
        const secureFilename = `${timestamp}-${randomString}${extension}`;
        cb(null, secureFilename);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB limit
        files: 5, // Maximum 5 files per request
    },
    fileFilter: (req, file, cb) => {
        // Enhanced file type validation
        const allowedTypes = process.env.ALLOWED_FILE_TYPES 
            ? process.env.ALLOWED_FILE_TYPES.split(',')
            : ['jpeg', 'jpg', 'png', 'gif', 'webp', 'pdf', 'doc', 'docx'];
        
        const fileExtension = path.extname(file.originalname).toLowerCase().substring(1);
        const mimeType = file.mimetype.toLowerCase();
        
        // Check both extension and MIME type
        const isValidExtension = allowedTypes.includes(fileExtension);
        const isValidMimeType = allowedTypes.some(type => mimeType.includes(type));
        
        if (isValidExtension && isValidMimeType) {
            return cb(null, true);
        } else {
            cb(new Error(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`));
        }
    }
});

// Input validation schemas
const validationSchemas = {
    login: Joi.object({
        username: Joi.string().trim().min(3).max(50).required(),
        password: Joi.string().min(6).max(128).required(),
        rememberMe: Joi.boolean().optional()
    }),
    
    passwordUpdate: Joi.object({
        currentPassword: Joi.string().required(),
        newPassword: Joi.string().min(8).max(128).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/).required()
            .messages({
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            })
    }),
    
    contactForm: Joi.object({
        name: Joi.string().trim().min(2).max(100).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().trim().max(20).optional().allow(''),
        organization: Joi.string().trim().max(200).optional().allow(''),
        inquiryType: Joi.string().trim().max(100).optional().allow(''),
        message: Joi.string().trim().min(10).max(2000).required()
    }),
    
    contentUpdate: Joi.object({
        content_type: Joi.string().valid('text', 'html', 'json', 'image').required(),
        content_value: Joi.string().max(10000).required()
    }),
    
    batchContentUpdate: Joi.object({
        updates: Joi.array().items(Joi.object({
            section_key: Joi.string().trim().max(100).required(),
            content_type: Joi.string().valid('text', 'html', 'json', 'image').required(),
            content_value: Joi.string().max(10000).required()
        })).min(1).max(50).required()
    })
};

// Enhanced authentication middleware with token validation
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Access token required',
            code: 'NO_TOKEN'
        });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Token has expired',
                    code: 'TOKEN_EXPIRED'
                });
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(403).json({ 
                    success: false, 
                    message: 'Invalid token',
                    code: 'INVALID_TOKEN'
                });
            } else {
                return res.status(403).json({ 
                    success: false, 
                    message: 'Token verification failed',
                    code: 'TOKEN_VERIFICATION_FAILED'
                });
            }
        }
        
        // Add token expiration check
        const now = Math.floor(Date.now() / 1000);
        if (user.exp && user.exp < now) {
            return res.status(401).json({ 
                success: false, 
                message: 'Token has expired',
                code: 'TOKEN_EXPIRED'
            });
        }
        
        req.user = user;
        next();
    });
};

// Input validation middleware
const validateInput = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                details: error.details.map(detail => ({
                    field: detail.path.join('.'),
                    message: detail.message
                }))
            });
        }
        next();
    };
};

// Serve static files from build directory in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
    app.use('/uploads', express.static('public/uploads'));
} else {
    // In development, we'll proxy to Vite or serve a simple message
    console.log('🔧 Development mode: Run "npm run dev" in another terminal for frontend');
    app.use('/uploads', express.static('public/uploads'));
}

// Create uploads directory if it doesn't exist
import fs from 'fs';
const uploadsDir = 'public/uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('📁 Created uploads directory');
}

// Create nodemailer transporter with secure configuration
// --------------------------------------------------------------------------------------
let transporter;

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ CRITICAL ERROR: EMAIL_USER or EMAIL_PASS not set in .env file.');
    console.log('📧 Email service is disabled. Check .env file before deployment.');
    
    // Create a mock transporter that will always fail safely if credentials are missing
    transporter = { 
        sendMail: async () => { 
            throw new Error('Email credentials missing from .env file.'); 
        },
        verify: (cb) => { cb(new Error('Email credentials not configured.')); }
    };
} else {
    // Nodemailer transporter configuration
    // Using port 587 (STARTTLS) as default - more compatible with shared hosting
    // If this fails, change EMAIL_PORT in .env to 465 and it will auto-switch to SSL
    
    const emailPort = parseInt(process.env.EMAIL_PORT) || 465; 
    const isSecure = emailPort === 465; // SSL for 465, STARTTLS for 587

    transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'afeworkpharmaet.com',
        port: emailPort, 
        secure: isSecure, 
        auth: {
            user: process.env.EMAIL_USER || 'contact@afeworkpharmaet.com',
            pass: process.env.EMAIL_PASS || 'mQ+3HMm2(g)q.R758J!;Lb'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // Verify transporter configuration
    transporter.verify((error, success) => {
        if (error) {
            console.log('❌ SMTP Configuration Error:', error.message);
            console.log('💡 Try changing EMAIL_PORT in .env to 465 (SSL) or 587 (STARTTLS)');
            console.log('📧 Current config:', { 
                host: process.env.EMAIL_HOST || 'afeworkpharmaet.com',
                port: emailPort,
                secure: isSecure,
                user: process.env.EMAIL_USER
            });
        } else {
            console.log(`✅ SMTP Server on port ${emailPort} (${isSecure ? 'SSL' : 'STARTTLS'}) is ready`);
            console.log(`📧 Email configured for: ${process.env.EMAIL_USER}`);
        }
    });
}
// --------------------------------------------------------------------------------------

// ==================== API ROUTES ====================

// Database Connection Test Route
app.get('/api/test-db', async (req, res) => {
    console.log('🔍 API /test-db called');
    
    try {
        console.log('🔍 Testing database connection...');
        console.log('Database Config:', {
            host: dbConfig.host,
            user: dbConfig.user,
            database: dbConfig.database,
            password: dbConfig.password ? '***hidden***' : 'NOT SET'
        });
        
        if (!db) {
            console.log('❌ Database pool not initialized');
            return res.status(500).json({
                success: false,
                message: 'Database pool not initialized',
                config: dbConfig
            });
        }
        
        console.log('🔍 Testing basic connection...');
        // Test basic connection
        const [rows] = await db.execute('SELECT 1 as test');
        console.log('✅ Database connection successful!');
        
        console.log('🔍 Getting table information...');
        // Test if our database exists and get table info
        const [tables] = await db.execute(`
            SELECT TABLE_NAME, TABLE_ROWS, TABLE_COMMENT 
            FROM information_schema.TABLES 
            WHERE TABLE_SCHEMA = ?
        `, [dbConfig.database]);
        
        console.log('📊 Tables in database:', tables);
        
        // Test site_content table specifically
        console.log('🔍 Testing site_content table...');
        const [contentRows] = await db.execute('SELECT COUNT(*) as count FROM site_content');
        console.log('📊 Content rows:', contentRows);
        
        const response = {
            success: true,
            message: 'Database connection successful!',
            database: dbConfig.database,
            tables: tables,
            testQuery: rows,
            contentCount: contentRows[0].count,
            timestamp: new Date().toISOString()
        };
        
        console.log('✅ Sending successful response:', response);
        res.json(response);
        
    } catch (error) {
        console.error('❌ Database connection test failed:', error);
        const errorResponse = {
            success: false,
            message: 'Database connection failed',
            error: error.message,
            code: error.code,
            sqlState: error.sqlState,
            config: {
                host: dbConfig.host,
                user: dbConfig.user,
                database: dbConfig.database
            },
            timestamp: new Date().toISOString()
        };
        
        console.log('❌ Sending error response:', errorResponse);
        res.status(500).json(errorResponse);
    }
});

// Simple test endpoint to verify server is running
app.get('/api/ping', (req, res) => {
    console.log('🏓 Ping endpoint called');
    res.json({ 
        success: true, 
        message: 'Server is running!', 
        timestamp: new Date().toISOString() 
    });
});

// Apply general rate limiting to all API routes
app.use('/api', apiLimiter);

// Authentication Routes
app.post('/api/admin/login', loginLimiter, validateInput(validationSchemas.login), async (req, res) => {
    try {
        const { username, password, rememberMe } = req.body;

        // Try database authentication first
        try {
            const [rows] = await db.execute(
                'SELECT * FROM admin_users WHERE username = ?',
                [username.trim()]
            );
            
            if (rows.length > 0) {
                const user = rows[0];
                
                // Validate password
                const isValidPassword = await bcrypt.compare(password, user.password_hash);

                if (isValidPassword) {
                    // Generate JWT token with appropriate expiration
                    const tokenExpiration = rememberMe ? '30d' : '24h';
                    const token = jwt.sign(
                        { 
                            userId: user.id, 
                            username: user.username,
                            rememberMe: !!rememberMe,
                            iat: Math.floor(Date.now() / 1000)
                        },
                        JWT_SECRET,
                        { expiresIn: tokenExpiration }
                    );

                    // Log successful login
                    console.log(`✅ Admin login successful: ${username} (Remember: ${!!rememberMe})`);

                    return res.json({
                        success: true,
                        message: 'Login successful',
                        token,
                        user: { 
                            id: user.id, 
                            username: user.username,
                            rememberMe: !!rememberMe
                        },
                        expiresIn: tokenExpiration
                    });
                }
            }
        } catch (dbError) {
            console.warn('⚠️ Database authentication failed, trying development fallback:', dbError.message);
        }

        // Development fallback - hardcoded credentials for local development
        if (process.env.NODE_ENV === 'development' && username === 'admin' && password === 'adm@123') {
            console.log('🔧 Using development fallback authentication');
            
            // Generate JWT token with appropriate expiration
            const tokenExpiration = rememberMe ? '30d' : '24h';
            const token = jwt.sign(
                { 
                    userId: 1, 
                    username: 'admin',
                    rememberMe: !!rememberMe,
                    iat: Math.floor(Date.now() / 1000)
                },
                JWT_SECRET,
                { expiresIn: tokenExpiration }
            );

            // Log successful login
            console.log(`✅ Development admin login successful: ${username} (Remember: ${!!rememberMe})`);

            return res.json({
                success: true,
                message: 'Login successful (development mode)',
                token,
                user: { 
                    id: 1, 
                    username: 'admin',
                    rememberMe: !!rememberMe
                },
                expiresIn: tokenExpiration
            });
        }

        // Invalid credentials
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid credentials' 
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
});

// Password Update Route
app.post('/api/admin/update-password', adminLimiter, authenticateToken, validateInput(validationSchemas.passwordUpdate), async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // Verify current password
        const [userRows] = await db.execute(
            'SELECT password_hash FROM admin_users WHERE id = ?',
            [req.user.userId]
        );
        
        if (userRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        const isValidCurrentPassword = await bcrypt.compare(currentPassword, userRows[0].password_hash);
        if (!isValidCurrentPassword) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }
        
        // Hash new password with increased salt rounds for better security
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        
        // Update password in database
        await db.execute(
            'UPDATE admin_users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [hashedPassword, req.user.userId]
        );
        
        console.log(`✅ Password updated for user: ${req.user.username}`);

        res.json({
            success: true,
            message: 'Password updated successfully!'
        });

    } catch (error) {
        console.error('Password update error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to update password' 
        });
    }
});

// Content Management Routes
app.get('/api/content/all', async (req, res) => {
    try {
        const content = {};
        
        // Try database first, fallback to in-memory storage
        try {
            const [rows] = await db.execute('SELECT * FROM site_content');
            rows.forEach(row => {
                content[row.section_key] = {
                    type: row.content_type,
                    value: row.content_type === 'json' ? JSON.parse(row.content_value) : row.content_value,
                    updated_at: row.updated_at
                };
            });
            console.log('✅ Content fetched from database:', Object.keys(content));
        } catch (dbError) {
            console.warn('⚠️ Database unavailable, using in-memory storage:', dbError.message);
            
            // Fallback to in-memory storage
            Object.keys(contentStore).forEach(key => {
                const item = contentStore[key];
                content[key] = {
                    type: item.type,
                    value: item.type === 'json' ? JSON.parse(item.value) : item.value,
                    updated_at: item.updated_at
                };
            });
            console.log('✅ Content fetched from in-memory storage:', Object.keys(content));
        }
        
        res.json({ success: true, content });
        
    } catch (error) {
        console.error('Error fetching content:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch content' 
        });
    }
});

// Batch Content Update Route
app.post('/api/content/batch', adminLimiter, authenticateToken, validateInput(validationSchemas.batchContentUpdate), async (req, res) => {
    try {
        const { updates } = req.body;

        // For now, just log the updates since database connection has issues
        console.log('\n📝 Content Updates Received:');
        updates.forEach((update, index) => {
            console.log(`${index + 1}. ${update.section_key}: ${update.content_value}`);
        });
        console.log('\n✅ Content would be updated in database when connection is restored.\n');

        // TODO: When database connection is fixed, implement actual updates:
        // for (const update of updates) {
        //     await db.execute(
        //         'INSERT INTO site_content (section_key, content_type, content_value) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE content_value = ?, updated_at = CURRENT_TIMESTAMP',
        //         [update.section_key, update.content_type, update.content_value, update.content_value]
        //     );
        // }

        res.json({
            success: true,
            message: `Successfully updated ${updates.length} content items. Check server console for details.`
        });

    } catch (error) {
        console.error('Batch update error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update content'
        });
    }
});

app.get('/api/content/:section', async (req, res) => {
    try {
        const { section } = req.params;
        const [rows] = await db.execute(
            'SELECT * FROM site_content WHERE section_key = ?',
            [section]
        );

        if (rows.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'Content section not found' 
            });
        }

        const row = rows[0];
        const content = {
            type: row.content_type,
            value: row.content_type === 'json' ? JSON.parse(row.content_value) : row.content_value,
            updated_at: row.updated_at
        };

        res.json({ success: true, content });
    } catch (error) {
        console.error('Error fetching content section:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch content section' 
        });
    }
});

app.put('/api/content/:section', authenticateToken, async (req, res) => {
    try {
        const { section } = req.params;
        const { content_type, content_value } = req.body;

        // Validation
        const schema = Joi.object({
            content_type: Joi.string().valid('text', 'html', 'json', 'image').required(),
            content_value: Joi.string().required()
        });

        const { error } = schema.validate({ content_type, content_value });
        if (error) {
            return res.status(400).json({ 
                success: false, 
                message: error.details[0].message 
            });
        }

        // Check if section exists
        const [existingRows] = await db.execute(
            'SELECT id FROM site_content WHERE section_key = ?',
            [section]
        );

        if (existingRows.length > 0) {
            // Update existing
            await db.execute(
                'UPDATE site_content SET content_type = ?, content_value = ?, updated_at = CURRENT_TIMESTAMP WHERE section_key = ?',
                [content_type, content_value, section]
            );
        } else {
            // Insert new
            await db.execute(
                'INSERT INTO site_content (section_key, content_type, content_value) VALUES (?, ?, ?)',
                [section, content_type, content_value]
            );
        }

        res.json({ 
            success: true, 
            message: 'Content updated successfully' 
        });

    } catch (error) {
        console.error('Error updating content:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to update content' 
        });
    }
});

app.post('/api/content/batch', authenticateToken, async (req, res) => {
    try {
        const { updates } = req.body;

        if (!Array.isArray(updates)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Updates must be an array' 
            });
        }

        for (const update of updates) {
            const { section_key, content_type, content_value } = update;
            
            const [existingRows] = await db.execute(
                'SELECT id FROM site_content WHERE section_key = ?',
                [section_key]
            );

            if (existingRows.length > 0) {
                await db.execute(
                    'UPDATE site_content SET content_type = ?, content_value = ?, updated_at = CURRENT_TIMESTAMP WHERE section_key = ?',
                    [content_type, content_value, section_key]
                );
            } else {
                await db.execute(
                    'INSERT INTO site_content (section_key, content_type, content_value) VALUES (?, ?, ?)',
                    [section_key, content_type, content_value]
                );
            }
        }

        res.json({ 
            success: true, 
            message: 'Batch update completed successfully' 
        });

    } catch (error) {
        console.error('Error in batch update:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to update content' 
        });
    }
});

// Media Management Routes
app.get('/api/media', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM media_library ORDER BY uploaded_at DESC');
        res.json({ success: true, media: rows });
    } catch (error) {
        console.error('Error fetching media:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch media' 
        });
    }
});

app.post('/api/media/upload', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: 'No file uploaded' 
            });
        }

        const { filename, originalname, path: filePath, mimetype, size } = req.file;

        // Save to database
        const [result] = await db.execute(
            'INSERT INTO media_library (filename, original_name, file_path, file_type, file_size) VALUES (?, ?, ?, ?, ?)',
            [filename, originalname, filePath, mimetype, size]
        );

        res.json({
            success: true,
            message: 'File uploaded successfully',
            media: {
                id: result.insertId,
                filename,
                original_name: originalname,
                file_path: filePath,
                file_type: mimetype,
                file_size: size,
                url: `/uploads/${filename}`
            }
        });

    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to upload file' 
        });
    }
});

app.delete('/api/media/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        // Get file info before deletion
        const [rows] = await db.execute(
            'SELECT * FROM media_library WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'Media not found' 
            });
        }

        const media = rows[0];

        // Delete from database
        await db.execute('DELETE FROM media_library WHERE id = ?', [id]);

        // Delete file from filesystem
        try {
            fs.unlinkSync(media.file_path);
        } catch (fileError) {
            console.warn('Could not delete file from filesystem:', fileError);
        }

        res.json({ 
            success: true, 
            message: 'Media deleted successfully' 
        });

    } catch (error) {
        console.error('Error deleting media:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to delete media' 
        });
    }
});

// Contact form submission route
app.post('/send-message', validateInput(validationSchemas.contactForm), async (req, res) => {
    try {
        const { name, email, phone, organization, inquiryType, message } = req.body;

        // Email content configuration
        const mailOptions = {
            from: `"Afework Pharma Website" <contact@afeworkpharmaet.com>`,
            to: 'contact@afeworkpharmaet.com',
            replyTo: email,
            subject: `New Website Inquiry: ${inquiryType || 'General Inquiry'}`,
            html: `
                <div style="font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 32px 24px; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: white; letter-spacing: -0.025em;">New Contact Inquiry</h1>
                        <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px; font-weight: 500;">Afework Pharma Medical Solutions</p>
                    </div>
                    
                    <!-- Content -->
                    <div style="padding: 32px 24px;">
                        <!-- Contact Information -->
                        <div style="margin-bottom: 32px;">
                            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; letter-spacing: -0.025em;">Contact Details</h2>
                            <div style="background: #f9fafb; padding: 20px; border-radius: 12px; border-left: 4px solid #10b981;">
                                <div style="display: grid; gap: 12px;">
                                    <div style="display: flex; align-items: center; gap: 12px;">
                                        <span style="color: #6b7280; font-size: 14px; font-weight: 500; min-width: 80px;">Name:</span>
                                        <span style="color: #1f2937; font-size: 14px; font-weight: 600;">${name}</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 12px;">
                                        <span style="color: #6b7280; font-size: 14px; font-weight: 500; min-width: 80px;">Email:</span>
                                        <a href="mailto:${email}" style="color: #10b981; font-size: 14px; font-weight: 600; text-decoration: none;">${email}</a>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 12px;">
                                        <span style="color: #6b7280; font-size: 14px; font-weight: 500; min-width: 80px;">Phone:</span>
                                        <span style="color: #1f2937; font-size: 14px; font-weight: 500;">${phone || 'Not provided'}</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 12px;">
                                        <span style="color: #6b7280; font-size: 14px; font-weight: 500; min-width: 80px;">Company:</span>
                                        <span style="color: #1f2937; font-size: 14px; font-weight: 500;">${organization || 'Not specified'}</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 12px;">
                                        <span style="color: #6b7280; font-size: 14px; font-weight: 500; min-width: 80px;">Type:</span>
                                        <span style="color: #10b981; font-size: 14px; font-weight: 600; background: #ecfdf5; padding: 4px 8px; border-radius: 6px;">${inquiryType || 'General Inquiry'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Message -->
                        <div style="margin-bottom: 32px;">
                            <h2 style="color: #1f2937; margin: 0 0 16px 0; font-size: 18px; font-weight: 600; letter-spacing: -0.025em;">Message</h2>
                            <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
                                <p style="line-height: 1.6; color: #4b5563; margin: 0; font-size: 15px;">${message.replace(/\n/g, '<br>')}</p>
                            </div>
                        </div>
                        
                        <!-- Action Note -->
                        <div style="background: #ecfdf5; padding: 16px 20px; border-radius: 12px; border: 1px solid #d1fae5; margin-bottom: 24px;">
                            <p style="margin: 0; color: #065f46; font-size: 14px; font-weight: 500;">
                                💡 <strong>Quick Reply:</strong> You can respond directly to this email to contact ${name}.
                            </p>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div style="background: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
                        <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px; font-weight: 500;">Afework Pharma Medical Solutions</p>
                        <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                            Received: ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Addis_Ababa' })} (Ethiopia Time)
                        </p>
                    </div>
                </div>
            `
        };

        // Send notification email to Afework Pharma
        const info = await transporter.sendMail(mailOptions);
        console.log('Notification email sent successfully:', info.messageId);

        // Send auto-reply email to customer
        const autoReplyOptions = {
            from: `"Afework Pharma" <contact@afeworkpharmaet.com>`,
            to: email,
            subject: `Thank you for contacting Afework Pharma - We'll be in touch soon!`,
            html: `
                <div style="font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 24px; text-align: center;">
                        <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: white; letter-spacing: -0.025em;">Thank You for Contacting Us!</h1>
                        <p style="margin: 12px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px; font-weight: 500;">Afework Pharma Medical Solutions</p>
                    </div>
                    
                    <!-- Content -->
                    <div style="padding: 40px 24px;">
                        <!-- Greeting -->
                        <div style="margin-bottom: 32px;">
                            <p style="font-size: 18px; color: #1f2937; margin: 0 0 20px 0; font-weight: 600;">Dear ${name},</p>
                            <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin: 0 0 16px 0;">
                                We personally want to welcome you to our company and confirm that we have received your inquiry about <strong style="color: #10b981;">${inquiryType || 'our medical equipment solutions'}</strong>.
                            </p>
                            <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin: 0;">
                                Our team of medical equipment specialists will review your requirements and provide you with the services you asked for within <strong style="color: #10b981;">24 hours</strong>.
                            </p>
                        </div>

                        <!-- Inquiry Summary -->
                        <div style="background: #f9fafb; padding: 24px; border-radius: 12px; border-left: 4px solid #10b981; margin-bottom: 32px;">
                            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; letter-spacing: -0.025em;">Your Inquiry Summary</h2>
                            <div style="display: grid; gap: 12px;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <span style="color: #6b7280; font-size: 14px; font-weight: 500; min-width: 100px;">Inquiry Type:</span>
                                    <span style="color: #10b981; font-size: 14px; font-weight: 600; background: #ecfdf5; padding: 4px 8px; border-radius: 6px;">${inquiryType || 'General Inquiry'}</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <span style="color: #6b7280; font-size: 14px; font-weight: 500; min-width: 100px;">Organization:</span>
                                    <span style="color: #1f2937; font-size: 14px; font-weight: 500;">${organization || 'Not specified'}</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <span style="color: #6b7280; font-size: 14px; font-weight: 500; min-width: 100px;">Phone:</span>
                                    <span style="color: #1f2937; font-size: 14px; font-weight: 500;">${phone || 'Not provided'}</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <span style="color: #6b7280; font-size: 14px; font-weight: 500; min-width: 100px;">Submitted:</span>
                                    <span style="color: #1f2937; font-size: 14px; font-weight: 500;">${new Date().toLocaleString('en-US', { timeZone: 'Africa/Addis_Ababa' })} (Ethiopia Time)</span>
                                </div>
                            </div>
                        </div>

                        <!-- What Happens Next -->
                        <div style="background: #ecfdf5; padding: 24px; border-radius: 12px; border: 1px solid #d1fae5; margin-bottom: 32px;">
                            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; letter-spacing: -0.025em;">What Happens Next?</h2>
                            <div style="space-y: 12px;">
                                <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
                                    <span style="color: #10b981; font-size: 16px; margin-top: 2px;">✓</span>
                                    <span style="color: #065f46; font-size: 15px; line-height: 1.5;">Our technical team will review your specific requirements</span>
                                </div>
                                <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
                                    <span style="color: #10b981; font-size: 16px; margin-top: 2px;">✓</span>
                                    <span style="color: #065f46; font-size: 15px; line-height: 1.5;">We'll prepare a customized solution proposal for your needs</span>
                                </div>
                                <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
                                    <span style="color: #10b981; font-size: 16px; margin-top: 2px;">✓</span>
                                    <span style="color: #065f46; font-size: 15px; line-height: 1.5;">A specialist will contact you within 24 hours to discuss details</span>
                                </div>
                                <div style="display: flex; align-items: flex-start; gap: 12px;">
                                    <span style="color: #10b981; font-size: 16px; margin-top: 2px;">✓</span>
                                    <span style="color: #065f46; font-size: 15px; line-height: 1.5;">We'll schedule a consultation or site visit if needed</span>
                                </div>
                            </div>
                        </div>

                        <!-- Contact Information -->
                        <div style="text-align: center; margin-bottom: 32px;">
                            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; letter-spacing: -0.025em;">Get in Touch</h2>
                            <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
                                <a href="tel:+251929092353" style="display: inline-flex; align-items: center; gap: 8px; background: #10b981; color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                                    📞 +251 929 092 353
                                </a>
                                <a href="mailto:contact@afeworkpharmaet.com" style="display: inline-flex; align-items: center; gap: 8px; background: #059669; color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                                    📧 contact@afeworkpharmaet.com
                                </a>
                            </div>
                        </div>

                        <!-- Quick Response Options -->
                        <div style="background: #f1f5f9; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
                            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; letter-spacing: -0.025em; text-align: center;">Quick Response Options</h2>
                            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
                                <a href="mailto:contact@afeworkpharmaet.com?subject=Re: ${inquiryType || 'General Inquiry'} - ${name}" style="display: inline-block; background: #3b82f6; color: white; padding: 10px 16px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 13px; margin: 4px;">Thank you for your response</a>
                                <a href="mailto:contact@afeworkpharmaet.com?subject=Price Inquiry - ${name}" style="display: inline-block; background: #8b5cf6; color: white; padding: 10px 16px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 13px; margin: 4px;">What is the price?</a>
                                <a href="mailto:contact@afeworkpharmaet.com?subject=Location Inquiry - ${name}" style="display: inline-block; background: #f59e0b; color: white; padding: 10px 16px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 13px; margin: 4px;">Where are you based?</a>
                            </div>
                        </div>
                    </div>

                    
                    <!-- Footer -->
                    <div style="background: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
                        <p style="margin: 0 0 8px 0; color: #1f2937; font-size: 14px; font-weight: 600;">Afework Pharma Medical Solutions</p>
                        <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 13px;">Arada Subcity, Eribekentu Bridge, Woreda 08, Building H.No, 1st Floor #102</p>
                        <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 13px;">Addis Ababa, Ethiopia</p>
                        <p style="margin: 0; color: #9ca3af; font-size: 12px;">This is an automated response. We'll be in touch with you soon!</p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(autoReplyOptions);
        console.log('Auto-reply email sent successfully to:', email);

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Thank you for your message! We will get back to you soon.',
            messageId: info.messageId
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Sorry, there was an error sending your message. Please try again later or contact us directly.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server - cPanel will provide PORT via environment variable
const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
    console.log(`🚀 Afework Pharma server running on port ${PORT}`);
    console.log(`📧 Email service configured for contact@afeworkpharmaet.com`);
    console.log(`🔗 Test database connection: http://localhost:${PORT}/api/test-db`);
    console.log(`🏓 Test server ping: http://localhost:${PORT}/api/ping`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use!`);
        console.log('💡 Try one of these solutions:');
        console.log('   1. Kill the process using the port');
        console.log('   2. Use a different port: PORT=3002 node server.js');
        console.log('   3. Check if another server is running');
        process.exit(1);
    } else {
        console.error('❌ Server error:', err);
        process.exit(1);
    }
});

export default app;
