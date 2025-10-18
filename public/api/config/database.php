<?php
// Production Database configuration for Afework Pharma CMS
class DatabaseConfig {
    // Production database credentials (localhost for same-server connection)
    private static $config = [
        'host' => 'localhost',
        'username' => 'afeworcn_afework_admin',
        'password' => 'mQ+3HMm2(g)q.R758J!;Lb',
        'database' => 'afeworcn_afework_content',
        'charset' => 'utf8mb4'
    ];
    
    public static function getConnection() {
        try {
            $dsn = "mysql:host=" . self::$config['host'] . 
                   ";dbname=" . self::$config['database'] . 
                   ";charset=" . self::$config['charset'];
            
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4",
                PDO::ATTR_TIMEOUT => 30 // 30 second timeout for production
            ];
            
            $pdo = new PDO($dsn, self::$config['username'], self::$config['password'], $options);
            
            // Test connection with a simple query
            $pdo->query("SELECT 1");
            
            return $pdo;
            
        } catch (PDOException $e) {
            // Log the error for debugging (in production, you might want to log to a file)
            error_log("Database connection failed: " . $e->getMessage());
            
            // Return null to indicate connection failure
            return null;
        }
    }
    
    public static function testConnection() {
        $pdo = self::getConnection();
        if ($pdo === null) {
            return [
                'success' => false,
                'error' => 'Failed to connect to production database'
            ];
        }
        
        try {
            // Test if our table exists
            $stmt = $pdo->query("SHOW TABLES LIKE 'cms_home_content'");
            $tableExists = $stmt->rowCount() > 0;
            
            if (!$tableExists) {
                return [
                    'success' => false,
                    'error' => 'Table cms_home_content does not exist. Please run the database setup script first.',
                    'suggestion' => 'Run the SQL script from database/cms_home_content.sql'
                ];
            }
            
            // Test if we have data
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM cms_home_content");
            $count = $stmt->fetch()['count'];
            
            return [
                'success' => true,
                'message' => 'Production database connection successful',
                'records_count' => $count,
                'database_info' => [
                    'host' => self::$config['host'],
                    'database' => self::$config['database'],
                    'table' => 'cms_home_content'
                ]
            ];
            
        } catch (PDOException $e) {
            return [
                'success' => false,
                'error' => 'Database test failed: ' . $e->getMessage()
            ];
        }
    }
    
    // Get database configuration for debugging (without password)
    public static function getConfigInfo() {
        return [
            'host' => self::$config['host'],
            'database' => self::$config['database'],
            'username' => self::$config['username'],
            'charset' => self::$config['charset']
        ];
    }
}
?>
