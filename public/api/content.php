<?php
// api/content.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Database configuration
$host = 'mysql.lu-shared04.dapanel.net';
$username = 'afeworcn_afework_admin';
$password = 'mQ+3HMm2(g)q.R758J!;Lb';
$database = 'afeworcn_afework_content';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Get all content
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->prepare("SELECT * FROM site_content");
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $content = [];
        foreach ($rows as $row) {
            $content[$row['section_key']] = [
                'type' => $row['content_type'],
                'value' => $row['content_type'] === 'json' ? json_decode($row['content_value'], true) : $row['content_value'],
                'updated_at' => $row['updated_at']
            ];
        }
        
        echo json_encode(['success' => true, 'content' => $content]);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to fetch content']);
    }
}

// Update content (requires authentication)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();
    
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        exit;
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['section_key']) || !isset($input['content_type']) || !isset($input['content_value'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
        exit;
    }
    
    try {
        $section_key = $input['section_key'];
        $content_type = $input['content_type'];
        $content_value = $input['content_type'] === 'json' ? json_encode($input['content_value']) : $input['content_value'];
        
        // Check if section exists
        $stmt = $pdo->prepare("SELECT id FROM site_content WHERE section_key = ?");
        $stmt->execute([$section_key]);
        
        if ($stmt->rowCount() > 0) {
            // Update existing
            $stmt = $pdo->prepare("UPDATE site_content SET content_type = ?, content_value = ?, updated_at = CURRENT_TIMESTAMP WHERE section_key = ?");
            $stmt->execute([$content_type, $content_value, $section_key]);
        } else {
            // Insert new
            $stmt = $pdo->prepare("INSERT INTO site_content (section_key, content_type, content_value) VALUES (?, ?, ?)");
            $stmt->execute([$section_key, $content_type, $content_value]);
        }
        
        echo json_encode(['success' => true, 'message' => 'Content updated successfully']);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to update content']);
    }
}
?>
