<?php
/**
 * CMS API for Afework Pharma
 * Handles hero section content management
 */

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display errors in JSON response
ini_set('log_errors', 1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

// Database configuration (using existing connection)
$db_config = [
    'host' => 'localhost',
    'user' => 'afeworcn_afework_admin',
    'password' => 'mQ+3HMm2(g)q.R758J!;Lb',
    'database' => 'afeworcn_afework_content'
];

try {
    $pdo = new PDO(
        "mysql:host={$db_config['host']};dbname={$db_config['database']};charset=utf8mb4",
        $db_config['user'],
        $db_config['password'],
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Database connection failed', 
        'message' => $e->getMessage(),
        'code' => $e->getCode()
    ]);
    exit();
}

// Simple authentication check
function checkAuth() {
    $headers = getallheaders();
    $auth_header = $headers['Authorization'] ?? '';
    
    if (empty($auth_header)) {
        return false;
    }
    
    // Extract token from "Bearer TOKEN"
    $token = str_replace('Bearer ', '', $auth_header);
    
    // Hardcoded admin token (in production, use JWT or sessions)
    // Token: afework_admin_2024_secure_token
    return $token === 'afework_admin_2024_secure_token';
}

// Get request method and path
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path_parts = explode('/', trim($path, '/'));

// Route handling
try {
    switch ($method) {
        case 'GET':
            handleGet($pdo);
            break;
        case 'POST':
            handlePost($pdo);
            break;
        case 'PUT':
            handlePut($pdo);
            break;
        case 'DELETE':
            handleDelete($pdo);
            break;
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error', 'message' => $e->getMessage()]);
}

// Handle GET requests - fetch content
function handleGet($pdo) {
    $section = $_GET['section'] ?? 'hero';
    $content_key = $_GET['key'] ?? null;
    
    if ($section === 'about') {
        handleGetAbout($pdo, $content_key);
    } else {
        handleGetHero($pdo, $content_key);
    }
}

// Handle GET requests for hero content
function handleGetHero($pdo, $content_key = null) {
    if ($content_key) {
        // Get specific content
        $stmt = $pdo->prepare("SELECT * FROM cms_hero_content WHERE content_key = ? AND is_active = 1");
        $stmt->execute([$content_key]);
        $content = $stmt->fetch();
        
        if ($content) {
            // Parse JSON content if needed
            if ($content['content_type'] === 'json') {
                $content['parsed_value'] = json_decode($content['content_value'], true);
            }
            echo json_encode(['success' => true, 'data' => $content]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Content not found']);
        }
    } else {
        // Get all hero content
        $stmt = $pdo->prepare("SELECT * FROM cms_hero_content WHERE is_active = 1 ORDER BY content_key");
        $stmt->execute();
        $contents = $stmt->fetchAll();
        
        // Parse JSON contents
        foreach ($contents as &$content) {
            if ($content['content_type'] === 'json') {
                $content['parsed_value'] = json_decode($content['content_value'], true);
            }
        }
        
        echo json_encode(['success' => true, 'data' => $contents]);
    }
}

// Handle GET requests for about content
function handleGetAbout($pdo, $content_key = null) {
    try {
        $data = [];
        
        // Get about content
        if ($content_key) {
            $stmt = $pdo->prepare("SELECT * FROM cms_about_content WHERE content_key = ?");
            $stmt->execute([$content_key]);
            $content = $stmt->fetch();
            
            if ($content) {
                echo json_encode(['success' => true, 'data' => $content]);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'About content not found']);
            }
        } else {
            // Get all about data
            
            // Basic about content
            $stmt = $pdo->prepare("SELECT * FROM cms_about_content ORDER BY content_key");
            $stmt->execute();
            $data['content'] = $stmt->fetchAll();
            
            // Team members
            $stmt = $pdo->prepare("SELECT * FROM cms_team_members ORDER BY display_order, id");
            $stmt->execute();
            $data['team_members'] = $stmt->fetchAll();
            
            // Company milestones
            $stmt = $pdo->prepare("SELECT * FROM cms_company_milestones ORDER BY display_order, year");
            $stmt->execute();
            $data['milestones'] = $stmt->fetchAll();
            
            // Achievements
            $stmt = $pdo->prepare("SELECT * FROM cms_achievements ORDER BY display_order, id");
            $stmt->execute();
            $data['achievements'] = $stmt->fetchAll();
            
            echo json_encode(['success' => true, 'data' => $data]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch about content', 'message' => $e->getMessage()]);
    }
}

// Handle POST requests - admin login
function handlePost($pdo) {
    $input = json_decode(file_get_contents('php://input'), true);
    $action = $input['action'] ?? '';
    
    if ($action === 'login') {
        $username = $input['username'] ?? '';
        $password = $input['password'] ?? '';
        
        // Hardcoded admin credentials
        if ($username === 'admin' && $password === 'AfeworkAdmin2024!') {
            // Return success with token
            echo json_encode([
                'success' => true,
                'token' => 'afework_admin_2024_secure_token',
                'user' => [
                    'username' => 'admin',
                    'email' => 'admin@afeworkpharmaet.com'
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid credentials']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid action']);
    }
}

// Handle PUT requests - update content
function handlePut($pdo) {
    if (!checkAuth()) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        return;
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    $section = $input['section'] ?? 'hero';
    
    if ($section === 'about') {
        handlePutAbout($pdo, $input);
    } else {
        handlePutHero($pdo, $input);
    }
}

// Handle PUT requests for hero content
function handlePutHero($pdo, $input) {
    $content_key = $input['content_key'] ?? '';
    $content_value = $input['content_value'] ?? '';
    $change_reason = $input['change_reason'] ?? 'Updated via CMS';
    
    if (empty($content_key) || empty($content_value)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        return;
    }
    
    // Get current content for history
    $stmt = $pdo->prepare("SELECT * FROM cms_hero_content WHERE content_key = ?");
    $stmt->execute([$content_key]);
    $current_content = $stmt->fetch();
    
    if (!$current_content) {
        http_response_code(404);
        echo json_encode(['error' => 'Content not found']);
        return;
    }
    
    // Start transaction
    $pdo->beginTransaction();
    
    try {
        // Update content
        $stmt = $pdo->prepare("UPDATE cms_hero_content SET content_value = ?, updated_at = NOW() WHERE content_key = ?");
        $stmt->execute([$content_value, $content_key]);
        
        // Add to history
        $stmt = $pdo->prepare("INSERT INTO cms_content_history (content_id, old_value, new_value, changed_by, change_reason) VALUES (?, ?, ?, 1, ?)");
        $stmt->execute([$current_content['id'], $current_content['content_value'], $content_value, $change_reason]);
        
        $pdo->commit();
        
        echo json_encode(['success' => true, 'message' => 'Content updated successfully']);
    } catch (Exception $e) {
        $pdo->rollback();
        throw $e;
    }
}

// Handle PUT requests for about content
function handlePutAbout($pdo, $input) {
    $action = $input['action'] ?? 'update_content';
    
    try {
        switch ($action) {
            case 'update_content':
                updateAboutContent($pdo, $input);
                break;
            case 'update_team_member':
                updateTeamMember($pdo, $input);
                break;
            case 'update_milestone':
                updateMilestone($pdo, $input);
                break;
            case 'update_achievement':
                updateAchievement($pdo, $input);
                break;
            case 'add_team_member':
                addTeamMember($pdo, $input);
                break;
            case 'add_milestone':
                addMilestone($pdo, $input);
                break;
            case 'add_achievement':
                addAchievement($pdo, $input);
                break;
            case 'delete_team_member':
                deleteTeamMember($pdo, $input);
                break;
            case 'delete_milestone':
                deleteMilestone($pdo, $input);
                break;
            case 'delete_achievement':
                deleteAchievement($pdo, $input);
                break;
            default:
                http_response_code(400);
                echo json_encode(['error' => 'Invalid action']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update about content', 'message' => $e->getMessage()]);
    }
}

// Update basic about content
function updateAboutContent($pdo, $input) {
    $content_key = $input['content_key'] ?? '';
    $content_value = $input['content_value'] ?? '';
    $change_reason = $input['change_reason'] ?? 'Updated via CMS';
    
    if (empty($content_key)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing content key']);
        return;
    }
    
    // Get current content for history
    $stmt = $pdo->prepare("SELECT * FROM cms_about_content WHERE content_key = ?");
    $stmt->execute([$content_key]);
    $current_content = $stmt->fetch();
    
    if (!$current_content) {
        http_response_code(404);
        echo json_encode(['error' => 'About content not found']);
        return;
    }
    
    // Start transaction
    $pdo->beginTransaction();
    
    try {
        // Update content
        $stmt = $pdo->prepare("UPDATE cms_about_content SET content_value = ?, updated_at = NOW() WHERE content_key = ?");
        $stmt->execute([$content_value, $content_key]);
        
        // Add to history
        $stmt = $pdo->prepare("INSERT INTO cms_about_content_history (content_key, old_value, new_value, changed_by, change_reason) VALUES (?, ?, ?, 'admin', ?)");
        $stmt->execute([$content_key, $current_content['content_value'], $content_value, $change_reason]);
        
        $pdo->commit();
        
        echo json_encode(['success' => true, 'message' => 'About content updated successfully']);
    } catch (Exception $e) {
        $pdo->rollback();
        throw $e;
    }
}

// Team member functions
function updateTeamMember($pdo, $input) {
    $id = $input['id'] ?? 0;
    $name = $input['name'] ?? '';
    $position = $input['position'] ?? '';
    $bio = $input['bio'] ?? '';
    $image_url = $input['image_url'] ?? '';
    $featured = $input['featured'] ?? false;
    $display_order = $input['display_order'] ?? 0;
    
    if (empty($id) || empty($name) || empty($position)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        return;
    }
    
    $stmt = $pdo->prepare("UPDATE cms_team_members SET name = ?, position = ?, bio = ?, image_url = ?, featured = ?, display_order = ?, updated_at = NOW() WHERE id = ?");
    $stmt->execute([$name, $position, $bio, $image_url, $featured, $display_order, $id]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Team member updated successfully']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Team member not found']);
    }
}

function addTeamMember($pdo, $input) {
    $name = $input['name'] ?? '';
    $position = $input['position'] ?? '';
    $bio = $input['bio'] ?? '';
    $image_url = $input['image_url'] ?? '';
    $featured = $input['featured'] ?? false;
    $display_order = $input['display_order'] ?? 0;
    
    if (empty($name) || empty($position)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        return;
    }
    
    $stmt = $pdo->prepare("INSERT INTO cms_team_members (name, position, bio, image_url, featured, display_order) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$name, $position, $bio, $image_url, $featured, $display_order]);
    
    echo json_encode(['success' => true, 'message' => 'Team member added successfully', 'id' => $pdo->lastInsertId()]);
}

function deleteTeamMember($pdo, $input) {
    $id = $input['id'] ?? 0;
    
    if (empty($id)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing team member ID']);
        return;
    }
    
    $stmt = $pdo->prepare("DELETE FROM cms_team_members WHERE id = ?");
    $stmt->execute([$id]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Team member deleted successfully']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Team member not found']);
    }
}

// Milestone functions
function updateMilestone($pdo, $input) {
    $id = $input['id'] ?? 0;
    $year = $input['year'] ?? '';
    $title = $input['title'] ?? '';
    $description = $input['description'] ?? '';
    $icon = $input['icon'] ?? '';
    $achievement = $input['achievement'] ?? null;
    $display_order = $input['display_order'] ?? 0;
    
    if (empty($id) || empty($year) || empty($title)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        return;
    }
    
    $stmt = $pdo->prepare("UPDATE cms_company_milestones SET year = ?, title = ?, description = ?, icon = ?, achievement = ?, display_order = ?, updated_at = NOW() WHERE id = ?");
    $stmt->execute([$year, $title, $description, $icon, $achievement, $display_order, $id]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Milestone updated successfully']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Milestone not found']);
    }
}

function addMilestone($pdo, $input) {
    $year = $input['year'] ?? '';
    $title = $input['title'] ?? '';
    $description = $input['description'] ?? '';
    $icon = $input['icon'] ?? '';
    $achievement = $input['achievement'] ?? null;
    $display_order = $input['display_order'] ?? 0;
    
    if (empty($year) || empty($title)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        return;
    }
    
    $stmt = $pdo->prepare("INSERT INTO cms_company_milestones (year, title, description, icon, achievement, display_order) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$year, $title, $description, $icon, $achievement, $display_order]);
    
    echo json_encode(['success' => true, 'message' => 'Milestone added successfully', 'id' => $pdo->lastInsertId()]);
}

function deleteMilestone($pdo, $input) {
    $id = $input['id'] ?? 0;
    
    if (empty($id)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing milestone ID']);
        return;
    }
    
    $stmt = $pdo->prepare("DELETE FROM cms_company_milestones WHERE id = ?");
    $stmt->execute([$id]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Milestone deleted successfully']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Milestone not found']);
    }
}

