-- =====================================================
-- CMS Home Content Database Schema
-- Table: cms_home_content
-- Description: Content management for home page sections
-- =====================================================

-- Drop table if exists (for development)
DROP TABLE IF EXISTS cms_home_content;

-- Create cms_home_content table
CREATE TABLE cms_home_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_type ENUM('hero', 'value_proposition', 'solutions_overview', 'featured_projects') NOT NULL,
    section_title VARCHAR(255) NOT NULL,
    section_subtitle TEXT,
    section_description TEXT,
    content_data JSON NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes for better performance
    INDEX idx_section_type (section_type),
    INDEX idx_display_order (display_order),
    INDEX idx_is_active (is_active)
);

-- =====================================================
-- INSERT STATEMENTS - Home Page Content
-- =====================================================

-- 1. HERO SECTION
INSERT INTO cms_home_content (
    section_type, 
    section_title, 
    section_subtitle, 
    section_description,
    content_data,
    display_order
) VALUES (
    'hero',
    'Advanced Medical Solutions for a Healthier Ethiopia',
    'Delivering state-of-the-art medical equipment backed by comprehensive technical support and training across the nation. Your trusted partner in healthcare technology advancement.',
    'Hero section with statistics and main messaging',
    JSON_OBJECT(
        'heroStats', JSON_ARRAY(
            JSON_OBJECT('number', '45', 'suffix', '+', 'label', 'IVD Units Deployed'),
            JSON_OBJECT('number', '36', 'suffix', '+', 'label', 'Healthcare Facilities'),
            JSON_OBJECT('number', '5', 'suffix', '+', 'label', 'Years Experience')
        )
    ),
    1
);

-- 2. VALUE PROPOSITION SECTION
INSERT INTO cms_home_content (
    section_type,
    section_title,
    section_subtitle,
    section_description,
    content_data,
    display_order
) VALUES (
    'value_proposition',
    'Why Choose Afework Pharma?',
    'We are more than a supplier; we are your strategic partner in advancing healthcare in Ethiopia. Experience the difference of working with true experts.',
    'Value proposition cards highlighting key differentiators',
    JSON_OBJECT(
        'valuePropositions', JSON_ARRAY(
            JSON_OBJECT(
                'icon', 'Microscope',
                'title', 'Cutting-Edge Products',
                'description', 'Sourcing certified, state-of-the-art technology from global leaders in medical equipment manufacturing.'
            ),
            JSON_OBJECT(
                'icon', 'Users',
                'title', 'End-to-End Support',
                'description', 'From installation and training to 24/7 technical support, we ensure your success at every step.'
            ),
            JSON_OBJECT(
                'icon', 'MapPin',
                'title', 'Nationwide Reach',
                'description', 'Proven capability in executing complex, multi-site projects across Ethiopia with local expertise.'
            ),
            JSON_OBJECT(
                'icon', 'Shield',
                'title', 'Regulatory Compliance',
                'description', 'Full regulatory and logistics management ensuring compliance with international and local standards.'
            )
        )
    ),
    2
);

-- 3. SOLUTIONS OVERVIEW SECTION
INSERT INTO cms_home_content (
    section_type,
    section_title,
    section_subtitle,
    section_description,
    content_data,
    display_order
) VALUES (
    'solutions_overview',
    'Comprehensive Medical Solutions',
    'From diagnostic equipment to complete hospital setups, we provide end-to-end medical technology solutions tailored to Ethiopian healthcare needs.',
    'Overview of all solution categories with detailed information',
    JSON_OBJECT(
        'solutions', JSON_ARRAY(
            JSON_OBJECT(
                'icon', 'Beaker',
                'title', 'Diagnostic & Laboratory Solutions',
                'description', 'Complete IVD systems including chemistry analyzers, hematology equipment, and laboratory infrastructure.',
                'image', '/diagnostic-&-laboratory-solutions.jpg',
                'products', JSON_ARRAY('Chemistry Analyzers', 'Hematology Systems', 'Microscopes', 'Lab Furniture')
            ),
            JSON_OBJECT(
                'icon', 'Scan',
                'title', 'Diagnostic Imaging & Radiology',
                'description', 'Advanced imaging solutions from digital X-ray to MRI systems with full installation support.',
                'image', '/diagnostic-imaging-&-radiology.jpg',
                'products', JSON_ARRAY('Digital X-Ray', 'Ultrasound', 'CT Scanners', 'MRI Systems')
            ),
            JSON_OBJECT(
                'icon', 'Heart',
                'title', 'Critical Care & Operation Theatre',
                'description', 'Life-saving equipment for ICUs and operating rooms including ventilators and surgical instruments.',
                'image', '/critical-care-&-operation-theatre.jpg',
                'products', JSON_ARRAY('Ventilators', 'Patient Monitors', 'Surgical Tables', 'Anesthesia Machines')
            ),
            JSON_OBJECT(
                'icon', 'Bed',
                'title', 'Hospital Furniture & Patient Care',
                'description', 'Ergonomic hospital furniture and patient care equipment designed for comfort and functionality.',
                'image', '/hospital-furniture-&-patient-care.jpg',
                'products', JSON_ARRAY('Hospital Beds', 'Patient Chairs', 'Medical Trolleys', 'Storage Solutions')
            ),
            JSON_OBJECT(
                'icon', 'Pill',
                'title', 'Medical Consumables & Reagents',
                'description', 'Quality reagents and medical consumables ensuring reliable test results and patient safety.',
                'image', 'https://images.unsplash.com/photo-1758101512269-660feabf64fd',
                'products', JSON_ARRAY('Lab Reagents', 'Test Kits', 'Disposables', 'Quality Controls')
            )
        )
    ),
    3
);

