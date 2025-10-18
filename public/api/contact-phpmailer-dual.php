<?php
/**
 * Method 2: Dual PHPMailer Contact Handler
 * Business notification + Customer auto-reply system
 * Production-ready implementation for Afework Pharma
 */

// Production error handling
error_reporting(0);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// CORS headers for production
header('Access-Control-Allow-Origin: https://afeworkpharmaet.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Include PHPMailer
require_once __DIR__ . '/PHPMailer/src/Exception.php';
require_once __DIR__ . '/PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

try {
    // Enhanced rate limiting for dual emails
    session_start();
    $current_time = time();
    $time_window = 300; // 5 minutes
    $max_attempts = 2; // Stricter for dual emails
    
    if (!isset($_SESSION['email_attempts'])) {
        $_SESSION['email_attempts'] = [];
    }
    
    // Clean old attempts
    $_SESSION['email_attempts'] = array_filter($_SESSION['email_attempts'], function($time) use ($current_time, $time_window) {
        return ($current_time - $time) < $time_window;
    });
    
    if (count($_SESSION['email_attempts']) >= $max_attempts) {
        throw new Exception('Too many email attempts. Please wait 5 minutes before trying again.');
    }
    
    // Get and validate input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        throw new Exception('Invalid request data');
    }
    
    // Validate required fields
    $required = ['name', 'email', 'message'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            throw new Exception("Field '$field' is required");
        }
    }
    
    // Sanitize and validate input
    $name = htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($data['email']), FILTER_VALIDATE_EMAIL);
    $phone = htmlspecialchars(trim($data['phone'] ?? ''), ENT_QUOTES, 'UTF-8');
    $organization = htmlspecialchars(trim($data['organization'] ?? ''), ENT_QUOTES, 'UTF-8');
    $inquiryType = htmlspecialchars(trim($data['inquiryType'] ?? ''), ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8');
    
    if (!$email) {
        throw new Exception('Invalid email address format');
    }
    
    // Enhanced validation
    if (strlen($name) < 2 || strlen($name) > 100) {
        throw new Exception('Name must be between 2 and 100 characters');
    }
    
    if (strlen($message) < 10 || strlen($message) > 2000) {
        throw new Exception('Message must be between 10 and 2000 characters');
    }
    
    // Production SMTP Configuration
    $smtp_host = 'afeworkpharmaet.com';
    $smtp_port = 465;
    $smtp_username = 'contact@afeworkpharmaet.com';
    $smtp_password = 'mQ+3HMm2(g)q.R758J!;Lb';
    
    // Send Business Notification Email
    $businessMail = new PHPMailer(true);
    
    // SMTP Configuration for business email
    $businessMail->isSMTP();
    $businessMail->Host = $smtp_host;
    $businessMail->SMTPAuth = true;
    $businessMail->Username = $smtp_username;
    $businessMail->Password = $smtp_password;
    $businessMail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $businessMail->Port = $smtp_port;
    $businessMail->CharSet = 'UTF-8';
    
    // Business email settings
    $businessMail->setFrom($smtp_username, 'Afework Pharma Website');
    $businessMail->addAddress('contact@afeworkpharmaet.com', 'Afework Pharma Team');
    $businessMail->addReplyTo($email, $name);
    
    $businessMail->isHTML(true);
    $businessMail->Subject = '[URGENT] New Contact Form - ' . $name;
    $businessMail->Body = createBusinessEmail($name, $email, $phone, $organization, $inquiryType, $message);
    
    // Send business email
    $businessSent = $businessMail->send();
    
    // Send Customer Auto-Reply Email
    $customerMail = new PHPMailer(true);
    
    // SMTP Configuration for customer email
    $customerMail->isSMTP();
    $customerMail->Host = $smtp_host;
    $customerMail->SMTPAuth = true;
    $customerMail->Username = $smtp_username;
    $customerMail->Password = $smtp_password;
    $customerMail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $customerMail->Port = $smtp_port;
    $customerMail->CharSet = 'UTF-8';
    
    // Customer email settings
    $customerMail->setFrom($smtp_username, 'Afework Pharma');
    $customerMail->addAddress($email, $name);
    $customerMail->addReplyTo($smtp_username, 'Afework Pharma Team');
    
    $customerMail->isHTML(true);
    $customerMail->Subject = 'Thank you for contacting Afework Pharma - We\'ll respond soon!';
    $customerMail->Body = createCustomerEmail($name, $email, $phone, $organization, $inquiryType, $message);
    
    // Send customer email
    $customerSent = $customerMail->send();
    
    // Log successful attempt
    $_SESSION['email_attempts'][] = $current_time;
    error_log("Dual email submission successful - Business: " . ($businessSent ? 'YES' : 'NO') . ", Customer: " . ($customerSent ? 'YES' : 'NO') . " - From: $email, Name: $name");
    
    // Success response (success if business email sent, customer email is bonus)
    if ($businessSent) {
        echo json_encode([
            'success' => true,
            'message' => 'Thank you! Your message has been sent successfully. We\'ll respond soon.',
            'details' => [
                'business_notified' => $businessSent,
                'confirmation_sent' => $customerSent
            ]
        ]);
    } else {
        throw new Exception('Failed to send business notification');
    }
    
} catch (Exception $e) {
    // Log error
    error_log('PHPMailer Dual Error: ' . $e->getMessage() . ' - IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please contact us directly at contact@afeworkpharmaet.com or call +251 929 092 353.'
    ]);
}

