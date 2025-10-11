<?php
// contact-handler-smtp.php - SMTP-based Contact Form Handler for Afework Pharma
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get the JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$required_fields = ['name', 'email', 'phone', 'organization', 'inquiryType', 'message'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field"]);
        exit;
    }
}

// Sanitize input data
$name = htmlspecialchars(trim($input['name']));
$email = filter_var(trim($input['email']), FILTER_VALIDATE_EMAIL);
$phone = htmlspecialchars(trim($input['phone']));
$organization = htmlspecialchars(trim($input['organization']));
$inquiryType = htmlspecialchars(trim($input['inquiryType']));
$message = htmlspecialchars(trim($input['message']));

// Validate email
if (!$email) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

// Rate limiting (simple session-based)
session_start();
$current_time = time();
$last_submission = $_SESSION['last_submission'] ?? 0;

if ($current_time - $last_submission < 60) { // 1 minute cooldown
    http_response_code(429);
    echo json_encode(['error' => 'Please wait 1 minute before submitting another message']);
    exit;
}

// SMTP Configuration for Afework Pharma
$smtp_host = 'mail.afeworkpharmaet.com';
$smtp_port = 465; // SSL port
$smtp_username = 'contact@afeworkpharmaet.com';
$smtp_password = 'mQ+3HMm2(g)q.R758J!;Lb';

// Function to send email via SMTP
function sendSMTPEmail($to, $subject, $message, $from_email, $from_name = '') {
    global $smtp_host, $smtp_port, $smtp_username, $smtp_password;
    
    // Create socket connection
    $socket = fsockopen("ssl://$smtp_host", $smtp_port, $errno, $errstr, 30);
    
    if (!$socket) {
        error_log("SMTP connection failed: $errno - $errstr");
        return false;
    }
    
    // Read server response
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) != '220') {
        error_log("SMTP server not ready: $response");
        fclose($socket);
        return false;
    }
    
    // Send EHLO command
    fputs($socket, "EHLO afeworkpharmaet.com\r\n");
    $response = fgets($socket, 512);
    
    // Send AUTH LOGIN command
    fputs($socket, "AUTH LOGIN\r\n");
    $response = fgets($socket, 512);
    
    // Send username (base64 encoded)
    fputs($socket, base64_encode($smtp_username) . "\r\n");
    $response = fgets($socket, 512);
    
    // Send password (base64 encoded)
    fputs($socket, base64_encode($smtp_password) . "\r\n");
    $response = fgets($socket, 512);
    
    if (substr($response, 0, 3) != '235') {
        error_log("SMTP authentication failed: $response");
        fclose($socket);
        return false;
    }
    
    // Send MAIL FROM command
    fputs($socket, "MAIL FROM: <$smtp_username>\r\n");
    $response = fgets($socket, 512);
    
    // Send RCPT TO command
    fputs($socket, "RCPT TO: <$to>\r\n");
    $response = fgets($socket, 512);
    
    // Send DATA command
    fputs($socket, "DATA\r\n");
    $response = fgets($socket, 512);
    
    // Send email headers and body
    $email_content = "From: $from_name <$from_email>\r\n";
    $email_content .= "To: $to\r\n";
    $email_content .= "Subject: $subject\r\n";
    $email_content .= "MIME-Version: 1.0\r\n";
    $email_content .= "Content-Type: text/html; charset=UTF-8\r\n";
    $email_content .= "Reply-To: $from_email\r\n";
    $email_content .= "\r\n";
    $email_content .= $message;
    $email_content .= "\r\n.\r\n";
    
    fputs($socket, $email_content);
    $response = fgets($socket, 512);
    
    // Send QUIT command
    fputs($socket, "QUIT\r\n");
    fclose($socket);
    
    return substr($response, 0, 3) == '250';
}

// Business notification email content
$business_subject = "New Contact Form Submission - $inquiryType";
$business_message = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .field { margin-bottom: 15px; padding: 10px; background: #f9f9f9; border-left: 4px solid #10b981; }
        .label { font-weight: bold; color: #059669; }
        .footer { background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
            <p>Afework Pharma - Medical Equipment Solutions</p>
        </div>
        <div class='content'>
            <div class='field'>
                <span class='label'>Name:</span> $name
            </div>
            <div class='field'>
                <span class='label'>Email:</span> $email
            </div>
            <div class='field'>
                <span class='label'>Phone:</span> $phone
            </div>
            <div class='field'>
                <span class='label'>Organization:</span> $organization
            </div>
            <div class='field'>
                <span class='label'>Inquiry Type:</span> $inquiryType
            </div>
            <div class='field'>
                <span class='label'>Message:</span><br>" . nl2br($message) . "
            </div>
        </div>
        <div class='footer'>
            <p>This email was sent from the Afework Pharma website contact form.</p>
            <p>Please respond to: $email</p>
        </div>
    </div>
</body>
</html>
";

// Customer auto-reply email content
$customer_subject = "Thank you for contacting Afework Pharma";
$customer_message = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .footer { background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Thank You for Your Inquiry</h2>
            <p>Afework Pharma - Premium Medical Equipment Solutions</p>
        </div>
        <div class='content'>
            <p>Dear $name,</p>
            <p>Thank you for contacting Afework Pharma regarding <strong>$inquiryType</strong>. We have received your message and will respond within 24 hours.</p>
            <p>Our team of medical equipment specialists is reviewing your inquiry and will provide you with detailed information and solutions tailored to your needs.</p>
            <p><strong>Your Inquiry Details:</strong></p>
            <ul>
                <li><strong>Inquiry Type:</strong> $inquiryType</li>
                <li><strong>Organization:</strong> $organization</li>
                <li><strong>Phone:</strong> $phone</li>
            </ul>
            <p>Best regards,<br>
            <strong>Afework Pharma Team</strong><br>
            Premium Medical Equipment & Healthcare Solutions</p>
        </div>
        <div class='footer'>
            <p>This is an automated response. For immediate assistance, contact us at contact@afeworkpharmaet.com</p>
        </div>
    </div>
</body>
</html>
";

// Send emails using SMTP
$business_sent = sendSMTPEmail('contact@afeworkpharmaet.com', $business_subject, $business_message, $email, $name);
$customer_sent = sendSMTPEmail($email, $customer_subject, $customer_message, 'contact@afeworkpharmaet.com', 'Afework Pharma');

// Update session for rate limiting
$_SESSION['last_submission'] = $current_time;

// Return response
$response = [
    'success' => $business_sent,
    'message' => $business_sent ? 
        'Thank you! Your message has been sent successfully. We will respond within 24 hours.' : 
        'There was an issue sending your message. Please try again or contact us directly.',
    'debug' => [
        'business_email_sent' => $business_sent,
        'customer_email_sent' => $customer_sent,
        'smtp_host' => $smtp_host,
        'smtp_port' => $smtp_port,
        'server_time' => date('Y-m-d H:i:s')
    ]
];

echo json_encode($response);
?>
