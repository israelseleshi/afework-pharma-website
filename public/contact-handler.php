<?php
// contact-handler.php - Enhanced PHP Contact Form Handler for Afework Pharma
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Enable error logging
ini_set('log_errors', 1);
ini_set('error_log', 'contact_form_errors.log');

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

// Email configuration
$to = 'contact@afeworkpharmaet.com';
$subject = "New Contact Form Submission - $inquiryType";

// Business notification email (HTML)
$business_email = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; }
        .content { padding: 30px 20px; background: #f9fafb; }
        .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #10b981; }
        .label { font-weight: bold; color: #059669; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
        .value { margin-top: 5px; font-size: 16px; color: #374151; }
        .message-field { margin-top: 10px; padding: 15px; background: #f3f4f6; border-radius: 6px; line-height: 1.6; }
        .footer { background: #374151; color: white; padding: 20px; text-align: center; font-size: 14px; }
        .footer a { color: #10b981; text-decoration: none; }
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
                <div class='message-field'>" . nl2br($message) . "</div>
            </div>
        </div>
        <div class='footer'>
            <p><strong>⚡ Action Required:</strong> Please respond to this inquiry within 24 hours</p>
            <p>Reply directly to: <a href='mailto:$email'>$email</a></p>
            <p style='margin-top: 15px; opacity: 0.8;'>This email was automatically generated from the Afework Pharma website contact form.</p>
        </div>
    </div>
</body>
</html>
";

// Customer auto-reply email (HTML)
$customer_email = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; }
        .content { padding: 30px 20px; }
        .greeting { font-size: 18px; color: #059669; margin-bottom: 20px; }
        .message-box { background: #f0fdf4; padding: 20px; border-radius: 10px; border-left: 4px solid #10b981; margin: 20px 0; }
        .cta-section { text-align: center; margin: 30px 0; }
        .cta-button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 5px 10px; font-weight: bold; transition: background 0.3s; }
        .cta-button:hover { background: #059669; }
        .details-box { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-item { margin: 8px 0; }
        .detail-label { font-weight: bold; color: #374151; }
        .footer { background: #f3f4f6; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb; }
        .signature { margin-top: 20px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>✅ Thank You for Your Inquiry!</h1>
            <p>We've received your message and will respond soon</p>
        </div>
        <div class='content'>
            <div class='greeting'>Dear $name,</div>
            
            <p>Thank you for contacting <strong>Afework Pharma</strong> regarding <strong>$inquiryType</strong>. We have successfully received your inquiry and our medical equipment specialists are reviewing your requirements.</p>
            
            <div class='message-box'>
                <p><strong>⏰ Response Time:</strong> We will respond to your inquiry within <strong>24 hours</strong> during business days.</p>
                <p><strong>🎯 Next Steps:</strong> Our team will provide you with detailed information, pricing, and solutions tailored specifically to your needs.</p>
            </div>
            
            <div class='cta-section'>
                <p><strong>Need immediate assistance?</strong></p>
                <a href='tel:+251911234567' class='cta-button'>📞 Call Us Now</a>
                <a href='mailto:contact@afeworkpharmaet.com' class='cta-button'>✉️ Email Direct</a>
            </div>
            
            <div class='details-box'>
                <p><strong>📋 Your Inquiry Summary:</strong></p>
                <div class='detail-item'><span class='detail-label'>Inquiry Type:</span> $inquiryType</div>
                <div class='detail-item'><span class='detail-label'>Organization:</span> $organization</div>
                <div class='detail-item'><span class='detail-label'>Contact Phone:</span> $phone</div>
                <div class='detail-item'><span class='detail-label'>Submitted:</span> " . date('F j, Y \a\t g:i A') . "</div>
            </div>
            
            <p>At Afework Pharma, we're committed to providing premium medical equipment and healthcare solutions that meet the highest international standards. We look forward to partnering with you to enhance your healthcare capabilities.</p>
            
            <div class='signature'>
                <p><strong>Best regards,</strong><br>
                <strong>Afework Pharma Customer Service Team</strong><br>
                Premium Medical Equipment & Healthcare Solutions<br>
                🌐 www.afeworkpharmaet.com</p>
            </div>
        </div>
        <div class='footer'>
            <p style='font-size: 12px; color: #6b7280;'>
                This is an automated response. Please do not reply to this email.<br>
                For immediate assistance, contact us directly at contact@afeworkpharmaet.com
            </p>
        </div>
    </div>
</body>
</html>
";

// Simplified email headers for better compatibility
$business_headers = array(
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: contact@afeworkpharmaet.com',
    'Reply-To: ' . $email
);

// Email headers for customer auto-reply
$customer_headers = array(
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: contact@afeworkpharmaet.com'
);

// Test if mail function is available
if (!function_exists('mail')) {
    error_log('PHP mail function is not available');
    http_response_code(500);
    echo json_encode(['error' => 'Email service not configured on server']);
    exit;
}

// Log email attempt
error_log("Attempting to send email to: $to");
error_log("From email: $email");
error_log("Subject: $subject");

// Send business notification email
$business_sent = mail($to, $subject, $business_email, implode("\r\n", $business_headers));

if (!$business_sent) {
    $last_error = error_get_last();
    error_log("Business email failed: " . print_r($last_error, true));
}

// Send customer auto-reply
$customer_subject = "Thank you for contacting Afework Pharma - We'll respond within 24 hours";
$customer_sent = mail($email, $customer_subject, $customer_email, implode("\r\n", $customer_headers));

if (!$customer_sent) {
    $last_error = error_get_last();
    error_log("Customer email failed: " . print_r($last_error, true));
}

// Update session for rate limiting
$_SESSION['last_submission'] = $current_time;

// Enhanced response with debugging info
$response = [
    'success' => $business_sent,
    'message' => $business_sent ? 
        'Thank you! Your message has been sent successfully. We will respond within 24 hours.' : 
        'Message received but email delivery may have failed. We will still process your inquiry.',
    'debug' => [
        'business_email_sent' => $business_sent,
        'customer_email_sent' => $customer_sent,
        'mail_function_available' => function_exists('mail'),
        'to_email' => $to,
        'from_email' => $email,
        'server_time' => date('Y-m-d H:i:s'),
        'php_version' => phpversion()
    ]
];

// Log the response
error_log("Email send result: " . json_encode($response));

echo json_encode($response);
?>
