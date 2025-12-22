<?php
// check-handlers.php - Check which contact handlers exist on the server
header('Content-Type: text/html; charset=UTF-8');

echo "<h1>Contact Handler Files Check</h1>";

$handlers = [
    'contact-handler.php',
    'contact-handler-reliable.php',
    'contact-handler-gmail.php',
    'contact-handler-smtp.php'
];

echo "<h2>Files on Server:</h2>";
foreach ($handlers as $handler) {
    $path = __DIR__ . '/' . $handler;
    if (file_exists($path)) {
        $size = filesize($path);
        $modified = date('Y-m-d H:i:s', filemtime($path));
        echo "✅ <strong>{$handler}</strong> - Size: {$size} bytes - Modified: {$modified}<br>";
        
        // Check if it's the new reliable handler by looking for specific content
        $content = file_get_contents($path);
        if (strpos($content, 'reliable_smtp') !== false) {
            echo "&nbsp;&nbsp;&nbsp;→ This is the NEW reliable handler with SMTP logging<br>";
        } elseif (strpos($content, 'mail_function_available') !== false) {
            echo "&nbsp;&nbsp;&nbsp;→ This is the OLD handler using basic mail()<br>";
        }
    } else {
        echo "❌ <strong>{$handler}</strong> - File not found<br>";
    }
    echo "<br>";
}

echo "<h2>Test Current Handler:</h2>";
echo "<p>Click the button below to test which handler is actually being used:</p>";
echo "<button onclick=\"testHandler()\">Test Current Handler</button>";
echo "<div id='result'></div>";

echo "<script>";
echo "function testHandler() {";
echo "  fetch('/contact-handler-reliable.php', {";
echo "    method: 'POST',";
echo "    headers: {'Content-Type': 'application/json'},";
echo "    body: JSON.stringify({";
echo "      name: 'Test User',";
echo "      email: 'test@example.com',";
echo "      phone: '+251 911 123 456',";
echo "      organization: 'Test Org',";
echo "      inquiryType: 'Test',";
echo "      message: 'Test message'";
echo "    })";
echo "  })";
echo "  .then(response => response.json())";
echo "  .then(data => {";
echo "    document.getElementById('result').innerHTML = '<h3>Response:</h3><pre>' + JSON.stringify(data, null, 2) + '</pre>';";
echo "  })";
echo "  .catch(error => {";
echo "    document.getElementById('result').innerHTML = '<h3>Error:</h3><pre>' + error + '</pre>';";
echo "  });";
echo "}";
echo "</script>";
?>