function createBusinessEmail($name, $email, $phone, $organization, $inquiryType, $message) {
    return '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
        <!-- Header -->
        <div style="background: #059669; color: white; padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">New Contact Inquiry</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Contact Form Submission</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px 20px;">
            <h2 style="color: #059669; margin: 0 0 20px 0; font-size: 22px;">Customer Information</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="background: #f8f9fa;">
                    <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; width: 30%;">Name:</td>
                    <td style="padding: 12px; border: 1px solid #dee2e6;">' . $name . '</td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Email:</td>
                    <td style="padding: 12px; border: 1px solid #dee2e6;"><a href="mailto:' . $email . '" style="color: #059669; text-decoration: none;">' . $email . '</a></td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Phone:</td>
                    <td style="padding: 12px; border: 1px solid #dee2e6;">' . ($phone ?: 'Not provided') . '</td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Organization:</td>
                    <td style="padding: 12px; border: 1px solid #dee2e6;">' . ($organization ?: 'Not provided') . '</td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Inquiry Type:</td>
                    <td style="padding: 12px; border: 1px solid #dee2e6;">' . ($inquiryType ?: 'General Inquiry') . '</td>
                </tr>
            </table>
            
            <h3 style="color: #059669; margin: 25px 0 15px 0;">💬 Customer Message:</h3>
            <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #059669; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">' . nl2br($message) . '</p>
            </div>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
                <p style="margin: 0 0 15px 0; font-weight: bold; font-size: 16px;">📅 Received: ' . date('F j, Y \a\t g:i A T') . '</p>
                <p style="margin: 0; font-size: 14px; color: #666;">✅ Customer automatically notified of receipt</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:' . $email . '" style="background: #059669; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 5px; font-weight: bold; font-size: 16px;">📧 Reply to Customer</a>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #1f2937; color: white; padding: 25px 20px; text-align: center;">
            <h3 style="margin: 0 0 10px 0; color: #10b981;">AFEWORK PHARMA</h3>
            <p style="margin: 0 0 15px 0; font-weight: bold;">Premium Medical Equipment & Healthcare Solutions</p>
            <p style="margin: 0; font-size: 14px; opacity: 0.8; line-height: 1.5;">
                📍 Arada Subcity, Eribekentu Bridge, Woreda 08, Building H.No, 1st Floor #102<br>
                📞 +251 929 092 353 | +251 988 338 800<br>
                ✉️ contact@afeworkpharmaet.com
            </p>
        </div>
    </div>
</body>
</html>';
}

