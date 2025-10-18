<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

echo json_encode(['debug' => 'Starting diagnostic...']) . "\n";

// Test 1: Basic PHP functionality
try {
    echo json_encode(['test1' => 'PHP is working']) . "\n";
} catch (Exception $e) {
    echo json_encode(['error' => 'PHP error: ' . $e->getMessage()]) . "\n";
    exit;
}

// Test 2: Database connection
try {
    $host = 'localhost';
    $username = 'afeworcn_afework_admin';
    $password = 'mQ+3HMm2(g)q.R758J!;Lb';
    $database = 'afeworcn_afework_content';
    
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo json_encode(['test2' => 'Database connection successful']) . "\n";
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]) . "\n";
    exit;
}

// Test 3: Check if table exists
try {
    $stmt = $pdo->query("SHOW TABLES LIKE 'cms_home_content'");
    $tableExists = $stmt->rowCount() > 0;
    
    if ($tableExists) {
        echo json_encode(['test3' => 'Table cms_home_content exists']) . "\n";
    } else {
        echo json_encode(['error' => 'Table cms_home_content does not exist']) . "\n";
        
        // Show available tables
        $stmt = $pdo->query("SHOW TABLES");
        $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
        echo json_encode(['available_tables' => $tables]) . "\n";
        exit;
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Table check failed: ' . $e->getMessage()]) . "\n";
    exit;
}

// Test 4: Check table structure
try {
    $stmt = $pdo->query("DESCRIBE cms_home_content");
    $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['test4' => 'Table structure', 'columns' => $columns]) . "\n";
} catch (PDOException $e) {
    echo json_encode(['error' => 'Table structure check failed: ' . $e->getMessage()]) . "\n";
    exit;
}

// Test 5: Try to select data
try {
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM cms_home_content");
    $count = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode(['test5' => 'Data count successful', 'count' => $count]) . "\n";
} catch (PDOException $e) {
    echo json_encode(['error' => 'Data count failed: ' . $e->getMessage()]) . "\n";
    exit;
}

// Test 6: Try to select actual data
try {
    $stmt = $pdo->query("SELECT * FROM cms_home_content LIMIT 3");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['test6' => 'Data selection successful', 'sample_data' => $data]) . "\n";
} catch (PDOException $e) {
    echo json_encode(['error' => 'Data selection failed: ' . $e->getMessage()]) . "\n";
    exit;
}

echo json_encode(['success' => 'All tests passed!']) . "\n";
?>
