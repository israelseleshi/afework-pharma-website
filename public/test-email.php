<?php
// test-email.php - Simple email test script
header('Content-Type: text/html; charset=UTF-8');

echo "<h2>Afework Pharma Email Test</h2>";

// Test 1: Check if mail function exists
echo "<h3>Test 1: PHP Mail Function</h3>";
if (function_exists('mail')) {
    echo "✅ PHP mail() function is available<br>";
} else {
    echo "❌ PHP mail() function is NOT available<br>";
}

// Test 2: Check PHP configuration
echo "<h3>Test 2: PHP Configuration</h3>";
echo "PHP Version: " . phpversion() . "<br>";
echo "SMTP: " . ini_get('SMTP') . "<br>";
echo "smtp_port: " . ini_get('smtp_port') . "<br>";
echo "sendmail_from: " . ini_get('sendmail_from') . "<br>";

// Test 3: Simple mail test
echo "<h3>Test 3: Simple Mail Test</h3>";
$test_email = 'contact@afeworkpharmaet.com';
$subject = 'Test Email from Afework Pharma Website';
$message = 'This is a test email to verify the email functionality is working.';
$headers = 'From: contact@afeworkpharmaet.com' . "\r\n" .
           'Reply-To: contact@afeworkpharmaet.com' . "\r\n" .
           'X-Mailer: PHP/' . phpversion();

$result = mail($test_email, $subject, $message, $headers);

if ($result) {
    echo "✅ Test email sent successfully<br>";
} else {
    echo "❌ Test email failed to send<br>";
    $error = error_get_last();
    if ($error) {
        echo "Error: " . $error['message'] . "<br>";
    }
}

// Test 4: Server information
echo "<h3>Test 4: Server Information</h3>";
echo "Server Software: " . $_SERVER['SERVER_SOFTWARE'] . "<br>";
echo "Server Name: " . $_SERVER['SERVER_NAME'] . "<br>";
echo "Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "<br>";
echo "Current Time: " . date('Y-m-d H:i:s') . "<br>";

// Test 5: File permissions
echo "<h3>Test 5: File Permissions</h3>";
$contact_handler = 'contact-handler.php';
if (file_exists($contact_handler)) {
    echo "✅ contact-handler.php exists<br>";
    echo "File permissions: " . substr(sprintf('%o', fileperms($contact_handler)), -4) . "<br>";
    if (is_readable($contact_handler)) {
        echo "✅ File is readable<br>";
    } else {
        echo "❌ File is NOT readable<br>";
    }
} else {
    echo "❌ contact-handler.php does NOT exist<br>";
}

echo "<hr>";
echo "<p><strong>Instructions:</strong></p>";
echo "<ol>";
echo "<li>If the mail function test fails, contact your hosting provider</li>";
echo "<li>If the simple mail test fails, check your email account settings</li>";
echo "<li>Check your email spam folder for test messages</li>";
echo "<li>Delete this test file after troubleshooting</li>";
echo "</ol>";
?>
