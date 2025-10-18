<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Database configuration
$host = 'mysql.lu-shared04.dapanel.net';
$dbname = 'afeworcn_afework_content';
$username = 'afeworcn_afework_admin';
$password = 'mQ+3HMm2(g)q.R758J!;Lb';

try {
    // Create PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Fetch all content
    $stmt = $pdo->prepare("SELECT section_key, content_type, content_value, updated_at FROM cms_content ORDER BY section_key");
    $stmt->execute();
    $content = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Return success response
    echo json_encode([
        'success' => true,
        'content' => $content,
        'message' => 'Retrieved ' . count($content) . ' content items'
    ]);
    
} catch (PDOException $e) {
    // Return fallback content if database fails
    $fallbackContent = [
        [
            'section_key' => 'hero_headline',
            'content_type' => 'text',
            'content_value' => 'Advanced Medical Solutions for a Healthier Ethiopia',
            'updated_at' => date('Y-m-d H:i:s')
        ],
        [
            'section_key' => 'hero_subtitle',
            'content_type' => 'text',
            'content_value' => 'Building a Healthier Ethiopia',
            'updated_at' => date('Y-m-d H:i:s')
        ],
        [
            'section_key' => 'hero_subheadline',
            'content_type' => 'text',
            'content_value' => 'Delivering state-of-the-art medical equipment backed by comprehensive technical support and training across the nation. Your trusted partner in healthcare technology advancement.',
            'updated_at' => date('Y-m-d H:i:s')
        ],
        [
            'section_key' => 'hero_stats',
            'content_type' => 'json',
            'content_value' => '[{"number":45,"suffix":"+","label":"IVD Units Deployed"},{"number":36,"suffix":"+","label":"Healthcare Facilities"},{"number":5,"suffix":"+","label":"Years Experience"}]',
            'updated_at' => date('Y-m-d H:i:s')
        ]
    ];
    
    echo json_encode([
        'success' => true,
        'content' => $fallbackContent,
        'message' => 'Retrieved ' . count($fallbackContent) . ' content items from fallback (DB: ' . $e->getMessage() . ')'
    ]);
}
?>
