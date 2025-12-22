<?php
// test-simple.php - Simple test to check if the handler is working
header('Content-Type: text/html; charset=UTF-8');

echo "<h1>Simple Handler Test</h1>";

// Test data
$test_data = [
    'name' => 'Test User',
    'email' => 'test@example.com',
    'phone' => '+251 911 123 456',
    'organization' => 'Test Org',
    'inquiryType' => 'Test',
    'message' => 'Test message'
];

echo "<h2>Testing contact-handler-reliable.php</h2>";

// Use file_get_contents instead of cURL for better error handling
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

echo "Sending request...<br>";

$result = @file_get_contents('https://' . $_SERVER['HTTP_HOST'] . '/contact-handler-reliable.php', false, $context);

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
        echo "Success: " . ($data['success'] ? 'Yes' : 'No') . "<br>";
        echo "Message: " . htmlspecialchars($data['message']) . "<br>";
        if (isset($data['debug'])) {
            echo "Method: " . ($data['debug']['method'] ?? 'Unknown') . "<br>";
        }
    }
}

echo "<h2>Check Error Logs</h2>";
echo "<p>If the request failed, check your server's error logs for the detailed SMTP debugging information.</p>";
?>
