<?php
// admin-dashboard.php
session_start();

// Check if user is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: admin-login.php');
    exit;
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
    die("Connection failed: " . $e->getMessage());
}

// Handle content updates
if ($_POST && isset($_POST['action'])) {
    if ($_POST['action'] === 'update_content') {
        $section_key = $_POST['section_key'];
        $content_type = $_POST['content_type'];
        $content_value = $_POST['content_value'];
        
        try {
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
            
            $success = "Content updated successfully!";
        } catch(PDOException $e) {
            $error = "Error updating content: " . $e->getMessage();
        }
    }
}

// Get all content
try {
    $stmt = $pdo->prepare("SELECT * FROM site_content ORDER BY section_key");
    $stmt->execute();
    $content = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    $error = "Error fetching content: " . $e->getMessage();
    $content = [];
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: admin-login.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Afework Pharma - Admin Dashboard</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; }
        .header { background: #10b981; color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center; }
        .header h1 { margin: 0; }
        .logout-btn { background: #059669; color: white; padding: 8px 16px; text-decoration: none; border-radius: 5px; }
        .container { max-width: 1200px; margin: 20px auto; padding: 0 20px; }
        .content-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .content-card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .content-card h3 { margin-top: 0; color: #10b981; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, textarea, select { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px; }
        textarea { height: 100px; resize: vertical; }
        button { background: #10b981; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
        button:hover { background: #059669; }
        .success { background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin-bottom: 20px; }
        .error { background: #f8d7da; color: #721c24; padding: 10px; border-radius: 5px; margin-bottom: 20px; }
        .content-preview { background: #f8f9fa; padding: 10px; border-radius: 5px; margin-top: 10px; font-size: 14px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Afework Pharma - Admin Dashboard</h1>
        <a href="?logout=1" class="logout-btn">Logout</a>
    </div>
    
    <div class="container">
        <?php if (isset($success)): ?>
            <div class="success"><?php echo $success; ?></div>
        <?php endif; ?>
        
        <?php if (isset($error)): ?>
            <div class="error"><?php echo $error; ?></div>
        <?php endif; ?>
        
        <h2>Content Management</h2>
        
        <div class="content-grid">
            <?php foreach ($content as $item): ?>
                <div class="content-card">
                    <h3><?php echo htmlspecialchars($item['section_key']); ?></h3>
                    
                    <form method="POST">
                        <input type="hidden" name="action" value="update_content">
                        <input type="hidden" name="section_key" value="<?php echo htmlspecialchars($item['section_key']); ?>">
                        
                        <div class="form-group">
                            <label>Content Type:</label>
                            <select name="content_type">
                                <option value="text" <?php echo $item['content_type'] === 'text' ? 'selected' : ''; ?>>Text</option>
                                <option value="html" <?php echo $item['content_type'] === 'html' ? 'selected' : ''; ?>>HTML</option>
                                <option value="json" <?php echo $item['content_type'] === 'json' ? 'selected' : ''; ?>>JSON</option>
                                <option value="image" <?php echo $item['content_type'] === 'image' ? 'selected' : ''; ?>>Image</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Content Value:</label>
                            <textarea name="content_value"><?php echo htmlspecialchars($item['content_value']); ?></textarea>
                        </div>
                        
                        <button type="submit">Update Content</button>
                    </form>
                    
                    <div class="content-preview">
                        <strong>Current Value:</strong><br>
                        <?php echo htmlspecialchars(substr($item['content_value'], 0, 100)) . (strlen($item['content_value']) > 100 ? '...' : ''); ?>
                    </div>
                    
                    <div style="margin-top: 10px; font-size: 12px; color: #666;">
                        Last updated: <?php echo $item['updated_at']; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        
        <div class="content-card" style="margin-top: 30px;">
            <h3>Add New Content Section</h3>
            
            <form method="POST">
                <input type="hidden" name="action" value="update_content">
                
                <div class="form-group">
                    <label>Section Key:</label>
                    <input type="text" name="section_key" placeholder="e.g., hero_title" required>
                </div>
                
                <div class="form-group">
                    <label>Content Type:</label>
                    <select name="content_type">
                        <option value="text">Text</option>
                        <option value="html">HTML</option>
                        <option value="json">JSON</option>
                        <option value="image">Image</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Content Value:</label>
                    <textarea name="content_value" placeholder="Enter content here..." required></textarea>
                </div>
                
                <button type="submit">Add New Section</button>
            </form>
        </div>
    </div>
</body>
</html>
