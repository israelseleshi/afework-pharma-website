<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Database configuration
    $host = 'localhost';
    $username = 'afeworcn_afework_admin';
    $password = 'mQ+3HMm2(g)q.R758J!;Lb';
    $database = 'afeworcn_afework_content';
    
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Get hero content specifically
    $stmt = $pdo->prepare("SELECT * FROM cms_home_content WHERE section_type = 'hero' AND is_active = 1");
    $stmt->execute();
    $heroData = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($heroData) {
        // Decode JSON content_data
        $heroData['content_data'] = json_decode($heroData['content_data'], true);
        
        echo json_encode([
            'success' => true,
            'message' => 'Hero content found',
            'data' => $heroData,
            'formatted' => [
                'heroTitle' => $heroData['section_title'],
                'heroSubtitle' => $heroData['section_subtitle'],
                'heroStats' => $heroData['content_data']['heroStats'] ?? []
            ]
        ], JSON_PRETTY_PRINT);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'No hero content found',
            'debug' => 'No rows returned for section_type = hero'
        ]);
    }
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage()
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => 'General error: ' . $e->getMessage()
    ]);
}
?>
