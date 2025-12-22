import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'afeworcn_afework_admin',
    password: process.env.DB_PASS || process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'afeworcn_afework_content'
};

// Content data to seed
const contentData = [
    // Hero Section
    {
        section_key: 'hero_headline',
        content_type: 'text',
        content_value: 'Advanced Medical Solutions for a Healthier Ethiopia'
    },
    {
        section_key: 'hero_subheadline',
        content_type: 'text',
        content_value: 'Delivering state-of-the-art medical equipment backed by comprehensive technical support and training across the nation. Your trusted partner in healthcare technology advancement.'
    },
    {
        section_key: 'hero_stats',
        content_type: 'json',
        content_value: JSON.stringify([
            { number: 45, suffix: '+', label: 'IVD Units Deployed' },
            { number: 36, suffix: '+', label: 'Healthcare Facilities' },
            { number: 5, suffix: '+', label: 'Years Experience' }
        ])
    },

    // Value Propositions
    {
        section_key: 'value_propositions',
        content_type: 'json',
        content_value: JSON.stringify([
            {
                icon: 'Microscope',
                title: 'Cutting-Edge Products',
                description: 'Sourcing certified, state-of-the-art technology from global leaders in medical equipment manufacturing.'
            },
            {
                icon: 'Users',
                title: 'End-to-End Support',
                description: 'From installation and training to 24/7 technical support, we ensure your success at every step.'
            },
            {
                icon: 'MapPin',
                title: 'Nationwide Reach',
                description: 'Proven capability in executing complex, multi-site projects across Ethiopia with local expertise.'
            },
            {
                icon: 'Shield',
                title: 'Regulatory Compliance',
                description: 'Full regulatory and logistics management ensuring compliance with international and local standards.'
            }
        ])
    },

    // Solutions
    {
        section_key: 'solutions',
        content_type: 'json',
        content_value: JSON.stringify([
            {
                icon: 'Beaker',
                title: 'Diagnostic & Laboratory Solutions',
                description: 'Complete IVD systems including chemistry analyzers, hematology equipment, and laboratory infrastructure.',
                image: '/diagnostic-&-laboratory-solutions.jpg',
                products: ['Chemistry Analyzers', 'Hematology Systems', 'Microscopes', 'Lab Furniture']
            },
            {
                icon: 'Scan',
                title: 'Diagnostic Imaging & Radiology',
                description: 'Advanced imaging solutions from digital X-ray to MRI systems with full installation support.',
                image: '/diagnostic-imaging-&-radiology.jpg',
                products: ['Digital X-Ray', 'Ultrasound', 'CT Scanners', 'MRI Systems']
            },
            {
                icon: 'Heart',
                title: 'Critical Care & Operation Theatre',
                description: 'Life-saving equipment for ICUs and operating rooms including ventilators and surgical instruments.',
                image: '/critical-care-&-operation-theatre.jpg',
                products: ['Ventilators', 'Patient Monitors', 'Surgical Tables', 'Anesthesia Machines']
            },
            {
                icon: 'Bed',
                title: 'Hospital Furniture & Patient Care',
                description: 'Ergonomic hospital furniture and patient care equipment designed for comfort and functionality.',
                image: '/hospital_furniture_patient_care/hospital_furniture.png',
                products: ['Hospital Beds', 'Patient Chairs', 'Medical Trolleys', 'Storage Solutions']
            },
            {
                icon: 'Pill',
                title: 'Medical Consumables & Reagents',
                description: 'Quality reagents and medical consumables ensuring reliable test results and patient safety.',
                image: 'https://images.unsplash.com/photo-1758101512269-660feabf64fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb2Rlcm4lMjBtZWRpY2FsJTIwZXF1aXBtZW50JTIwaG9zcGl0YWwlMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc1OTgyOTAzNHww&ixlib=rb-4.1.0&q=80&w=1080',
                products: ['Lab Reagents', 'Test Kits', 'Disposables', 'Quality Controls']
            }
        ])
    },

    // Featured Projects
    {
        section_key: 'featured_projects',
        content_type: 'json',
        content_value: JSON.stringify([
            {
                title: 'CDC-Tigray Regional Health System Strengthening Project',
                client: 'Tigray Regional Health Bureau',
                sponsor: 'CDC Ethiopia',
                year: '2024',
                image: 'https://images.unsplash.com/photo-1694787590597-ba49c7cdc2cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYW4lMjBob3NwaXRhbCUyMG1lZGljYWwlMjBmYWNpbGl0eXxlbnwxfHx8fDE3NTk4MjkwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
                stats: [
                    { icon: 'MapPin', label: '36 Health Facilities', value: 'Across Tigray' },
                    { icon: 'Users', label: '45 IVD Units', value: 'Deployed' },
                    { icon: 'Calendar', label: '40 Days', value: 'Timeline' },
                    { icon: 'Award', label: '100+', value: 'Staff Trained' }
                ],
                description: 'Complete turnkey project providing diagnostic equipment to restore critical healthcare services across post-conflict regions.',
                achievements: [
                    '45 IVD Units Successfully Deployed',
                    'Comprehensive Staff Training Program',
                    'Letter of Appreciation Received',
                    '24/7 Technical Support Established'
                ]
            },
            {
                title: 'FDRE Defense Referral Hospital Modernization',
                client: 'Federal Defense Hospital',
                sponsor: 'Ministry of Defense',
                year: '2023',
                image: '/fdre-defense-referral-hospital.jpg',
                stats: [
                    { icon: 'MapPin', label: 'Major Hospital', value: 'Addis Ababa' },
                    { icon: 'Users', label: 'Multiple Depts', value: 'Upgraded' },
                    { icon: 'Calendar', label: '6 Months', value: 'Project Duration' },
                    { icon: 'Award', label: 'Advanced', value: 'Technology' }
                ],
                description: 'Comprehensive medical equipment upgrade including laboratory, imaging, and critical care solutions for Ethiopia\'s premier defense hospital.',
                achievements: [
                    'Complete Laboratory Modernization',
                    'Advanced Imaging Solutions',
                    'Ongoing Maintenance Contract'
                ]
            }
        ])
    },

    // About Page
    {
        section_key: 'mission',
        content_type: 'text',
        content_value: 'To transform healthcare delivery in Ethiopia by providing state-of-the-art medical equipment, comprehensive training, and unwavering technical support that empowers healthcare professionals to deliver exceptional patient care.'
    },
    {
        section_key: 'vision',
        content_type: 'text',
        content_value: 'To be the leading catalyst in Ethiopia\'s healthcare transformation, bridging the gap between global medical innovation and local healthcare needs, ensuring every Ethiopian has access to world-class medical care.'
    },
    {
        section_key: 'timeline',
        content_type: 'json',
        content_value: JSON.stringify([
            {
                year: '2019',
                title: 'Company Founded',
                description: 'Established by Afework Woldesilassie with ETB 300,000 initial capital',
                icon: 'Building',
                achievement: null
            },
            {
                year: '2020',
                title: 'Business Growth',
                description: 'Expanded operations and established key partnerships',
                icon: 'TrendingUp',
                achievement: null
            },
            {
                year: '2023',
                title: 'Major Milestone',
                description: 'Achieved annual turnover exceeding ETB 170 million',
                icon: 'Trophy',
                achievement: 'ETB 170M+ Annual Turnover'
            },
            {
                year: '2024',
                title: 'CDC-Tigray Project',
                description: 'Successfully deployed 45 IVD units across 36 health facilities',
                icon: 'CheckCircle',
                achievement: '45 IVD Units Deployed'
            }
        ])
    },
    {
        section_key: 'leadership_team',
        content_type: 'json',
        content_value: JSON.stringify([
            {
                name: 'Mr. Afework Woldesilassie',
                position: 'Founder & Chief Executive Officer',
                bio: 'Visionary leader with international investment acumen and deep healthcare expertise. Founded Afework Pharma in 2019 with a mission to transform Ethiopian healthcare through innovative medical technology solutions.',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hbiUyMGFmcmljYW58ZW58MXx8fHwxNzU5ODI5MzAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
                featured: true
            },
            {
                name: 'Dr. Meron Getachew',
                position: 'Technical Director',
                bio: 'Biomedical engineer with 10+ years of experience in medical equipment installation, maintenance, and quality assurance. Leads our technical team in ensuring optimal equipment performance across all deployments.',
                image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGVuZ2luZWVyJTIwYWZyaWNhbnxlbnwxfHx8fDE3NTk4MjkzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
                featured: false
            },
            {
                name: 'Ato Dawit Alemayehu',
                position: 'Operations Manager',
                bio: 'Healthcare logistics specialist with extensive experience in supply chain management and project coordination. Ensures seamless delivery and implementation of medical solutions across Ethiopian healthcare facilities.',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hbnxlbnwxfHx8fDE3NTk4MjkzMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
                featured: false
            }
        ])
    },
    {
        section_key: 'achievements',
        content_type: 'json',
        content_value: JSON.stringify([
            {
                icon: 'Award',
                title: '5+ Years Experience',
                description: 'Leading medical equipment distribution in Ethiopia'
            },
            {
                icon: 'Users',
                title: '45+ IVD Units',
                description: 'Recently deployed across 36 health facilities'
            },
            {
                icon: 'MapPin',
                title: 'Nationwide Coverage',
                description: 'Service centers in major Ethiopian cities'
            },
            {
                icon: 'Clock',
                title: '24/7 Support',
                description: 'Round-the-clock technical assistance'
            }
        ])
    },

    // Contact Information
    {
        section_key: 'contact_info',
        content_type: 'json',
        content_value: JSON.stringify({
            phone: ['+251 929 092 353', '+251 988 338 800'],
            email: ['afomphama13@gmail.com', 'afeworkwoldesilassie@gmail.com'],
            address: ['Arada Subcity, Eribekentu Bridge', 'Woreda 08, Building H.No, 1st Floor #102'],
            hours: ['Monday - Saturday: 8:30 AM - 5:00 PM', 'Sunday: Closed']
        })
    },
    {
        section_key: 'departments',
        content_type: 'json',
        content_value: JSON.stringify([
            {
                icon: 'ShoppingCart',
                title: 'Sales & Procurement',
                email: 'afomphama13@gmail.com',
                phone: '+251 929 092 353',
                description: 'Equipment quotes, procurement, and partnership inquiries'
            },
            {
                icon: 'Wrench',
                title: 'Technical Support',
                email: 'afomphama13@gmail.com',
                phone: '+251 988 118 800',
                description: 'Installation, maintenance, and technical assistance'
            },
            {
                icon: 'Users',
                title: 'Training & Education',
                email: 'afeworkwoldesilassie@gmail.com',
                phone: '+251 935 935 954',
                description: 'Equipment training and educational programs'
            }
        ])
    },
    {
        section_key: 'faq',
        content_type: 'json',
        content_value: JSON.stringify([
            {
                question: 'What is your typical response time for technical support?',
                answer: 'We provide 24/7 emergency support with response times within 4 hours for critical equipment. Regular support requests are handled within 24 hours.'
            },
            {
                question: 'Do you provide training for medical equipment?',
                answer: 'Yes, we offer comprehensive training programs for all equipment we supply, including hands-on training, certification courses, and ongoing education.'
            },
            {
                question: 'What areas in Ethiopia do you serve?',
                answer: 'We serve all regions of Ethiopia with our main office in Addis Ababa and service teams available for deployment nationwide.'
            },
            {
                question: 'Do you offer equipment financing options?',
                answer: 'Yes, we work with various financial institutions to provide flexible financing solutions tailored to healthcare facilities\' needs.'
            }
        ])
    }
];

