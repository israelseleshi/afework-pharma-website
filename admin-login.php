<?php
// admin-login.php
session_start();

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

// Handle login
if ($_POST) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    // Check credentials (using your existing admin user)
    if ($username === 'admin' && $password === 'adm@123') {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_user'] = 'admin';
        header('Location: admin-dashboard.php');
        exit;
    } else {
        $error = 'Invalid credentials';
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Afework Pharma - Admin Login</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; }
        .login-container { max-width: 400px; margin: 100px auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input[type="text"], input[type="password"] { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
        button { width: 100%; padding: 12px; background: #10b981; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; }
        button:hover { background: #059669; }
        .error { color: red; margin-bottom: 20px; }
        .logo { text-align: center; margin-bottom: 30px; }
        .logo h1 { color: #10b981; margin: 0; }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="logo">
            <h1>Afework Pharma</h1>
            <p>Content Management System</p>
        </div>
        
        <?php if (isset($error)): ?>
            <div class="error"><?php echo $error; ?></div>
        <?php endif; ?>
        
        <form method="POST">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
            </div>
            
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            
            <button type="submit">Login</button>
        </form>
        
        <div style="margin-top: 20px; padding: 15px; background: #e0f2fe; border-radius: 5px; font-size: 14px;">
            <strong>Default Credentials:</strong><br>
            Username: <code>admin</code><br>
            Password: <code>adm@123</code>
        </div>
    </div>
</body>
</html>
