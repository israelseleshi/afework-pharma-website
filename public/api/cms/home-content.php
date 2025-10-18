<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Database configuration
$host = 'localhost';
$username = 'afeworcn_afework_admin';
$password = 'mQ+3HMm2(g)q.R758J!;Lb';
$database = 'afeworcn_afework_content';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        handleGet($pdo);
        break;
    case 'POST':
    case 'PUT':
        handleUpdate($pdo, $input);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

function handleGet($pdo) {
    try {
        $stmt = $pdo->prepare("
            SELECT 
                id,
                section_type,
                section_title,
                section_subtitle,
                section_description,
                content_data,
                display_order,
                is_active,
                created_at,
                updated_at
            FROM cms_home_content 
            WHERE is_active = 1 
            ORDER BY display_order ASC
        ");
        
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Process results to decode JSON content_data
        $processedResults = [];
        foreach ($results as $row) {
            $row['content_data'] = json_decode($row['content_data'], true);
            $processedResults[] = $row;
        }
        
        echo json_encode([
            'success' => true,
            'data' => $processedResults
        ]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch content: ' . $e->getMessage()]);
    }
}

function handleUpdate($pdo, $input) {
    if (!$input || !isset($input['section_type'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input data']);
        return;
    }
    
    try {
        // Check if section exists
        $checkStmt = $pdo->prepare("SELECT id FROM cms_home_content WHERE section_type = ?");
        $checkStmt->execute([$input['section_type']]);
        $exists = $checkStmt->fetch();
        
        if ($exists) {
            // Update existing section
            $stmt = $pdo->prepare("
                UPDATE cms_home_content 
                SET 
                    section_title = ?,
                    section_subtitle = ?,
                    section_description = ?,
                    content_data = ?,
                    updated_at = CURRENT_TIMESTAMP
                WHERE section_type = ?
            ");
            
            $stmt->execute([
                $input['section_title'] ?? '',
                $input['section_subtitle'] ?? '',
                $input['section_description'] ?? '',
                json_encode($input['content_data'] ?? []),
                $input['section_type']
            ]);
            
            echo json_encode([
                'success' => true,
                'message' => 'Content updated successfully',
                'section_type' => $input['section_type']
            ]);
            
        } else {
            // Insert new section
            $stmt = $pdo->prepare("
                INSERT INTO cms_home_content 
                (section_type, section_title, section_subtitle, section_description, content_data, display_order)
                VALUES (?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $input['section_type'],
                $input['section_title'] ?? '',
                $input['section_subtitle'] ?? '',
                $input['section_description'] ?? '',
                json_encode($input['content_data'] ?? []),
                $input['display_order'] ?? 0
            ]);
            
            echo json_encode([
                'success' => true,
                'message' => 'Content created successfully',
                'section_type' => $input['section_type'],
                'id' => $pdo->lastInsertId()
            ]);
        }
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save content: ' . $e->getMessage()]);
    }
}

// Utility function to update specific field in a section
function updateSectionField($pdo, $sectionType, $field, $value) {
    try {
        if ($field === 'content_data') {
            $stmt = $pdo->prepare("
                UPDATE cms_home_content 
                SET content_data = ?, updated_at = CURRENT_TIMESTAMP
                WHERE section_type = ?
            ");
            $stmt->execute([json_encode($value), $sectionType]);
        } else {
            $stmt = $pdo->prepare("
                UPDATE cms_home_content 
                SET $field = ?, updated_at = CURRENT_TIMESTAMP
                WHERE section_type = ?
            ");
            $stmt->execute([$value, $sectionType]);
        }
        
        return true;
    } catch (PDOException $e) {
        return false;
    }
}
?>