-- 4. FEATURED PROJECTS SECTION
INSERT INTO cms_home_content (
    section_type,
    section_title,
    section_subtitle,
    section_description,
    content_data,
    display_order
) VALUES (
    'featured_projects',
    'Proven Success in Critical Projects',
    'Our track record speaks for itself. From emergency deployments to comprehensive hospital modernizations, we deliver excellence when it matters most.',
    'Showcase of major successful projects with detailed information',
    JSON_OBJECT(
        'featuredProjects', JSON_ARRAY(
            JSON_OBJECT(
                'title', 'CDC-Tigray Regional Health System Strengthening Project',
                'client', 'Tigray Regional Health Bureau',
                'sponsor', 'CDC Ethiopia',
                'year', '2024',
                'image', 'https://images.unsplash.com/photo-1694787590597-ba49c7cdc2cc',
                'description', 'Complete turnkey project providing diagnostic equipment to restore critical healthcare services across post-conflict regions.',
                'stats', JSON_ARRAY(
                    JSON_OBJECT('icon', 'MapPin', 'label', '36 Health Facilities', 'value', 'Across Tigray'),
                    JSON_OBJECT('icon', 'Users', 'label', '45 IVD Units', 'value', 'Deployed'),
                    JSON_OBJECT('icon', 'Calendar', 'label', '40 Days', 'value', 'Timeline'),
                    JSON_OBJECT('icon', 'Award', 'label', '100+', 'value', 'Staff Trained')
                ),
                'achievements', JSON_ARRAY(
                    '45 IVD Units Successfully Deployed',
                    'Comprehensive Staff Training Program',
                    'Letter of Appreciation Received',
                    '24/7 Technical Support Established'
                )
            ),
            JSON_OBJECT(
                'title', 'FDRE Defense Referral Hospital Modernization',
                'client', 'Federal Defense Hospital',
                'sponsor', 'Ministry of Defense',
                'year', '2023',
                'image', '/fdre-defense-referral-hospital.jpg',
                'description', 'Comprehensive medical equipment upgrade including laboratory, imaging, and critical care solutions for Ethiopia\'s premier defense hospital.',
                'stats', JSON_ARRAY(
                    JSON_OBJECT('icon', 'MapPin', 'label', 'Major Hospital', 'value', 'Addis Ababa'),
                    JSON_OBJECT('icon', 'Users', 'label', 'Multiple Depts', 'value', 'Upgraded'),
                    JSON_OBJECT('icon', 'Calendar', 'label', '6 Months', 'value', 'Project Duration'),
                    JSON_OBJECT('icon', 'Award', 'label', 'Advanced', 'value', 'Technology')
                ),
                'achievements', JSON_ARRAY(
                    'Complete Laboratory Modernization',
                    'Advanced Imaging Solutions',
                    'Ongoing Maintenance Contract'
                )
            )
        )
    ),
    4
);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check all inserted data
SELECT 
    id,
    section_type,
    section_title,
    LEFT(section_subtitle, 50) as subtitle_preview,
    display_order,
    is_active,
    created_at
FROM cms_home_content 
ORDER BY display_order;

-- Check JSON data structure for each section
SELECT 
    section_type,
    JSON_PRETTY(content_data) as formatted_content
FROM cms_home_content 
WHERE section_type = 'hero';

-- Count items in each section
SELECT 
    section_type,
    CASE 
        WHEN section_type = 'hero' THEN JSON_LENGTH(JSON_EXTRACT(content_data, '$.heroStats'))
        WHEN section_type = 'value_proposition' THEN JSON_LENGTH(JSON_EXTRACT(content_data, '$.valuePropositions'))
        WHEN section_type = 'solutions_overview' THEN JSON_LENGTH(JSON_EXTRACT(content_data, '$.solutions'))
        WHEN section_type = 'featured_projects' THEN JSON_LENGTH(JSON_EXTRACT(content_data, '$.featuredProjects'))
        ELSE 0
    END as item_count
FROM cms_home_content;

-- =====================================================
-- SAMPLE UPDATE QUERIES
-- =====================================================

-- Update hero section title
-- UPDATE cms_home_content 
-- SET section_title = 'New Hero Title'
-- WHERE section_type = 'hero';

-- Update a specific hero statistic
-- UPDATE cms_home_content 
-- SET content_data = JSON_SET(
--     content_data, 
--     '$.heroStats[0].number', '50'
-- )
-- WHERE section_type = 'hero';

-- Add a new value proposition
-- UPDATE cms_home_content 
-- SET content_data = JSON_ARRAY_APPEND(
--     content_data, 
--     '$.valuePropositions',
--     JSON_OBJECT(
--         'icon', 'NewIcon',
--         'title', 'New Value Prop',
--         'description', 'New description'
--     )
-- )
-- WHERE section_type = 'value_proposition';

-- =====================================================
-- END OF SCRIPT
-- =====================================================
