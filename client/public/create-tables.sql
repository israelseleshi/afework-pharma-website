-- Afework Pharma CMS Database Setup
-- Run this in phpMyAdmin SQL tab or MySQL command line

USE afework_pharma_cms;

-- Drop existing tables if they exist (optional - remove if you want to keep existing data)
DROP TABLE IF EXISTS cms_about_content_history;
DROP TABLE IF EXISTS cms_achievements;
DROP TABLE IF EXISTS cms_company_milestones;
DROP TABLE IF EXISTS cms_team_members;
DROP TABLE IF EXISTS cms_about_content;

-- 1. Create cms_about_content table
CREATE TABLE cms_about_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content_key VARCHAR(100) NOT NULL UNIQUE,
    content_value TEXT,
    content_type ENUM('text', 'textarea', 'image', 'url') DEFAULT 'text',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Create cms_team_members table
CREATE TABLE cms_team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    bio TEXT,
    image_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Create cms_company_milestones table
CREATE TABLE cms_company_milestones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    year VARCHAR(10) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    achievement VARCHAR(255),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Create cms_achievements table
CREATE TABLE cms_achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(100),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Create cms_about_content_history table
CREATE TABLE cms_about_content_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content_key VARCHAR(100) NOT NULL,
    old_value TEXT,
    new_value TEXT,
    changed_by VARCHAR(255),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_content_key (content_key),
    INDEX idx_changed_at (changed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data

-- 1. Insert About Content
INSERT INTO cms_about_content (content_key, content_value, content_type) VALUES
('hero_title', 'Advancing Healthcare Through Innovation', 'text'),
('hero_subtitle', 'Since 2019, Afework Pharma has been Ethiopia\'s trusted partner in delivering cutting-edge medical equipment and comprehensive healthcare solutions.', 'text'),
('hero_team_image', '/assets/images/afework-team-image.jpg', 'text'),
('mission_statement', 'To transform healthcare delivery in Ethiopia by providing world-class medical equipment, innovative solutions, and exceptional service that empowers healthcare professionals to save lives and improve patient outcomes.', 'textarea'),
('vision_statement', 'To be the leading catalyst in Ethiopia\'s healthcare transformation, bridging the gap between advanced medical technology and accessible healthcare for all Ethiopians.', 'textarea');

-- 2. Insert Achievements
INSERT INTO cms_achievements (icon, title, description, display_order) VALUES
('🏆', '5+ Years Experience', 'Leading medical equipment distribution in Ethiopia', 1),
('🏥', '40+ IVD Units', 'Recently deployed across 36 health facilities', 2),
('🔬', '500+ Installations', 'Successfully installed and maintained medical equipment', 3),
('👥', '50+ Healthcare Partners', 'Trusted by hospitals and clinics nationwide', 4),
('📈', '99% Uptime', 'Exceptional equipment reliability and maintenance', 5),
('🌍', 'ISO Certified', 'International quality standards compliance', 6);

-- 3. Insert Company Milestones
INSERT INTO cms_company_milestones (year, title, description, icon, achievement, display_order) VALUES
('2019', 'Company Founded', 'Afework Pharma established with a vision to transform Ethiopian healthcare', '🚀', 'Founded', 1),
('2020', 'First Major Contract', 'Secured partnership with leading Ethiopian hospitals', '🤝', 'Partnership', 2),
('2021', 'Equipment Expansion', 'Expanded portfolio to include advanced diagnostic equipment', '🔬', 'Expansion', 3),
('2022', 'Regional Growth', 'Extended services to multiple regions across Ethiopia', '🌍', 'Growth', 4),
('2023', 'Technology Innovation', 'Introduced cutting-edge medical imaging solutions', '💡', 'Innovation', 5),
('2024', 'Quality Certification', 'Achieved ISO certification and international recognition', '🏆', 'Certification', 6);

-- 4. Insert Team Members
INSERT INTO cms_team_members (name, position, bio, image_url, is_featured, display_order) VALUES
('Dr. Afework Tesfaye', 'Chief Executive Officer', 'With over 15 years of experience in healthcare management and medical equipment distribution, Dr. Afework leads our mission to transform Ethiopian healthcare through innovative solutions.', '/assets/images/team/ceo-afework.jpg', 1, 1),
('Eng. Sarah Bekele', 'Chief Technology Officer', 'A biomedical engineering expert with extensive experience in medical device implementation and maintenance across Sub-Saharan Africa.', '/assets/images/team/cto-sarah.jpg', 1, 2),
('Dr. Michael Hailu', 'Medical Director', 'Board-certified physician with specialization in diagnostic medicine and healthcare technology integration.', '/assets/images/team/medical-director-michael.jpg', 1, 3),
('Ato Dawit Girma', 'Operations Manager', 'Logistics and operations specialist ensuring seamless equipment delivery and installation across Ethiopia.', '/assets/images/team/ops-manager-dawit.jpg', 0, 4),
('W/ro Hanan Ahmed', 'Quality Assurance Manager', 'Quality control expert ensuring all medical equipment meets international standards and regulatory compliance.', '/assets/images/team/qa-manager-hanan.jpg', 0, 5);

-- Verify the data was inserted
SELECT 'About Content' as Table_Name, COUNT(*) as Record_Count FROM cms_about_content
UNION ALL
SELECT 'Achievements', COUNT(*) FROM cms_achievements
UNION ALL
SELECT 'Milestones', COUNT(*) FROM cms_company_milestones
UNION ALL
SELECT 'Team Members', COUNT(*) FROM cms_team_members
UNION ALL
SELECT 'Content History', COUNT(*) FROM cms_about_content_history;

-- Show sample data
SELECT 'Sample About Content:' as Info;
SELECT content_key, LEFT(content_value, 50) as content_preview, content_type FROM cms_about_content LIMIT 3;

SELECT 'Sample Achievements:' as Info;
SELECT icon, title, description FROM cms_achievements LIMIT 3;

SELECT 'Sample Milestones:' as Info;
SELECT year, title, icon, achievement FROM cms_company_milestones LIMIT 3;

SELECT 'Sample Team Members:' as Info;
SELECT name, position, is_featured FROM cms_team_members LIMIT 3;
