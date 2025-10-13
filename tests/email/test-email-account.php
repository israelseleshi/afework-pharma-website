<?php
// test-email-account.php - Test if your email account exists and works
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: text/html; charset=UTF-8');

echo "<h1>Email Account Test</h1>";

// Test if we can send a simple email using basic mail()
$test_email = 'israelseleshi09@gmail.com'; // Your email for testing
$subject = "Test from Afework Pharma - " . date('Y-m-d H:i:s');
$message = "This is a test email to verify if your hosting provider actually delivers emails.";
$headers = "From: contact@afeworkpharmaet.com\r\n";
$headers .= "Reply-To: contact@afeworkpharmaet.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

echo "<h2>Testing Basic Email Delivery</h2>";
echo "Sending test email to: {$test_email}<br>";
echo "Subject: {$subject}<br>";

$result = mail($test_email, $subject, $message, $headers);

if ($result) {
    echo "✅ PHP mail() returned SUCCESS<br>";
    echo "📧 <strong>Check your email inbox now!</strong><br>";
    echo "⏰ If you don't receive the email within 5 minutes, your hosting provider is blocking outbound emails.<br>";
} else {
    echo "❌ PHP mail() returned FAILED<br>";
}

echo "<h2>What This Means:</h2>";
echo "<ul>";
echo "<li><strong>If you receive the email:</strong> Your hosting provider's mail() works, but SMTP authentication is the issue</li>";
echo "<li><strong>If you don't receive the email:</strong> Your hosting provider blocks outbound emails (very common)</li>";
echo "</ul>";

echo "<h2>Next Steps:</h2>";
echo "<ul>";
echo "<li><strong>If email arrives:</strong> We'll fix the SMTP authentication</li>";
echo "<li><strong>If email doesn't arrive:</strong> We'll use Gmail SMTP (guaranteed to work)</li>";
echo "</ul>";

echo "<p><a href='?'>Send Another Test Email</a></p>";
?>
