-- CMS Database Schema for Afework Pharma
-- Hero Section Content Management

-- Admin users table (hardcoded credentials)
CREATE TABLE IF NOT EXISTS cms_admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- Hero content table
CREATE TABLE IF NOT EXISTS cms_hero_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content_key VARCHAR(100) UNIQUE NOT NULL,
    content_type ENUM('text', 'json', 'image', 'url') NOT NULL,
    content_value TEXT NOT NULL,
    display_name VARCHAR(200) NOT NULL,
    description TEXT,
    updated_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (updated_by) REFERENCES cms_admins(id)
);

-- Content history for tracking changes
CREATE TABLE IF NOT EXISTS cms_content_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content_id INT NOT NULL,
    old_value TEXT,
    new_value TEXT NOT NULL,
    changed_by INT NOT NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    change_reason VARCHAR(500),
    FOREIGN KEY (content_id) REFERENCES cms_hero_content(id),
    FOREIGN KEY (changed_by) REFERENCES cms_admins(id)
);

-- Insert hardcoded admin user
-- Password: AfeworkAdmin2024! (hashed with bcrypt)
INSERT INTO cms_admins (username, password_hash, email) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@afeworkpharmaet.com')
ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash);

-- Insert default hero content
INSERT INTO cms_hero_content (content_key, content_type, content_value, display_name, description) VALUES 
('hero_headline', 'text', 'Advanced Medical Solutions for a Healthier Ethiopia', 'Hero Headline', 'Main headline text displayed in the hero section'),
('hero_subheadline', 'text', 'Delivering state-of-the-art medical equipment backed by comprehensive technical support and training across the nation. Your trusted partner in healthcare technology advancement.', 'Hero Subheadline', 'Descriptive text below the main headline'),
('hero_stats', 'json', '[{"number": 45, "suffix": "+", "label": "IVD Units Deployed"}, {"number": 36, "suffix": "+", "label": "Healthcare Facilities"}, {"number": 5, "suffix": "+", "label": "Years Experience"}]', 'Hero Statistics', 'Statistics displayed in the hero section'),
('hero_cta_primary', 'text', 'Explore Our Solutions', 'Primary CTA Button', 'Text for the primary call-to-action button'),
('hero_cta_secondary', 'text', 'Contact Us Today', 'Secondary CTA Button', 'Text for the secondary call-to-action button'),
('hero_background_image', 'url', '/images/hero-medical-equipment.jpg', 'Hero Background Image', 'Background image URL for the hero section'),
('hero_featured_image', 'url', '/images/medical-professional.jpg', 'Hero Featured Image', 'Main featured image in the hero section')
ON DUPLICATE KEY UPDATE 
    content_value = VALUES(content_value),
    display_name = VALUES(display_name),
    description = VALUES(description);
