<?php
// test-simple-email.php - Test the simple email approach
header('Content-Type: text/html; charset=UTF-8');

echo "<h1>Simple Email Test</h1>";

// Test data
$test_data = [
    'name' => 'Test User',
    'email' => 'israelseleshi09@gmail.com',
    'phone' => '+251 911 123 456',
    'organization' => 'Test Organization',
    'inquiryType' => 'Test Inquiry',
    'message' => 'This is a test message to verify the simple email approach works.'
];

echo "<h2>Testing contact-handler-simple-smtp.php</h2>";

// Use file_get_contents for testing
$postdata = json_encode($test_data);

$opts = [
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/json',
        'content' => $postdata,
        'timeout' => 30
    ]
];

$context = stream_context_create($opts);

echo "Sending test request...<br>";

$result = @file_get_contents('https://' . $_SERVER['HTTP_HOST'] . '/contact-handler-simple-smtp.php', false, $context);

if ($result === false) {
    echo "❌ Request failed<br>";
    $error = error_get_last();
    echo "Error: " . htmlspecialchars($error['message']) . "<br>";
} else {
    echo "✅ Request successful<br>";
    echo "Response: " . htmlspecialchars($result) . "<br>";
    
    $data = json_decode($result, true);
    if ($data) {
        echo "<h3>Parsed Response:</h3>";
        echo "Success: " . ($data['success'] ? '✅ Yes' : '❌ No') . "<br>";
        echo "Message: " . htmlspecialchars($data['message']) . "<br>";
        if (isset($data['debug'])) {
            echo "Method: " . ($data['debug']['method'] ?? 'Unknown') . "<br>";
            echo "Business Email Sent: " . ($data['debug']['business_email_sent'] ? '✅ Yes' : '❌ No') . "<br>";
            echo "Customer Email Sent: " . ($data['debug']['customer_email_sent'] ? '✅ Yes' : '❌ No') . "<br>";
        }
        
        if ($data['success']) {
            echo "<h3>🎉 SUCCESS!</h3>";
            echo "<p>Check your email inboxes:</p>";
            echo "<ul>";
            echo "<li><strong>Business email:</strong> contact@afeworkpharmaet.com</li>";
            echo "<li><strong>Customer email:</strong> israelseleshi09@gmail.com</li>";
            echo "</ul>";
        }
    }
}

echo "<h2>Next Steps:</h2>";
echo "<ul>";
echo "<li>If successful, test the actual contact form on your website</li>";
echo "<li>If it fails, check your server's error logs</li>";
echo "</ul>";
?>
