<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Set JSON response header
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$required_fields = ['name', 'email', 'message'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => "Missing required field: $field"]);
        exit();
    }
}

// Sanitize inputs
$name = htmlspecialchars(trim($input['name']), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($input['phone'] ?? ''), ENT_QUOTES, 'UTF-8');
$organization = htmlspecialchars(trim($input['organization'] ?? ''), ENT_QUOTES, 'UTF-8');
$inquiryType = htmlspecialchars(trim($input['inquiryType'] ?? ''), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(trim($input['message']), ENT_QUOTES, 'UTF-8');

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address']);
    exit();
}

// Email configuration from environment or hardcoded
$emailConfig = [
    'from_email' => 'contact@afeworkpharmaet.com',
    'from_name' => 'Afework Pharma',
    'to_email' => 'contact@afeworkpharmaet.com',
    'reply_to' => $email
];

// Create business notification email
$business_subject = "[URGENT] New Contact Form Submission - " . $name;
$business_message = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px; }
        .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 20px; }
        .field { margin: 15px 0; }
        .label { font-weight: bold; color: #2563eb; }
        .value { margin-top: 5px; color: #555; }
        .footer { background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #888; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Name:</div>
                <div class='value'>$name</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'><a href='mailto:$email'>$email</a></div>
            </div>
            <div class='field'>
                <div class='label'>Phone:</div>
                <div class='value'>$phone</div>
            </div>
            <div class='field'>
                <div class='label'>Organization:</div>
                <div class='value'>$organization</div>
            </div>
            <div class='field'>
                <div class='label'>Inquiry Type:</div>
                <div class='value'>$inquiryType</div>
            </div>
            <div class='field'>
                <div class='label'>Message:</div>
                <div class='value'>$message</div>
            </div>
        </div>
        <div class='footer'>
            <p>This is an automated message from Afework Pharma website contact form.</p>
        </div>
    </div>
</body>
</html>
";

// Create customer confirmation email
$customer_subject = "Thank you for contacting Afework Pharma";
$customer_message = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px; }
        .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 20px; line-height: 1.6; }
        .footer { background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #888; }
        .contact-info { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Thank You for Contacting Us</h2>
        </div>
        <div class='content'>
            <p>Dear $name,</p>
            <p>Thank you for reaching out to Afework Pharma. We have received your message and appreciate your interest in our medical solutions.</p>
            <p>Our team will review your inquiry and respond to you as soon as possible, typically within 24 business hours.</p>
            <p><strong>Your Message Summary:</strong></p>
            <p>$message</p>
            <div class='contact-info'>
                <p><strong>Our Contact Information:</strong></p>
                <p>
                    <strong>Sales & General Inquiries:</strong><br>
                    Phone: +251 911 123 456 / +251 922 789 123<br>
                    Email: sales@afeworkpharma.com
                </p>
                <p>
                    <strong>Technical Support (24/7):</strong><br>
                    Phone: +251 911 555 777<br>
                    Email: support@afeworkpharma.com
                </p>
                <p>
                    <strong>Office Location:</strong><br>
                    Bole Subcity, Woreda 03<br>
                    House No. 123, Addis Ababa<br>
                    Ethiopia
                </p>
            </div>
        </div>
        <div class='footer'>
            <p>This is an automated confirmation email. Please do not reply to this email.</p>
            <p>&copy; 2024 Afework Pharma. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
";

// Send emails using PHP's mail() function with additional parameters
$business_headers = "MIME-Version: 1.0\r\n";
$business_headers .= "Content-type: text/html; charset=UTF-8\r\n";
$business_headers .= "From: " . $emailConfig['from_email'] . "\r\n";
$business_headers .= "Reply-To: " . $email . "\r\n";
$business_headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$business_headers .= "X-Priority: 1 (Highest)\r\n";

$customer_headers = "MIME-Version: 1.0\r\n";
$customer_headers .= "Content-type: text/html; charset=UTF-8\r\n";
$customer_headers .= "From: " . $emailConfig['from_email'] . "\r\n";
$customer_headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Additional parameters for mail() function
$additional_params = "-f " . $emailConfig['from_email'];

// Send business notification
$business_sent = mail(
    $emailConfig['to_email'],
    $business_subject,
    $business_message,
    $business_headers,
    $additional_params
);

// Send customer confirmation
$customer_sent = mail(
    $email,
    $customer_subject,
    $customer_message,
    $customer_headers,
    $additional_params
);

// Log the result with detailed information
$log_message = "\n" . str_repeat("=", 60) . "\n";
$log_message .= date('Y-m-d H:i:s') . " - Contact form submission\n";
$log_message .= str_repeat("=", 60) . "\n";
$log_message .= "From: $name <$email>\n";
$log_message .= "To: " . $emailConfig['to_email'] . "\n";
$log_message .= "Phone: $phone\n";
$log_message .= "Organization: $organization\n";
$log_message .= "Inquiry Type: $inquiryType\n";
$log_message .= "Message: " . substr($message, 0, 100) . "...\n";
$log_message .= "\nEmail Results:\n";
$log_message .= "  Business notification: " . ($business_sent ? "✓ SENT" : "✗ FAILED") . "\n";
$log_message .= "  Customer confirmation: " . ($customer_sent ? "✓ SENT" : "✗ FAILED") . "\n";
$log_message .= "  From address: " . $emailConfig['from_email'] . "\n";
$log_message .= "  PHP Version: " . phpversion() . "\n";
$log_message .= "  Server: " . $_SERVER['SERVER_NAME'] . "\n";
$log_message .= str_repeat("=", 60) . "\n";

// Try to write to log file
$log_file = dirname(__FILE__) . '/contact-form.log';
@file_put_contents($log_file, $log_message, FILE_APPEND);

// Also log to PHP error log
error_log($log_message);

// Return response
if ($business_sent || $customer_sent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent successfully. We will respond within 24 hours.',
        'details' => [
            'business_notified' => $business_sent,
            'confirmation_sent' => $customer_sent
        ]
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Sorry, there was an error sending your message. Please contact us directly at contact@afeworkpharmaet.com or call +251 929 092 353.'
    ]);
}
exit();
?>