function createCustomerEmail($name, $email, $phone, $organization, $inquiryType, $message) {
    $firstName = explode(' ', $name)[0];
    return '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank you for contacting Afework Pharma</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
        <!-- Header -->
        <div style="background: #059669; color: white; padding: 40px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 32px; font-weight: bold;">Thank You, ' . $firstName . '! 👋</h1>
            <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.9;">Your message has been received successfully</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 20px;">
            <h2 style="color: #059669; margin: 0 0 20px 0; font-size: 24px;">We\'ve received your inquiry</h2>
            <p style="font-size: 16px; margin: 0 0 25px 0;">Thank you for reaching out to Afework Pharma. Our expert team will review your message and respond soon.</p>
            
            <div style="background: #f8f9fa; padding: 25px; border-left: 4px solid #059669; border-radius: 0 8px 8px 0; margin: 25px 0;">
                <h3 style="margin: 0 0 15px 0; color: #059669;">📋 Your Inquiry Summary:</h3>
                <p style="margin: 8px 0;"><strong>Name:</strong> ' . $name . '</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> ' . $email . '</p>
                ' . ($phone ? '<p style="margin: 8px 0;"><strong>Phone:</strong> ' . $phone . '</p>' : '') . '
                ' . ($organization ? '<p style="margin: 8px 0;"><strong>Organization:</strong> ' . $organization . '</p>' : '') . '
                ' . ($inquiryType ? '<p style="margin: 8px 0;"><strong>Inquiry Type:</strong> ' . $inquiryType . '</p>' : '') . '
                <p style="margin: 15px 0 0 0;"><strong>Message:</strong></p>
                <p style="margin: 5px 0; padding: 10px; background: white; border-radius: 4px; font-style: italic;">' . (strlen($message) > 150 ? substr($message, 0, 150) . '...' : $message) . '</p>
            </div>
            
            <h3 style="color: #059669; margin: 30px 0 15px 0; font-size: 20px;">What happens next?</h3>
            <ol style="padding-left: 20px; font-size: 16px;">
                <li style="margin: 10px 0;"><strong>Review:</strong> Our expert team will carefully review your inquiry</li>
                <li style="margin: 10px 0;"><strong>Prepare:</strong> We\'ll prepare a personalized response with relevant information</li>
                <li style="margin: 10px 0;"><strong>Respond:</strong> You\'ll receive our detailed response soon</li>
                <li style="margin: 10px 0;"><strong>Follow-up:</strong> Schedule a consultation to discuss your specific needs</li>
            </ol>
            
            <div style="background: #e8f5e8; padding: 25px; border-radius: 8px; margin: 30px 0; text-align: center;">
                <p style="margin: 0 0 20px 0; font-size: 18px; font-weight: bold; color: #059669;">Need immediate assistance?</p>
                <a href="tel:+251929092353" style="background: #059669; color: white; padding: 15px 25px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 5px; font-weight: bold;">📞 Call: +251 929 092 353</a>
                <a href="mailto:contact@afeworkpharmaet.com" style="background: #6c757d; color: white; padding: 15px 25px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 5px; font-weight: bold;">✉️ Email Us</a>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #1f2937; color: white; padding: 25px 20px; text-align: center;">
            <h3 style="margin: 0 0 10px 0; color: #10b981;">AFEWORK PHARMA</h3>
            <p style="margin: 0 0 15px 0; font-weight: bold;">Premium Medical Equipment & Healthcare Solutions</p>
            <p style="margin: 0; font-size: 14px; opacity: 0.8; line-height: 1.5;">
                📍 Arada Subcity, Eribekentu Bridge, Woreda 08, Building H.No, 1st Floor #102<br>
                📞 +251 929 092 353 | +251 988 338 800<br>
                ✉️ contact@afeworkpharmaet.com
            </p>
            <p style="margin: 15px 0 0 0; font-size: 12px; opacity: 0.6;">
                This is an automated confirmation. Please do not reply to this email.<br>
                For support, contact us directly at contact@afeworkpharmaet.com
            </p>
        </div>
    </div>
</body>
</html>';
}
?>
