<?php
// test-handler-version.php - Test which contact handler is being used
header('Content-Type: text/html; charset=UTF-8');

echo "<h1>Contact Handler Version Test</h1>";

// Test data
$test_data = [
    'name' => 'Test User',
    'email' => 'israelseleshi09@gmail.com',
    'phone' => '+251 911 123 456',
    'organization' => 'Test Organization',
    'inquiryType' => 'Test Inquiry',
    'message' => 'This is a test to see which handler is being used.'
];

echo "<h2>Testing contact-handler-reliable.php</h2>";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://' . $_SERVER['HTTP_HOST'] . '/contact-handler-reliable.php');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($test_data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Code: {$http_code}<br>";
echo "Response: " . htmlspecialchars($response) . "<br>";

if ($response) {
    $result = json_decode($response, true);
    if ($result) {
        echo "<h3>Response Analysis:</h3>";
        echo "Success: " . ($result['success'] ? 'Yes' : 'No') . "<br>";
        echo "Message: " . htmlspecialchars($result['message']) . "<br>";
        
        if (isset($result['debug'])) {
            echo "<h4>Debug Info:</h4>";
            echo "Method: " . ($result['debug']['method'] ?? 'Unknown') . "<br>";
            echo "Business Email Sent: " . ($result['debug']['business_email_sent'] ? 'Yes' : 'No') . "<br>";
            echo "Customer Email Sent: " . ($result['debug']['customer_email_sent'] ? 'Yes' : 'No') . "<br>";
        }
    }
}

echo "<h2>What to Look For:</h2>";
echo "<ul>";
echo "<li><strong>If you see 'reliable_smtp' in the method:</strong> The new handler is working</li>";
echo "<li><strong>If you see 'mail_function_available':</strong> The old handler is still being used</li>";
echo "<li><strong>If you see detailed SMTP logs:</strong> Check your error logs for the detailed SMTP debugging</li>";
echo "</ul>";

echo "<p><a href='?'>Test Again</a></p>";
?>
