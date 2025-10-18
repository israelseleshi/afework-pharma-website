<?php
// Simple database setup script
$host = 'localhost';
$dbname = 'afework_pharma_cms';
$username = 'root';
$password = '';

echo "<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Database Setup - Afework Pharma</title>
    <script src='https://cdn.tailwindcss.com'></script>
    <style>
        .gradient-bg { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
    </style>
</head>
<body class='min-h-screen bg-gray-50'>
    <div class='container mx-auto px-4 py-8'>
        <div class='text-center mb-8'>
            <div class='gradient-bg w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
                <span class='text-white text-2xl'>🗄️</span>
            </div>
            <h1 class='text-4xl font-bold text-gray-900 mb-2'>Afework Pharma</h1>
            <p class='text-xl text-gray-600'>Database Setup Results</p>
        </div>
        
        <div class='max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6'>";

try {
    // Connect without database first
    $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true
    ]);
    
    echo "<div class='mb-4 p-4 bg-green-50 border border-green-200 rounded-lg'>
            <h3 class='text-green-800 font-semibold'>✅ Connected to MySQL successfully!</h3>
          </div>";
    
    // Create database
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    $pdo->exec("USE `$dbname`");
    
    echo "<div class='mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
            <h3 class='text-blue-800 font-semibold'>✅ Database '$dbname' created/verified!</h3>
          </div>";
    
    // Create tables
    $tables = [
        'cms_about_content' => "
            CREATE TABLE IF NOT EXISTS cms_about_content (
                id INT AUTO_INCREMENT PRIMARY KEY,
                content_key VARCHAR(100) NOT NULL UNIQUE,
                content_value TEXT,
                content_type ENUM('text', 'textarea', 'image', 'url') DEFAULT 'text',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ",
        'cms_team_members' => "
            CREATE TABLE IF NOT EXISTS cms_team_members (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                position VARCHAR(255) NOT NULL,
                bio TEXT,
                image_url VARCHAR(500),
                is_featured BOOLEAN DEFAULT FALSE,
                display_order INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ",
        'cms_company_milestones' => "
            CREATE TABLE IF NOT EXISTS cms_company_milestones (
                id INT AUTO_INCREMENT PRIMARY KEY,
                year VARCHAR(10) NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                icon VARCHAR(100),
                achievement VARCHAR(255),
                display_order INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ",
        'cms_achievements' => "
            CREATE TABLE IF NOT EXISTS cms_achievements (
                id INT AUTO_INCREMENT PRIMARY KEY,
                icon VARCHAR(100),
                title VARCHAR(255) NOT NULL,
                description TEXT,
                display_order INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ",
        'cms_about_content_history' => "
            CREATE TABLE IF NOT EXISTS cms_about_content_history (
                id INT AUTO_INCREMENT PRIMARY KEY,
                content_key VARCHAR(100) NOT NULL,
                old_value TEXT,
                new_value TEXT,
                changed_by VARCHAR(255),
                changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_content_key (content_key),
                INDEX idx_changed_at (changed_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        "
    ];
    
    // Create all tables
    foreach ($tables as $tableName => $sql) {
        $pdo->exec($sql);
        echo "<div class='mb-2 p-2 bg-gray-50 border border-gray-200 rounded'>
                <span class='text-gray-700'>✅ Table created: <code class='bg-gray-200 px-2 py-1 rounded'>$tableName</code></span>
              </div>";
    }
    
    echo "<div class='mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg'>
            <h3 class='text-emerald-800 font-semibold'>✅ All tables created successfully!</h3>
          </div>";
    
    // Insert sample data
    echo "<div class='mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg'>
            <h3 class='text-purple-800 font-semibold'>📝 Inserting sample data...</h3>
          </div>";
    
    // About content
    $aboutData = [
        ['hero_title', 'Advancing Healthcare Through Innovation', 'text'],
        ['hero_subtitle', 'Since 2019, Afework Pharma has been Ethiopia\'s trusted partner in delivering cutting-edge medical equipment and comprehensive healthcare solutions.', 'text'],
        ['hero_team_image', '/assets/images/afework-team-image.jpg', 'text'],
        ['mission_statement', 'To transform healthcare delivery in Ethiopia by providing world-class medical equipment, innovative solutions, and exceptional service that empowers healthcare professionals to save lives and improve patient outcomes.', 'textarea'],
        ['vision_statement', 'To be the leading catalyst in Ethiopia\'s healthcare transformation, bridging the gap between advanced medical technology and accessible healthcare for all Ethiopians.', 'textarea']
    ];
    
    $stmt = $pdo->prepare("INSERT INTO cms_about_content (content_key, content_value, content_type) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE content_value = VALUES(content_value)");
    foreach ($aboutData as $data) {
        $stmt->execute($data);
    }
    echo "<div class='mb-2 p-2 bg-green-50 border border-green-200 rounded'>
            <span class='text-green-700'>✅ About content: " . count($aboutData) . " entries</span>
          </div>";
    
    // Achievements
    $achievements = [
        ['🏆', '5+ Years Experience', 'Leading medical equipment distribution in Ethiopia', 1],
        ['🏥', '40+ IVD Units', 'Recently deployed across 36 health facilities', 2],
        ['🔬', '500+ Installations', 'Successfully installed and maintained medical equipment', 3],
        ['👥', '50+ Healthcare Partners', 'Trusted by hospitals and clinics nationwide', 4],
        ['📈', '99% Uptime', 'Exceptional equipment reliability and maintenance', 5],
        ['🌍', 'ISO Certified', 'International quality standards compliance', 6]
    ];
    
    $stmt = $pdo->prepare("INSERT INTO cms_achievements (icon, title, description, display_order) VALUES (?, ?, ?, ?)");
    foreach ($achievements as $achievement) {
        $stmt->execute($achievement);
    }
    echo "<div class='mb-2 p-2 bg-green-50 border border-green-200 rounded'>
            <span class='text-green-700'>✅ Achievements: " . count($achievements) . " entries</span>
          </div>";
    
    // Milestones
    $milestones = [
        ['2019', 'Company Founded', 'Afework Pharma established with a vision to transform Ethiopian healthcare', '🚀', 'Founded', 1],
        ['2020', 'First Major Contract', 'Secured partnership with leading Ethiopian hospitals', '🤝', 'Partnership', 2],
        ['2021', 'Equipment Expansion', 'Expanded portfolio to include advanced diagnostic equipment', '🔬', 'Expansion', 3],
        ['2022', 'Regional Growth', 'Extended services to multiple regions across Ethiopia', '🌍', 'Growth', 4],
        ['2023', 'Technology Innovation', 'Introduced cutting-edge medical imaging solutions', '💡', 'Innovation', 5],
        ['2024', 'Quality Certification', 'Achieved ISO certification and international recognition', '🏆', 'Certification', 6]
    ];
    
    $stmt = $pdo->prepare("INSERT INTO cms_company_milestones (year, title, description, icon, achievement, display_order) VALUES (?, ?, ?, ?, ?, ?)");
    foreach ($milestones as $milestone) {
        $stmt->execute($milestone);
    }
    echo "<div class='mb-2 p-2 bg-green-50 border border-green-200 rounded'>
            <span class='text-green-700'>✅ Milestones: " . count($milestones) . " entries</span>
          </div>";
    
    // Team members
    $teamMembers = [
        ['Dr. Afework Tesfaye', 'Chief Executive Officer', 'With over 15 years of experience in healthcare management and medical equipment distribution, Dr. Afework leads our mission to transform Ethiopian healthcare through innovative solutions.', '/assets/images/team/ceo-afework.jpg', 1, 1],
        ['Eng. Sarah Bekele', 'Chief Technology Officer', 'A biomedical engineering expert with extensive experience in medical device implementation and maintenance across Sub-Saharan Africa.', '/assets/images/team/cto-sarah.jpg', 1, 2],
        ['Dr. Michael Hailu', 'Medical Director', 'Board-certified physician with specialization in diagnostic medicine and healthcare technology integration.', '/assets/images/team/medical-director-michael.jpg', 1, 3],
        ['Ato Dawit Girma', 'Operations Manager', 'Logistics and operations specialist ensuring seamless equipment delivery and installation across Ethiopia.', '/assets/images/team/ops-manager-dawit.jpg', 0, 4],
        ['W/ro Hanan Ahmed', 'Quality Assurance Manager', 'Quality control expert ensuring all medical equipment meets international standards and regulatory compliance.', '/assets/images/team/qa-manager-hanan.jpg', 0, 5]
    ];
    
    $stmt = $pdo->prepare("INSERT INTO cms_team_members (name, position, bio, image_url, is_featured, display_order) VALUES (?, ?, ?, ?, ?, ?)");
    foreach ($teamMembers as $member) {
        $stmt->execute($member);
    }
    echo "<div class='mb-2 p-2 bg-green-50 border border-green-200 rounded'>
            <span class='text-green-700'>✅ Team members: " . count($teamMembers) . " entries</span>
          </div>";
    
    echo "<div class='mt-6 p-6 bg-green-50 border border-green-200 rounded-lg text-center'>
            <h2 class='text-2xl font-bold text-green-800 mb-4'>🎉 Setup Complete!</h2>
            <p class='text-green-700 mb-4'>Your CMS database has been successfully initialized with sample data.</p>
            <div class='flex justify-center space-x-4'>
                <a href='../src/pages/AdminPage.tsx' class='bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors'>
                    Go to Admin Dashboard
                </a>
                <a href='../index.html' class='bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors'>
                    View Website
                </a>
            </div>
          </div>";
    
} catch (PDOException $e) {
    echo "<div class='p-4 bg-red-50 border border-red-200 rounded-lg'>
            <h3 class='text-red-800 font-semibold'>❌ Database Error:</h3>
            <p class='text-red-700'>" . htmlspecialchars($e->getMessage()) . "</p>
          </div>";
} catch (Exception $e) {
    echo "<div class='p-4 bg-red-50 border border-red-200 rounded-lg'>
            <h3 class='text-red-800 font-semibold'>❌ Error:</h3>
            <p class='text-red-700'>" . htmlspecialchars($e->getMessage()) . "</p>
          </div>";
}

echo "        </div>
    </div>
</body>
</html>";
?>
