<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Include database configuration
require_once 'config/database.php';

// Test database connection
$result = DatabaseConfig::testConnection();

if ($result['success']) {
    // If connection successful, try to get sample data
    $pdo = DatabaseConfig::getConnection();
    
    try {
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM cms_home_content");
        $count = $stmt->fetch()['count'];
        
        $stmt = $pdo->query("SELECT section_type, section_title FROM cms_home_content ORDER BY display_order LIMIT 5");
        $sampleData = $stmt->fetchAll();
        
        echo json_encode([
            'success' => true,
            'message' => 'Production database connection successful',
            'data' => [
                'total_records' => $count,
                'sample_sections' => $sampleData,
                'database_info' => DatabaseConfig::getConfigInfo(),
                'timestamp' => date('Y-m-d H:i:s')
            ]
        ]);
        
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'error' => 'Database query failed: ' . $e->getMessage(),
            'connection_status' => 'Connected but query failed',
            'database_info' => DatabaseConfig::getConfigInfo()
        ]);
    }
    
} else {
    http_response_code(500);
    echo json_encode(array_merge($result, [
        'database_info' => DatabaseConfig::getConfigInfo(),
        'timestamp' => date('Y-m-d H:i:s')
    ]));
}
?>
