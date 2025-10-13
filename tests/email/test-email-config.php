<?php
// test-email-config.php - Test SMTP Configuration for Afework Pharma
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: text/html; charset=UTF-8');

echo "<h1>Email Configuration Test</h1>";

// Test basic PHP mail function
echo "<h2>1. PHP Mail Function Test</h2>";
if (function_exists('mail')) {
    echo "✅ PHP mail() function is available<br>";
    
    // Test basic mail
    $test_result = mail('test@example.com', 'Test Subject', 'Test message', 'From: israelseleshi09@gmail.com');
    echo "Basic mail() test result: " . ($test_result ? "✅ Success" : "❌ Failed") . "<br>";
} else {
    echo "❌ PHP mail() function is not available<br>";
}

// Test SMTP connection
echo "<h2>2. SMTP Connection Test</h2>";

$smtp_configs = [
    [
        'name' => 'Primary Domain SMTP',
        'host' => 'mail.afeworkpharmaet.com',
        'port' => 587,
        'encryption' => 'tls'
    ],
    [
        'name' => 'Primary Domain SMTP (SSL)',
        'host' => 'mail.afeworkpharmaet.com',
        'port' => 465,
        'encryption' => 'ssl'
    ],
    [
        'name' => 'Gmail SMTP',
        'host' => 'smtp.gmail.com',
        'port' => 587,
        'encryption' => 'tls'
    ]
];

foreach ($smtp_configs as $config) {
    echo "<h3>Testing: {$config['name']}</h3>";
    echo "Host: {$config['host']}:{$config['port']} ({$config['encryption']})<br>";
    
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ]);
    
    $socket = @stream_socket_client(
        "{$config['encryption']}://{$config['host']}:{$config['port']}",
        $errno,
        $errstr,
        10,
        STREAM_CLIENT_CONNECT,
        $context
    );
    
    if ($socket) {
        echo "✅ Connection successful<br>";
        
        // Read initial response
        $response = fgets($socket, 512);
        echo "Server response: " . htmlspecialchars($response) . "<br>";
        
        fclose($socket);
    } else {
        echo "❌ Connection failed: {$errno} - {$errstr}<br>";
    }
    echo "<br>";
}

// Test email sending with different methods
echo "<h2>3. Email Sending Test</h2>";

if (isset($_GET['test_email']) && !empty($_GET['test_email'])) {
    $test_email = filter_var($_GET['test_email'], FILTER_VALIDATE_EMAIL);
    
    if ($test_email) {
        echo "Sending test email to: {$test_email}<br>";
        
        // Test with basic mail()
        $subject = "Test Email from Afework Pharma";
        $message = "This is a test email to verify email configuration.";
        $headers = "From: contact@afeworkpharmaet.com\r\n";
        $headers .= "Reply-To: contact@afeworkpharmaet.com\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        
        $result = mail($test_email, $subject, $message, $headers);
        echo "Basic mail() result: " . ($result ? "✅ Sent" : "❌ Failed") . "<br>";
        
        // Test with reliable handler
        $test_data = [
            'name' => 'Test User',
            'email' => $test_email,
            'phone' => '+251 911 123 456',
            'organization' => 'Test Organization',
            'inquiryType' => 'Test Inquiry',
            'message' => 'This is a test message to verify the contact form email delivery.'
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://' . $_SERVER['HTTP_HOST'] . '/contact-handler-reliable.php');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($test_data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        echo "Reliable handler result (HTTP {$http_code}): ";
        if ($response) {
            $result = json_decode($response, true);
            if ($result && $result['success']) {
                echo "✅ Sent successfully<br>";
            } else {
                echo "❌ Failed: " . ($result['message'] ?? 'Unknown error') . "<br>";
            }
        } else {
            echo "❌ No response<br>";
        }
    } else {
        echo "❌ Invalid email address<br>";
    }
} else {
    echo "<form method='GET'>";
    echo "<label>Test Email Address: <input type='email' name='test_email' placeholder='your-email@example.com' required></label> ";
    echo "<button type='submit'>Send Test Email</button>";
    echo "</form>";
}

echo "<h2>4. Server Information</h2>";
echo "PHP Version: " . phpversion() . "<br>";
echo "Server: " . $_SERVER['SERVER_SOFTWARE'] . "<br>";
echo "Operating System: " . php_uname() . "<br>";
echo "Current Time: " . date('Y-m-d H:i:s T') . "<br>";

echo "<h2>5. Recommendations</h2>";
echo "<ul>";
echo "<li>If basic mail() works but emails don't arrive, your hosting provider may be blocking outbound emails</li>";
echo "<li>Use the reliable SMTP handler for better delivery rates</li>";
echo "<li>Consider using a dedicated email service like SendGrid, Mailgun, or Amazon SES for production</li>";
echo "<li>Check your hosting provider's email documentation for SMTP settings</li>";
echo "</ul>";

echo "<p><a href='?'>Refresh Test</a></p>";
?>