async function seedDatabase() {
    let connection;
    
    try {
        console.log('🌱 Starting database seeding...');
        
        // Connect to database
        connection = await mysql.createConnection(dbConfig);
        console.log('✅ Connected to database');

        // Clear existing content
        await connection.execute('DELETE FROM site_content');
        console.log('🗑️ Cleared existing content');

        // Insert content data
        for (const content of contentData) {
            await connection.execute(
                'INSERT INTO site_content (section_key, content_type, content_value) VALUES (?, ?, ?)',
                [content.section_key, content.content_type, content.content_value]
            );
        }
        console.log(`📝 Inserted ${contentData.length} content sections`);

        // Create admin user if not exists
        const [existingUsers] = await connection.execute('SELECT COUNT(*) as count FROM admin_users');
        
        if (existingUsers[0].count === 0) {
            const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            
            await connection.execute(
                'INSERT INTO admin_users (username, password_hash) VALUES (?, ?)',
                ['admin', hashedPassword]
            );
            console.log('👤 Created admin user (username: admin, password: admin123)');
        } else {
            console.log('👤 Admin user already exists');
        }

        console.log('🎉 Database seeding completed successfully!');
        
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
            console.log('🔌 Database connection closed');
        }
    }
}

// Run the seeding
seedDatabase();

