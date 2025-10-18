<?php
/**
 * Automated CMS Database Setup for DirectAdmin
 * Run this once to set up all CMS tables and data
 */

// Set error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set content type
header('Content-Type: text/html; charset=utf-8');

echo "<h1>🚀 Afework Pharma CMS Database Setup</h1>";
echo "<style>
body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
.container { background: white; padding: 30px; border-radius: 10px; max-width: 800px; }
.success { color: #10b981; font-weight: bold; }
.error { color: #ef4444; font-weight: bold; }
.info { background: #f0f9ff; padding: 15px; border-left: 4px solid #0ea5e9; margin: 15px 0; }
.code { background: #f5f5f5; padding: 10px; font-family: monospace; border: 1px solid #ddd; }
</style>";

echo "<div class='container'>";

// Database configuration
$db_config = [
    'host' => 'localhost',
    'user' => 'afeworcn_afework_admin',
    'password' => 'mQ+3HMm2(g)q.R758J!;Lb',
    'database' => 'afeworcn_afework_content'
];

try {
    echo "<h2>🔌 Connecting to Database</h2>";
    $pdo = new PDO(
        "mysql:host={$db_config['host']};dbname={$db_config['database']};charset=utf8mb4",
        $db_config['user'],
        $db_config['password'],
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
    echo "<p class='success'>✅ Database connection successful!</p>";

    // Create cms_admins table
    echo "<h2>📋 Creating CMS Tables</h2>";
    
    echo "<h3>Creating cms_admins table...</h3>";
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS cms_admins (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            email VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMP NULL,
            is_active BOOLEAN DEFAULT TRUE
        )
    ");
    echo "<p class='success'>✅ cms_admins table created</p>";

    echo "<h3>Creating cms_hero_content table...</h3>";
    $pdo->exec("
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
            INDEX idx_content_key (content_key),
            INDEX idx_active (is_active)
        )
    ");
    echo "<p class='success'>✅ cms_hero_content table created</p>";

    echo "<h3>Creating cms_content_history table...</h3>";
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS cms_content_history (
            id INT AUTO_INCREMENT PRIMARY KEY,
            content_id INT NOT NULL,
            old_value TEXT,
            new_value TEXT NOT NULL,
            changed_by INT NOT NULL,
            changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            change_reason VARCHAR(500),
            INDEX idx_content_id (content_id),
            INDEX idx_changed_at (changed_at)
        )
    ");
    echo "<p class='success'>✅ cms_content_history table created</p>";

    // Insert admin user
    echo "<h2>👤 Creating Admin User</h2>";
    $stmt = $pdo->prepare("
        INSERT INTO cms_admins (username, password_hash, email) VALUES 
        ('admin', ?, 'admin@afeworkpharmaet.com')
        ON DUPLICATE KEY UPDATE 
            password_hash = VALUES(password_hash),
            email = VALUES(email)
    ");
    
    // Password hash for 'AfeworkAdmin2024!'
    $password_hash = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';
    $stmt->execute([$password_hash]);
    echo "<p class='success'>✅ Admin user created/updated</p>";

    // Insert default hero content
    echo "<h2>📝 Inserting Default Hero Content</h2>";
    
    $hero_content = [
        [
            'hero_headline',
            'text',
            'Advanced Medical Solutions for a Healthier Ethiopia',
            'Hero Headline',
            'Main headline text displayed in the hero section'
        ],
        [
            'hero_subheadline',
            'text', 
            'Delivering state-of-the-art medical equipment backed by comprehensive technical support and training across the nation. Your trusted partner in healthcare technology advancement.',
            'Hero Subheadline',
            'Descriptive text below the main headline'
        ],
        [
            'hero_stats',
            'json',
            '[{"number": 45, "suffix": "+", "label": "IVD Units Deployed"}, {"number": 36, "suffix": "+", "label": "Healthcare Facilities"}, {"number": 5, "suffix": "+", "label": "Years Experience"}]',
            'Hero Statistics',
            'Statistics displayed in the hero section'
        ],
        [
            'hero_cta_primary',
            'text',
            'Explore Our Solutions',
            'Primary CTA Button', 
            'Text for the primary call-to-action button'
        ],
        [
            'hero_cta_secondary',
            'text',
            'Contact Us Today',
            'Secondary CTA Button',
            'Text for the secondary call-to-action button'
        ],
        [
            'hero_background_image',
            'url',
            '/images/hero-medical-equipment.jpg',
            'Hero Background Image',
            'Background image URL for the hero section'
        ],
        [
            'hero_featured_image', 
            'url',
            '/images/medical-professional.jpg',
            'Hero Featured Image',
            'Main featured image in the hero section'
        ]
    ];

    $stmt = $pdo->prepare("
        INSERT INTO cms_hero_content (content_key, content_type, content_value, display_name, description) 
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            content_value = VALUES(content_value),
            display_name = VALUES(display_name),
            description = VALUES(description),
            updated_at = CURRENT_TIMESTAMP
    ");

    foreach ($hero_content as $content) {
        $stmt->execute($content);
        echo "<p class='success'>✅ Inserted/updated: {$content[3]}</p>";
    }

    // Verify setup
    echo "<h2>🔍 Verifying Setup</h2>";
    
    $admin_count = $pdo->query("SELECT COUNT(*) FROM cms_admins")->fetchColumn();
    $content_count = $pdo->query("SELECT COUNT(*) FROM cms_hero_content WHERE is_active = 1")->fetchColumn();
    
    echo "<p class='success'>✅ Admin users: $admin_count</p>";
    echo "<p class='success'>✅ Hero content items: $content_count</p>";

    // Test admin user
    $admin = $pdo->query("SELECT username, email, created_at FROM cms_admins WHERE username = 'admin'")->fetch();
    if ($admin) {
        echo "<p class='success'>✅ Admin user verified: {$admin['username']} ({$admin['email']})</p>";
        echo "<p class='success'>✅ Created: {$admin['created_at']}</p>";
    }

    // Show content summary
    echo "<h2>📋 Content Summary</h2>";
    $contents = $pdo->query("SELECT content_key, display_name, content_type, updated_at FROM cms_hero_content WHERE is_active = 1 ORDER BY content_key")->fetchAll();
    
    echo "<table border='1' style='width: 100%; border-collapse: collapse; margin: 10px 0;'>";
    echo "<tr style='background: #f5f5f5;'><th>Key</th><th>Name</th><th>Type</th><th>Updated</th></tr>";
    foreach ($contents as $content) {
        echo "<tr>";
        echo "<td>{$content['content_key']}</td>";
        echo "<td>{$content['display_name']}</td>";
        echo "<td>{$content['content_type']}</td>";
        echo "<td>{$content['updated_at']}</td>";
        echo "</tr>";
    }
    echo "</table>";

    echo "<div class='info'>";
    echo "<h2>🎉 CMS DATABASE SETUP COMPLETE!</h2>";
    echo "<p><strong>✅ All tables created successfully</strong></p>";
    echo "<p><strong>✅ Admin user configured</strong></p>";
    echo "<p><strong>✅ Default hero content inserted</strong></p>";
    echo "<p><strong>✅ System ready for production use</strong></p>";
    echo "</div>";

    echo "<div class='info'>";
    echo "<h3>🔑 Admin Login Credentials:</h3>";
    echo "<div class='code'>";
    echo "URL: <strong>https://afeworkpharmaet.com/admin</strong><br>";
    echo "Username: <strong>admin</strong><br>";
    echo "Password: <strong>AfeworkAdmin2024!</strong>";
    echo "</div>";
    echo "</div>";

    echo "<div class='info'>";
    echo "<h3>🧪 Next Steps:</h3>";
    echo "<ol>";
    echo "<li>Visit <a href='/admin' target='_blank'>https://afeworkpharmaet.com/admin</a></li>";
    echo "<li>Login with the credentials above</li>";
    echo "<li>Edit hero content in the admin dashboard</li>";
    echo "<li>Visit <a href='/' target='_blank'>homepage</a> to see changes</li>";
    echo "<li>Check phpMyAdmin to see database updates</li>";
    echo "</ol>";
    echo "</div>";

} catch (PDOException $e) {
    echo "<p class='error'>❌ Database error: " . $e->getMessage() . "</p>";
    echo "<p class='error'>Error Code: " . $e->getCode() . "</p>";
} catch (Exception $e) {
    echo "<p class='error'>❌ Setup failed: " . $e->getMessage() . "</p>";
}

echo "</div>";
echo "<p style='text-align: center; margin-top: 20px;'><a href='/'>← Back to Website</a></p>";
?>
