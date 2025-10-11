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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Database connection
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'afeworcn_afework_admin',
    password: process.env.DB_PASS || process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'afeworcn_afework_content',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

let db;
try {
    db = mysql.createPool(dbConfig);
    console.log('✅ Database connection pool created');
} catch (error) {
    console.error('❌ Database connection failed:', error);
}

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://www.afeworkpharmaet.com', 'https://afeworkpharmaet.com']
        : ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rate limiting for login
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many login attempts, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
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

// Create nodemailer transporter with your email configuration
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'afeworkpharmaet.com',
    port: parseInt(process.env.EMAIL_PORT) || 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER || 'contact@afeworkpharmaet.com',
        pass: process.env.EMAIL_PASS || 'mQ+3HMm2(g)q.R758J!;Lb'
    },
    tls: {
        rejectUnauthorized: false // Accept self-signed certificates
    }
});

// Verify transporter configuration
transporter.verify((error, success) => {
    if (error) {
        console.log('❌ SMTP Configuration Error:', error);
        console.log('📧 Email service will not work properly. Please check your email credentials.');
    } else {
        console.log('✅ SMTP Server is ready to send emails');
        console.log(`📧 Email configured for: ${process.env.EMAIL_USER || 'contact@afeworkpharmaet.com'}`);
    }
});

// ==================== API ROUTES ====================

// Authentication Routes
app.post('/api/admin/login', loginLimiter, async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validation
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
        });

        const { error } = schema.validate({ username, password });
        if (error) {
            return res.status(400).json({ 
                success: false, 
                message: error.details[0].message 
            });
        }

        // Check user in database
        const [rows] = await db.execute(
            'SELECT * FROM admin_users WHERE username = ?',
            [username]
        );

        if (rows.length === 0) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

        const user = rows[0];
        const isValidPassword = await bcrypt.compare(password, user.password_hash);

        if (!isValidPassword) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: { id: user.id, username: user.username }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
});

// Content Management Routes
app.get('/api/content/all', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM site_content');
        const content = {};
        
        rows.forEach(row => {
            content[row.section_key] = {
                type: row.content_type,
                value: row.content_type === 'json' ? JSON.parse(row.content_value) : row.content_value,
                updated_at: row.updated_at
            };
        });

        res.json({ success: true, content });
    } catch (error) {
        console.error('Error fetching content:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch content' 
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
app.post('/send-message', async (req, res) => {
    try {
        const { name, email, phone, organization, inquiryType, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name, email, and message are required fields.' 
            });
        }

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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Afework Pharma server running on port ${PORT}`);
    console.log(`📧 Email service configured for contact@afeworkpharmaet.com`);
});

export default app;
