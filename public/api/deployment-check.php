<?php
// Deployment verification script for Afework Pharma CMS
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Afework Pharma CMS - Deployment Check</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
        .success { color: #10b981; background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 10px 0; }
        .error { color: #ef4444; background: #fef2f2; padding: 15px; border-radius: 8px; margin: 10px 0; }
        .info { color: #3b82f6; background: #eff6ff; padding: 15px; border-radius: 8px; margin: 10px 0; }
        .test-section { border: 1px solid #e5e7eb; padding: 20px; margin: 20px 0; border-radius: 8px; }
        pre { background: #f3f4f6; padding: 10px; border-radius: 4px; overflow-x: auto; }
        .btn { background: #10b981; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn:hover { background: #059669; }
    </style>
</head>
<body>
    <h1>🏥 Afework Pharma CMS - Deployment Verification</h1>
    
    <div class="info">
        <strong>Deployment Check</strong><br>
        This page verifies that your CMS is properly deployed and can connect to the database.
    </div>

    <div class="test-section">
        <h2>1. File Structure Check</h2>
        <?php
        $requiredFiles = [
            'config/database.php' => 'Database configuration',
            'cms/home-content.php' => 'Home content API',
            'test-db.php' => 'Database test endpoint'
        ];
        
        $allFilesExist = true;
        foreach ($requiredFiles as $file => $description) {
            if (file_exists($file)) {
                echo "<div class='success'>✅ $description ($file) - EXISTS</div>";
            } else {
                echo "<div class='error'>❌ $description ($file) - MISSING</div>";
                $allFilesExist = false;
            }
        }
        
        if ($allFilesExist) {
            echo "<div class='success'><strong>All required files are present!</strong></div>";
        }
        ?>
    </div>

    <div class="test-section">
        <h2>2. Database Connection Test</h2>
        <?php
        try {
            require_once 'config/database.php';
            $result = DatabaseConfig::testConnection();
            
            if ($result['success']) {
                echo "<div class='success'>";
                echo "<strong>✅ Database Connection Successful!</strong><br>";
                echo "Records in database: " . ($result['records_count'] ?? 'Unknown') . "<br>";
                echo "Host: " . $result['database_info']['host'] . "<br>";
                echo "Database: " . $result['database_info']['database'];
                echo "</div>";
                
                // Try to fetch sample data
                $pdo = DatabaseConfig::getConnection();
                $stmt = $pdo->query("SELECT section_type, section_title FROM cms_home_content LIMIT 3");
                $sampleData = $stmt->fetchAll();
                
                if (!empty($sampleData)) {
                    echo "<div class='info'>";
                    echo "<strong>Sample Data:</strong><br>";
                    foreach ($sampleData as $row) {
                        echo "• " . ucfirst(str_replace('_', ' ', $row['section_type'])) . ": " . $row['section_title'] . "<br>";
                    }
                    echo "</div>";
                }
                
            } else {
                echo "<div class='error'>";
                echo "<strong>❌ Database Connection Failed!</strong><br>";
                echo "Error: " . $result['error'] . "<br>";
                if (isset($result['suggestion'])) {
                    echo "Suggestion: " . $result['suggestion'];
                }
                echo "</div>";
            }
            
        } catch (Exception $e) {
            echo "<div class='error'>";
            echo "<strong>❌ Configuration Error!</strong><br>";
            echo "Error: " . $e->getMessage();
            echo "</div>";
        }
        ?>
    </div>

    <div class="test-section">
        <h2>3. API Endpoints Test</h2>
        <p>Test your API endpoints:</p>
        <a href="test-db.php" class="btn" target="_blank">Test Database API</a>
        <a href="cms/home-content.php" class="btn" target="_blank">Test CMS API</a>
        
        <div class="info" style="margin-top: 15px;">
            <strong>Next Steps:</strong><br>
            1. If database connection is successful, your CMS should work<br>
            2. Access your admin dashboard to manage content<br>
            3. If there are errors, check your database credentials in config/database.php
        </div>
    </div>

    <div class="test-section">
        <h2>4. Database Setup</h2>
        <p>If the database table doesn't exist, you need to run the SQL script:</p>
        <div class="info">
            <strong>SQL Script Location:</strong> database/cms_home_content.sql<br>
            <strong>How to run:</strong> Execute the SQL script in your cPanel phpMyAdmin or database management tool
        </div>
    </div>

    <hr style="margin: 40px 0;">
    <p style="text-align: center; color: #6b7280;">
        <strong>Afework Pharma CMS</strong> - Advanced Medical Solutions for a Healthier Ethiopia<br>
        Deployment verification completed at <?php echo date('Y-m-d H:i:s'); ?>
    </p>
</body>
</html>
