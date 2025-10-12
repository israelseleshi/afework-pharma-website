import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'afeworcn_afework_admin',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'afeworcn_afework_content'
};

async function setupDatabase() {
    let connection;
    
    try {
        console.log('🔄 Connecting to database...');
        connection = await mysql.createConnection(dbConfig);
        console.log('✅ Database connected successfully');

        // Create admin_users table if it doesn't exist
        console.log('🔄 Creating admin_users table...');
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS admin_users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                email VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ admin_users table created/verified');

        // Check if admin user exists
        const [existingUsers] = await connection.execute(
            'SELECT id FROM admin_users WHERE username = ?',
            ['admin']
        );

        if (existingUsers.length === 0) {
            // Create default admin user
            console.log('🔄 Creating default admin user...');
            const defaultPassword = 'adm@123';
            const hashedPassword = await bcrypt.hash(defaultPassword, 10);
            
            await connection.execute(
                'INSERT INTO admin_users (username, password_hash, email) VALUES (?, ?, ?)',
                ['admin', hashedPassword, 'admin@afeworkpharmaet.com']
            );
            
            console.log('✅ Default admin user created');
            console.log('📋 Login credentials:');
            console.log('   Username: admin');
            console.log('   Password: adm@123');
        } else {
            console.log('ℹ️  Admin user already exists');
        }

        // Verify site_content table exists
        console.log('🔄 Verifying site_content table...');
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS site_content (
                id INT AUTO_INCREMENT PRIMARY KEY,
                section_key VARCHAR(100) UNIQUE NOT NULL,
                content_type ENUM('text', 'html', 'json', 'image') DEFAULT 'text',
                content_value TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ site_content table verified');

        // Verify media_library table exists
        console.log('🔄 Verifying media_library table...');
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS media_library (
                id INT AUTO_INCREMENT PRIMARY KEY,
                filename VARCHAR(255) NOT NULL,
                original_name VARCHAR(255) NOT NULL,
                file_path VARCHAR(500) NOT NULL,
                file_type VARCHAR(100) NOT NULL,
                file_size INT NOT NULL,
                uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ media_library table verified');

        console.log('🎉 Database setup completed successfully!');
        
    } catch (error) {
        console.error('❌ Database setup failed:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.error('💡 Make sure your MySQL server is running');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('💡 Check your database credentials in .env file');
        } else if (error.code === 'ER_BAD_DB_ERROR') {
            console.error('💡 Database does not exist. Create it first or check DB_NAME in .env');
        }
        
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

setupDatabase();
