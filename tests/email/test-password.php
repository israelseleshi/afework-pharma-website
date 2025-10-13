<?php
// test-password.php - Test if the email account password is correct
header('Content-Type: text/html; charset=UTF-8');

echo "<h1>Email Account Password Test</h1>";

// Test the email account directly
$email_account = 'contact@afeworkpharmaet.com';
$password = 'mQ+3HMm2(g)q.R758J!;Lb';

echo "<h2>Testing Email Account Access</h2>";
echo "Email: {$email_account}<br>";
echo "Password: " . str_repeat('*', strlen($password)) . "<br><br>";

// Try to connect to the email server using IMAP (if available)
if (function_exists('imap_open')) {
    echo "<h3>IMAP Test (if available)</h3>";
    $mailbox = @imap_open('{mail.afeworkpharmaet.com:993/imap/ssl}', $email_account, $password);
    if ($mailbox) {
        echo "✅ IMAP connection successful - Password is correct!<br>";
        imap_close($mailbox);
    } else {
        echo "❌ IMAP connection failed - Password might be wrong<br>";
        echo "Error: " . imap_last_error() . "<br>";
    }
} else {
    echo "IMAP extension not available<br>";
}

// Try POP3 (if available)
if (function_exists('imap_open')) {
    echo "<h3>POP3 Test (if available)</h3>";
    $mailbox = @imap_open('{mail.afeworkpharmaet.com:995/pop3/ssl}', $email_account, $password);
    if ($mailbox) {
        echo "✅ POP3 connection successful - Password is correct!<br>";
        imap_close($mailbox);
    } else {
        echo "❌ POP3 connection failed - Password might be wrong<br>";
        echo "Error: " . imap_last_error() . "<br>";
    }
}

echo "<h2>Recommendations</h2>";
echo "<ul>";
echo "<li>If both IMAP and POP3 fail, the password is likely wrong</li>";
echo "<li>Check your hosting control panel for the correct email account password</li>";
echo "<li>Or try resetting the password for contact@afeworkpharmaet.com</li>";
echo "</ul>";

echo "<h2>Alternative Solution</h2>";
echo "<p>If the password is wrong, we can set up Gmail SMTP as a reliable alternative:</p>";
echo "<a href='contact-handler-gmail.php' target='_blank'>View Gmail Handler</a>";
?>
