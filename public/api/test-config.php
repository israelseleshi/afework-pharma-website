<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Test if config file exists
    $configFile = __DIR__ . '/config/database.php';
    if (!file_exists($configFile)) {
        echo json_encode(['error' => 'Config file does not exist: ' . $configFile]);
        exit;
    }
    
    // Include the config file
    require_once $configFile;
    
    // Test if class exists
    if (!class_exists('DatabaseConfig')) {
        echo json_encode(['error' => 'DatabaseConfig class not found']);
        exit;
    }
    
    // Test connection
    $result = DatabaseConfig::testConnection();
    echo json_encode($result);
    
} catch (Exception $e) {
    echo json_encode(['error' => 'Exception: ' . $e->getMessage()]);
} catch (Error $e) {
    echo json_encode(['error' => 'Fatal Error: ' . $e->getMessage()]);
}
?>
