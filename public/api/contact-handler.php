<?php
// contact-handler-simple-smtp.php - Simple SMTP handler that should work with your hosting provider
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

// Simple email sending using PHP's mail() with proper headers
function sendSimpleEmail($to, $subject, $html_message, $from_email, $from_name) {
    // Create proper email headers
    $headers = array();
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: text/html; charset=UTF-8';
    $headers[] = 'From: ' . $from_name . ' <' . $from_email . '>';
    $headers[] = 'Reply-To: ' . $from_email;
    $headers[] = 'X-Mailer: PHP/' . phpversion();
    $headers[] = 'Return-Path: contact@afeworkpharmaet.com';
    $headers[] = 'Sender: contact@afeworkpharmaet.com';
    
    // Convert array to string
    $header_string = implode("\r\n", $headers);
    
    // Send email
    $result = mail($to, $subject, $html_message, $header_string);
    
    error_log("Simple email send to {$to}: " . ($result ? 'SUCCESS' : 'FAILED'));
    
    return $result;
}

// Business notification email content
$business_subject = "New Contact Form Submission - $inquiryType";
$business_message = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px 20px; background: #f9fafb; }
        .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #10b981; }
        .label { font-weight: bold; color: #059669; font-size: 14px; text-transform: uppercase; }
        .value { margin-top: 5px; font-size: 16px; color: #374151; }
        .footer { background: #374151; color: white; padding: 20px; text-align: center; font-size: 14px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🏥 New Contact Form Submission</h1>
            <p>Afework Pharma - Premium Medical Equipment Solutions</p>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>👤 Customer Name</div>
                <div class='value'>$name</div>
            </div>
            <div class='field'>
                <div class='label'>📧 Email Address</div>
                <div class='value'>$email</div>
            </div>
            <div class='field'>
                <div class='label'>📱 Phone Number</div>
                <div class='value'>$phone</div>
            </div>
            <div class='field'>
                <div class='label'>🏢 Organization</div>
                <div class='value'>$organization</div>
            </div>
            <div class='field'>
                <div class='label'>🔍 Inquiry Type</div>
                <div class='value'>$inquiryType</div>
            </div>
            <div class='field'>
                <div class='label'>💬 Message</div>
                <div class='value'>" . nl2br($message) . "</div>
            </div>
        </div>
        <div class='footer'>
            <p><strong>⚡ Action Required:</strong> Please respond to this inquiry within 24 hours</p>
            <p>Reply directly to: <a href='mailto:$email' style='color: #10b981;'>$email</a></p>
        </div>
    </div>
</body>
</html>
";

// Customer auto-reply email content
$customer_subject = "Thank you for contacting Afework Pharma - We'll respond within 24 hours";
$customer_message = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px 20px; text-align: center; }
        .content { padding: 30px 20px; }
        .message-box { background: #f0fdf4; padding: 20px; border-radius: 10px; border-left: 4px solid #10b981; margin: 20px 0; }
        .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>✅ Thank You for Your Inquiry!</h1>
            <p>We've received your message and will respond soon</p>
        </div>
        <div class='content'>
            <p>Dear $name,</p>
            <p>Thank you for contacting <strong>Afework Pharma</strong> regarding <strong>$inquiryType</strong>. We have successfully received your inquiry and our medical equipment specialists are reviewing your requirements.</p>
            
            <div class='message-box'>
                <p><strong>⏰ Response Time:</strong> We will respond to your inquiry within <strong>24 hours</strong> during business days.</p>
                <p><strong>🎯 Next Steps:</strong> Our team will provide you with detailed information, pricing, and solutions tailored specifically to your needs.</p>
            </div>
            
            <p>Best regards,<br>
            <strong>Afework Pharma Customer Service Team</strong><br>
            Premium Medical Equipment & Healthcare Solutions</p>
        </div>
        <div class='footer'>
            <p>This is an automated response. For immediate assistance, contact us at contact@afeworkpharmaet.com</p>
        </div>
    </div>
</body>
</html>
";

// Send emails using simple mail() function with proper headers
$business_sent = sendSimpleEmail('contact@afeworkpharmaet.com', $business_subject, $business_message, $email, $name);
$customer_sent = sendSimpleEmail($email, $customer_subject, $customer_message, 'contact@afeworkpharmaet.com', 'Afework Pharma');

// Update session for rate limiting
$_SESSION['last_submission'] = $current_time;

// Response
$response = [
    'success' => $business_sent,
    'message' => $business_sent ? 
        'Thank you! Your message has been sent successfully. We will respond within 24 hours.' : 
        'Message received but email delivery failed. Please contact us directly at contact@afeworkpharmaet.com',
    'debug' => [
        'business_email_sent' => $business_sent,
        'customer_email_sent' => $customer_sent,
        'method' => 'simple_mail_with_headers',
        'server_time' => date('Y-m-d H:i:s'),
        'php_version' => phpversion()
    ]
];

echo json_encode($response);
?>