// Achievement functions
function updateAchievement($pdo, $input) {
    $id = $input['id'] ?? 0;
    $icon = $input['icon'] ?? '';
    $title = $input['title'] ?? '';
    $description = $input['description'] ?? '';
    $display_order = $input['display_order'] ?? 0;
    
    if (empty($id) || empty($title)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        return;
    }
    
    $stmt = $pdo->prepare("UPDATE cms_achievements SET icon = ?, title = ?, description = ?, display_order = ?, updated_at = NOW() WHERE id = ?");
    $stmt->execute([$icon, $title, $description, $display_order, $id]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Achievement updated successfully']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Achievement not found']);
    }
}

function addAchievement($pdo, $input) {
    $icon = $input['icon'] ?? '';
    $title = $input['title'] ?? '';
    $description = $input['description'] ?? '';
    $display_order = $input['display_order'] ?? 0;
    
    if (empty($title)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        return;
    }
    
    $stmt = $pdo->prepare("INSERT INTO cms_achievements (icon, title, description, display_order) VALUES (?, ?, ?, ?)");
    $stmt->execute([$icon, $title, $description, $display_order]);
    
    echo json_encode(['success' => true, 'message' => 'Achievement added successfully', 'id' => $pdo->lastInsertId()]);
}

function deleteAchievement($pdo, $input) {
    $id = $input['id'] ?? 0;
    
    if (empty($id)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing achievement ID']);
        return;
    }
    
    $stmt = $pdo->prepare("DELETE FROM cms_achievements WHERE id = ?");
    $stmt->execute([$id]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Achievement deleted successfully']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Achievement not found']);
    }
}

// Handle DELETE requests - deactivate content
function handleDelete($pdo) {
    if (!checkAuth()) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        return;
    }
    
    $content_key = $_GET['key'] ?? '';
    
    if (empty($content_key)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing content key']);
        return;
    }
    
    $stmt = $pdo->prepare("UPDATE cms_hero_content SET is_active = 0 WHERE content_key = ?");
    $stmt->execute([$content_key]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Content deactivated successfully']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Content not found']);
    }
}
?>
