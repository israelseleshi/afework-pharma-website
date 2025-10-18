<?php
/**
 * Database Configuration Finder
 * Helps identify the correct database settings for DirectAdmin
 */

header('Content-Type: text/html; charset=utf-8');

echo "<h1>🔍 Database Configuration Finder</h1>";
echo "<style>
body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
.container { background: white; padding: 30px; border-radius: 10px; max-width: 800px; }
.success { color: #10b981; font-weight: bold; }
.error { color: #ef4444; font-weight: bold; }
.info { background: #f0f9ff; padding: 15px; border-left: 4px solid #0ea5e9; margin: 15px 0; }
.code { background: #f5f5f5; padding: 10px; font-family: monospace; border: 1px solid #ddd; }
.warning { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 15px 0; }
</style>";

echo "<div class='container'>";

echo "<h2>📋 Current Server Information</h2>";
echo "<div class='code'>";
echo "Server Name: " . ($_SERVER['SERVER_NAME'] ?? 'Unknown') . "<br>";
echo "Server Software: " . ($_SERVER['SERVER_SOFTWARE'] ?? 'Unknown') . "<br>";
echo "PHP Version: " . phpversion() . "<br>";
echo "Document Root: " . ($_SERVER['DOCUMENT_ROOT'] ?? 'Unknown') . "<br>";
echo "</div>";

echo "<h2>🔍 Testing Database Hosts</h2>";

// Common DirectAdmin database hosts to try
$hosts_to_try = [
    'localhost',
    '127.0.0.1',
    'mysql',
    'mysql.afeworkpharmaet.com',
    'mysql.lu-shared04.dapanel.net',
    'db.afeworkpharmaet.com',
    'afeworkpharmaet.com'
];

$db_user = 'afeworcn_afework_admin';
$db_password = 'mQ+3HMm2(g)q.R758J!;Lb';
$db_name = 'afeworcn_afework_content';

$working_host = null;

foreach ($hosts_to_try as $host) {
    echo "<h3>Testing: $host</h3>";
    
    try {
        $pdo = new PDO(
            "mysql:host=$host;dbname=$db_name;charset=utf8mb4",
            $db_user,
            $db_password,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_TIMEOUT => 5
            ]
        );
        
        // Test the connection with a simple query
        $result = $pdo->query("SELECT 1")->fetchColumn();
        
        if ($result == 1) {
            echo "<p class='success'>✅ SUCCESS! Host '$host' works!</p>";
            $working_host = $host;
            
            // Get additional database info
            $version = $pdo->query("SELECT VERSION()")->fetchColumn();
            echo "<p class='success'>MySQL Version: $version</p>";
            
            // Check if our database exists and show tables
            $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
            echo "<p class='success'>Tables in database: " . count($tables) . "</p>";
            
            if (count($tables) > 0) {
                echo "<div class='code'>";
                foreach ($tables as $table) {
                    echo "• $table<br>";
                }
                echo "</div>";
            }
            
            break; // Stop testing once we find a working host
        }
        
    } catch (PDOException $e) {
        echo "<p class='error'>❌ Failed: " . $e->getMessage() . "</p>";
    }
}

if ($working_host) {
    echo "<div class='info'>";
    echo "<h2>🎉 Database Connection Found!</h2>";
    echo "<p><strong>Working Host:</strong> $working_host</p>";
    echo "<p>I'll now update the CMS setup script with the correct host...</p>";
    echo "</div>";
    
    // Create updated setup script with correct host
    $setup_script = file_get_contents(__DIR__ . '/setup-cms.php');
    $updated_script = str_replace(
        "'host' => 'mysql.lu-shared04.dapanel.net',",
        "'host' => '$working_host',",
        $setup_script
    );
    
    file_put_contents(__DIR__ . '/setup-cms-fixed.php', $updated_script);
    
    echo "<div class='info'>";
    echo "<h3>✅ Fixed Setup Script Created</h3>";
    echo "<p>I've created <strong>setup-cms-fixed.php</strong> with the correct database host.</p>";
    echo "<p><a href='/setup-cms-fixed.php' style='background: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>🚀 Run Fixed Setup Script</a></p>";
    echo "</div>";
    
} else {
    echo "<div class='warning'>";
    echo "<h2>⚠️ No Working Database Host Found</h2>";
    echo "<p>None of the common database hosts worked. This could mean:</p>";
    echo "<ul>";
    echo "<li>The database credentials are incorrect</li>";
    echo "<li>The database server uses a different hostname</li>";
    echo "<li>Database access is restricted</li>";
    echo "<li>The database doesn't exist yet</li>";
    echo "</ul>";
    echo "</div>";
    
    echo "<div class='info'>";
    echo "<h3>🔧 How to Find Your Database Host</h3>";
    echo "<ol>";
    echo "<li><strong>Login to DirectAdmin</strong></li>";
    echo "<li>Go to <strong>MySQL Management</strong></li>";
    echo "<li>Look for <strong>Hostname</strong> or <strong>Server</strong> information</li>";
    echo "<li>Common DirectAdmin hosts are usually:</li>";
    echo "<ul>";
    echo "<li><code>localhost</code> (most common)</li>";
    echo "<li><code>mysql</code></li>";
    echo "<li><code>yourdomain.com</code></li>";
    echo "</ul>";
    echo "</ol>";
    echo "</div>";
}

echo "<h2>📞 Alternative: Manual Database Check</h2>";
echo "<div class='info'>";
echo "<p>If automatic detection failed, you can:</p>";
echo "<ol>";
echo "<li><strong>Check DirectAdmin</strong> → MySQL Management for the correct hostname</li>";
echo "<li><strong>Contact your hosting provider</strong> for database connection details</li>";
echo "<li><strong>Check existing PHP files</strong> on your server that connect to the database</li>";
echo "</ol>";
echo "</div>";

echo "</div>";
echo "<p style='text-align: center; margin-top: 20px;'><a href='/'>← Back to Website</a></p>";
?>
