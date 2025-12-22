#!/usr/bin/env node

/**
 * Secure Admin User Creation Script
 * Creates a new admin user with secure password requirements
 */

import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import readline from 'readline';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'afeworcn_afework_admin',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'afeworcn_afework_content'
};

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Password validation function
function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);
    
    if (password.length < minLength) {
        return { valid: false, message: `Password must be at least ${minLength} characters long` };
    }
    if (!hasUpperCase) {
        return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!hasLowerCase) {
        return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!hasNumbers) {
        return { valid: false, message: 'Password must contain at least one number' };
    }
    if (!hasSpecialChar) {
        return { valid: false, message: 'Password must contain at least one special character (@$!%*?&)' };
    }
    
    return { valid: true };
}

// Get user input with hidden password
function getPassword(prompt) {
    return new Promise((resolve) => {
        process.stdout.write(prompt);
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        
        let password = '';
        process.stdin.on('data', function(char) {
            char = char + '';
            switch (char) {
                case '\n':
                case '\r':
                case '\u0004':
                    process.stdin.setRawMode(false);
                    process.stdin.pause();
                    process.stdin.removeAllListeners('data');
                    console.log('');
                    resolve(password);
                    break;
                case '\u0003':
                    process.exit();
                    break;
                case '\u007f':
                    if (password.length > 0) {
                        password = password.slice(0, -1);
                        process.stdout.write('\b \b');
                    }
                    break;
                default:
                    password += char;
                    process.stdout.write('*');
                    break;
            }
        });
    });
}

// Ask question and get response
function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

async function createAdminUser() {
    console.log('🔐 Afework Pharma - Secure Admin User Creation');
    console.log('===============================================\n');
    
    try {
        // Test database connection
        console.log('🔄 Testing database connection...');
        const connection = await mysql.createConnection(dbConfig);
        console.log('✅ Database connected successfully\n');
        
        // Get admin details
        const username = await askQuestion('Enter admin username: ');
        if (!username || username.length < 3) {
            console.log('❌ Username must be at least 3 characters long');
            process.exit(1);
        }
        
        // Check if username already exists
        const [existingUsers] = await connection.execute(
            'SELECT id FROM admin_users WHERE username = ?',
            [username]
        );
        
        if (existingUsers.length > 0) {
            console.log('❌ Username already exists. Please choose a different username.');
            process.exit(1);
        }
        
        const email = await askQuestion('Enter admin email: ');
        if (!email || !email.includes('@')) {
            console.log('❌ Please enter a valid email address');
            process.exit(1);
        }
        
        // Get password with validation
        let password, confirmPassword;
        let passwordValid = false;
        
        while (!passwordValid) {
            password = await getPassword('Enter password: ');
            const validation = validatePassword(password);
            
            if (!validation.valid) {
                console.log(`❌ ${validation.message}`);
                console.log('Password requirements:');
                console.log('- At least 8 characters');
                console.log('- At least one uppercase letter');
                console.log('- At least one lowercase letter');
                console.log('- At least one number');
                console.log('- At least one special character (@$!%*?&)\n');
                continue;
            }
            
            confirmPassword = await getPassword('Confirm password: ');
            
            if (password !== confirmPassword) {
                console.log('❌ Passwords do not match. Please try again.\n');
                continue;
            }
            
            passwordValid = true;
        }
        
        // Hash password
        console.log('🔄 Hashing password...');
        const saltRounds = 12; // Increased from default 10 for better security
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Create admin user
        console.log('🔄 Creating admin user...');
        await connection.execute(
            'INSERT INTO admin_users (username, password_hash, email) VALUES (?, ?, ?)',
            [username, hashedPassword, email]
        );
        
        console.log('✅ Admin user created successfully!');
        console.log('\n📋 Admin Details:');
        console.log(`   Username: ${username}`);
        console.log(`   Email: ${email}`);
        console.log(`   Created: ${new Date().toISOString()}`);
        
        // Security recommendations
        console.log('\n🔒 Security Recommendations:');
        console.log('1. Store these credentials securely');
        console.log('2. Change the default password immediately after first login');
        console.log('3. Enable two-factor authentication if available');
        console.log('4. Regularly update passwords');
        console.log('5. Monitor admin access logs');
        
        await connection.end();
        
    } catch (error) {
        console.error('❌ Error creating admin user:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.error('💡 Make sure your MySQL server is running');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('💡 Check your database credentials in .env file');
        } else if (error.code === 'ER_BAD_DB_ERROR') {
            console.error('💡 Database does not exist. Run setup-database.js first');
        }
        
        process.exit(1);
    } finally {
        rl.close();
    }
}

// Run the script
createAdminUser();
