<?php
// check-syntax.php - Check PHP syntax of the contact handler
header('Content-Type: text/html; charset=UTF-8');

echo "<h1>PHP Syntax Check</h1>";

$file = __DIR__ . '/contact-handler-reliable.php';

if (!file_exists($file)) {
    echo "❌ File not found: contact-handler-reliable.php<br>";
    exit;
}

echo "<h2>Checking syntax of contact-handler-reliable.php</h2>";

// Check syntax
$output = [];
$return_var = 0;
exec("php -l " . escapeshellarg($file) . " 2>&1", $output, $return_var);

if ($return_var === 0) {
    echo "✅ <strong>Syntax is valid</strong><br>";
    echo "Output: " . htmlspecialchars(implode("\n", $output)) . "<br>";
} else {
    echo "❌ <strong>Syntax error found</strong><br>";
    echo "Error: " . htmlspecialchars(implode("\n", $output)) . "<br>";
}

echo "<h2>File Information</h2>";
echo "File size: " . filesize($file) . " bytes<br>";
echo "Last modified: " . date('Y-m-d H:i:s', filemtime($file)) . "<br>";

echo "<h2>Quick Test</h2>";
echo "<p>If syntax is valid, try the simple test:</p>";
echo "<a href='test-simple.php'>Run Simple Test</a>";
?>
