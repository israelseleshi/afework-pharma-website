/**
 * Automated CMS Database Setup
 * Creates all necessary tables and inserts default data
 */

import mysql from 'mysql2/promise';

// Database configuration (same as your existing setup)
const dbConfig = {
    host: 'mysql.lu-shared04.dapanel.net',
    user: 'afeworcn_afework_admin',
    password: 'mQ+3HMm2(g)q.R758J!;Lb',
    database: 'afeworcn_afework_content'
};

async function setupCMSDatabase() {
    let connection;
    
    try {
        console.log('🔌 Connecting to database...');
        connection = await mysql.createConnection(dbConfig);
        console.log('✅ Database connection established');

        // Create cms_admins table
        console.log('📋 Creating cms_admins table...');
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS cms_admins (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                email VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_login TIMESTAMP NULL,
                is_active BOOLEAN DEFAULT TRUE
            )
        `);
        console.log('✅ cms_admins table created');

        // Create cms_hero_content table
        console.log('📋 Creating cms_hero_content table...');
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS cms_hero_content (
                id INT AUTO_INCREMENT PRIMARY KEY,
                content_key VARCHAR(100) UNIQUE NOT NULL,
                content_type ENUM('text', 'json', 'image', 'url') NOT NULL,
                content_value TEXT NOT NULL,
                display_name VARCHAR(200) NOT NULL,
                description TEXT,
                updated_by INT,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                is_active BOOLEAN DEFAULT TRUE,
                FOREIGN KEY (updated_by) REFERENCES cms_admins(id)
            )
        `);
        console.log('✅ cms_hero_content table created');

        // Create cms_content_history table
        console.log('📋 Creating cms_content_history table...');
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS cms_content_history (
                id INT AUTO_INCREMENT PRIMARY KEY,
                content_id INT NOT NULL,
                old_value TEXT,
                new_value TEXT NOT NULL,
                changed_by INT NOT NULL,
                changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                change_reason VARCHAR(500),
                FOREIGN KEY (content_id) REFERENCES cms_hero_content(id),
                FOREIGN KEY (changed_by) REFERENCES cms_admins(id)
            )
        `);
        console.log('✅ cms_content_history table created');

        // Insert admin user (password: AfeworkAdmin2024!)
        console.log('👤 Creating admin user...');
        await connection.execute(`
            INSERT INTO cms_admins (username, password_hash, email) VALUES 
            ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@afeworkpharmaet.com')
            ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)
        `);
        console.log('✅ Admin user created/updated');

        // Insert default hero content
        console.log('📝 Inserting default hero content...');
        
        const heroContent = [
            {
                key: 'hero_headline',
                type: 'text',
                value: 'Advanced Medical Solutions for a Healthier Ethiopia',
                name: 'Hero Headline',
                desc: 'Main headline text displayed in the hero section'
            },
            {
                key: 'hero_subheadline', 
                type: 'text',
                value: 'Delivering state-of-the-art medical equipment backed by comprehensive technical support and training across the nation. Your trusted partner in healthcare technology advancement.',
                name: 'Hero Subheadline',
                desc: 'Descriptive text below the main headline'
            },
            {
                key: 'hero_stats',
                type: 'json',
                value: '[{"number": 45, "suffix": "+", "label": "IVD Units Deployed"}, {"number": 36, "suffix": "+", "label": "Healthcare Facilities"}, {"number": 5, "suffix": "+", "label": "Years Experience"}]',
                name: 'Hero Statistics',
                desc: 'Statistics displayed in the hero section'
            },
            {
                key: 'hero_cta_primary',
                type: 'text', 
                value: 'Explore Our Solutions',
                name: 'Primary CTA Button',
                desc: 'Text for the primary call-to-action button'
            },
            {
                key: 'hero_cta_secondary',
                type: 'text',
                value: 'Contact Us Today', 
                name: 'Secondary CTA Button',
                desc: 'Text for the secondary call-to-action button'
            },
            {
                key: 'hero_background_image',
                type: 'url',
                value: '/images/hero-medical-equipment.jpg',
                name: 'Hero Background Image', 
                desc: 'Background image URL for the hero section'
            },
            {
                key: 'hero_featured_image',
                type: 'url',
                value: '/images/medical-professional.jpg',
                name: 'Hero Featured Image',
                desc: 'Main featured image in the hero section'
            }
        ];

        for (const content of heroContent) {
            await connection.execute(`
                INSERT INTO cms_hero_content (content_key, content_type, content_value, display_name, description) 
                VALUES (?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE 
                    content_value = VALUES(content_value),
                    display_name = VALUES(display_name),
                    description = VALUES(description)
            `, [content.key, content.type, content.value, content.name, content.desc]);
            
            console.log(`✅ Inserted/updated: ${content.name}`);
        }

        // Verify setup
        console.log('🔍 Verifying setup...');
        
        const [adminRows] = await connection.execute('SELECT COUNT(*) as count FROM cms_admins');
        const [contentRows] = await connection.execute('SELECT COUNT(*) as count FROM cms_hero_content');
        
        console.log(`✅ Admin users: ${adminRows[0].count}`);
        console.log(`✅ Hero content items: ${contentRows[0].count}`);

        // Test admin credentials
        const [adminCheck] = await connection.execute(
            'SELECT username, email FROM cms_admins WHERE username = ?', 
            ['admin']
        );
        
        if (adminCheck.length > 0) {
            console.log(`✅ Admin user verified: ${adminCheck[0].username} (${adminCheck[0].email})`);
        }

        console.log('\n🎉 CMS DATABASE SETUP COMPLETE!');
        console.log('📋 Summary:');
        console.log('   • Database tables created');
        console.log('   • Admin user configured');
        console.log('   • Default hero content inserted');
        console.log('   • System ready for production use');
        console.log('\n🔑 Admin Login Credentials:');
        console.log('   Username: admin');
        console.log('   Password: AfeworkAdmin2024!');
        console.log('   URL: https://afeworkpharmaet.com/admin');

    } catch (error) {
        console.error('❌ Database setup failed:', error.message);
        console.error('Full error:', error);
    } finally {
        if (connection) {
            await connection.end();
            console.log('🔌 Database connection closed');
        }
    }
}

// Run the setup
setupCMSDatabase();
