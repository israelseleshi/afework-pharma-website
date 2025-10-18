<?php
/**
 * CMS API Test Script
 * Tests if the CMS API is working correctly
 */

header('Content-Type: text/html; charset=utf-8');

echo "<h1>🧪 CMS API Test</h1>";
echo "<style>
body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
.container { background: white; padding: 30px; border-radius: 10px; max-width: 800px; }
.success { color: #10b981; font-weight: bold; }
.error { color: #ef4444; font-weight: bold; }
.info { background: #f0f9ff; padding: 15px; border-left: 4px solid #0ea5e9; margin: 15px 0; }
.code { background: #f5f5f5; padding: 10px; font-family: monospace; border: 1px solid #ddd; white-space: pre-wrap; }
</style>";

echo "<div class='container'>";

echo "<h2>🔍 Testing CMS API Endpoints</h2>";

// Test 1: GET request to fetch content
echo "<h3>Test 1: GET /cms-api.php (Fetch Content)</h3>";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://' . $_SERVER['HTTP_HOST'] . '/cms-api.php');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json'
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    echo "<p class='error'>❌ CURL Error: $error</p>";
} else {
    echo "<p class='success'>✅ HTTP Status: $http_code</p>";
    
    if ($http_code == 200) {
        $data = json_decode($response, true);
        if ($data && isset($data['success']) && $data['success']) {
            echo "<p class='success'>✅ API Response: Success</p>";
            echo "<p class='success'>✅ Content Items: " . count($data['data']) . "</p>";
            
            echo "<h4>📋 Content Summary:</h4>";
            echo "<div class='code'>";
            foreach ($data['data'] as $item) {
                echo "• {$item['display_name']} ({$item['content_key']})\n";
            }
            echo "</div>";
        } else {
            echo "<p class='error'>❌ API returned error or invalid format</p>";
            echo "<div class='code'>$response</div>";
        }
    } else {
        echo "<p class='error'>❌ HTTP Error $http_code</p>";
        echo "<div class='code'>$response</div>";
    }
}

// Test 2: POST request to test login
echo "<h3>Test 2: POST /cms-api.php (Test Login)</h3>";

$login_data = json_encode([
    'action' => 'login',
    'username' => 'admin',
    'password' => 'AfeworkAdmin2024!'
]);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://' . $_SERVER['HTTP_HOST'] . '/cms-api.php');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $login_data);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json'
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    echo "<p class='error'>❌ CURL Error: $error</p>";
} else {
    echo "<p class='success'>✅ HTTP Status: $http_code</p>";
    
    if ($http_code == 200) {
        $data = json_decode($response, true);
        if ($data && isset($data['success']) && $data['success']) {
            echo "<p class='success'>✅ Login: Success</p>";
            echo "<p class='success'>✅ Token received: " . (isset($data['token']) ? 'Yes' : 'No') . "</p>";
            echo "<p class='success'>✅ User: " . ($data['user']['username'] ?? 'Unknown') . "</p>";
        } else {
            echo "<p class='error'>❌ Login failed</p>";
            echo "<div class='code'>$response</div>";
        }
    } else {
        echo "<p class='error'>❌ HTTP Error $http_code</p>";
        echo "<div class='code'>$response</div>";
    }
}

// Test 3: Direct database connection
echo "<h3>Test 3: Direct Database Connection</h3>";

try {
    $pdo = new PDO(
        "mysql:host=localhost;dbname=afeworcn_afework_content;charset=utf8mb4",
        'afeworcn_afework_admin',
        'mQ+3HMm2(g)q.R758J!;Lb',
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
    
    echo "<p class='success'>✅ Database connection: Success</p>";
    
    // Check tables
    $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    echo "<p class='success'>✅ Tables found: " . count($tables) . "</p>";
    
    // Check content
    $content_count = $pdo->query("SELECT COUNT(*) FROM cms_hero_content WHERE is_active = 1")->fetchColumn();
    echo "<p class='success'>✅ Active content items: $content_count</p>";
    
    // Check admin user
    $admin_count = $pdo->query("SELECT COUNT(*) FROM cms_admins WHERE username = 'admin'")->fetchColumn();
    echo "<p class='success'>✅ Admin user exists: " . ($admin_count > 0 ? 'Yes' : 'No') . "</p>";
    
} catch (PDOException $e) {
    echo "<p class='error'>❌ Database connection failed: " . $e->getMessage() . "</p>";
}

echo "<div class='info'>";
echo "<h2>📋 Summary</h2>";
echo "<p>If all tests show ✅, your CMS API is working correctly and you can:</p>";
echo "<ol>";
echo "<li><a href='/admin'>Login to the admin panel</a></li>";
echo "<li>Edit hero content</li>";
echo "<li>See changes on the homepage</li>";
echo "</ol>";
echo "</div>";

echo "<div class='info'>";
echo "<h3>🔧 If Tests Failed:</h3>";
echo "<ul>";
echo "<li>Check DirectAdmin error logs</li>";
echo "<li>Verify file permissions (cms-api.php should be 644)</li>";
echo "<li>Ensure database credentials are correct</li>";
echo "<li>Contact hosting support if database issues persist</li>";
echo "</ul>";
echo "</div>";

echo "</div>";
echo "<p style='text-align: center; margin-top: 20px;'><a href='/'>← Back to Website</a></p>";
?>
