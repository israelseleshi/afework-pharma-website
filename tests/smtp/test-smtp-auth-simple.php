<?php
// test-smtp-auth-simple.php - Simple SMTP Authentication Test
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: text/html; charset=UTF-8');

echo "<h1>Simple SMTP Authentication Test</h1>";

// Test different username formats
$test_configs = [
    [
        'name' => 'Full Email Address',
        'username' => 'contact@afeworkpharmaet.com',
        'password' => 'mQ+3HMm2(g)q.R758J!;Lb'
    ],
    [
        'name' => 'Username Only',
        'username' => 'contact',
        'password' => 'mQ+3HMm2(g)q.R758J!;Lb'
    ]
];

$smtp_host = 'mail.afeworkpharmaet.com';
$smtp_port = 465;
$smtp_encryption = 'ssl';

foreach ($test_configs as $config) {
    echo "<h3>Testing: {$config['name']}</h3>";
    echo "Username: " . htmlspecialchars($config['username']) . "<br>";
    
    // Test SMTP connection and authentication
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ]);
    
    $socket = @stream_socket_client(
        "{$smtp_encryption}://{$smtp_host}:{$smtp_port}",
        $errno,
        $errstr,
        10,
        STREAM_CLIENT_CONNECT,
        $context
    );
    
    if (!$socket) {
        echo "❌ Connection failed: {$errno} - {$errstr}<br><br>";
        continue;
    }
    
    echo "✅ Connection successful<br>";
    
    // Read initial response
    $response = fgets($socket, 512);
    echo "Server response: " . htmlspecialchars($response) . "<br>";
    
    // Send EHLO command
    fputs($socket, "EHLO afeworkpharmaet.com\r\n");
    $response = fgets($socket, 512);
    echo "EHLO response: " . htmlspecialchars($response) . "<br>";
    
    // Send AUTH LOGIN command
    fputs($socket, "AUTH LOGIN\r\n");
    $response = fgets($socket, 512);
    echo "AUTH response: " . htmlspecialchars($response) . "<br>";
    
    // Send username (base64 encoded)
    fputs($socket, base64_encode($config['username']) . "\r\n");
    $response = fgets($socket, 512);
    echo "Username response: " . htmlspecialchars($response) . "<br>";
    
    // Send password (base64 encoded)
    fputs($socket, base64_encode($config['password']) . "\r\n");
    $response = fgets($socket, 512);
    echo "Password response: " . htmlspecialchars($response) . "<br>";
    
    if (substr($response, 0, 3) == '235') {
        echo "🎉 <strong>AUTHENTICATION SUCCESSFUL!</strong><br>";
        echo "✅ This username format works: " . htmlspecialchars($config['username']) . "<br>";
        fclose($socket);
        break;
    } else {
        echo "❌ Authentication failed<br>";
    }
    
    fclose($socket);
    echo "<br>";
}

echo "<h2>Next Steps:</h2>";
echo "<ul>";
echo "<li>If you see 'AUTHENTICATION SUCCESSFUL', update the contact handler with the working username format</li>";
echo "<li>If both fail, the password might be wrong - check your hosting control panel</li>";
echo "<li>Check your server error logs for more detailed SMTP debugging</li>";
echo "</ul>";
?>
