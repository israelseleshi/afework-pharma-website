#!/usr/bin/env node

/**
 * Database Backup Script for Afework Pharma Website
 * Creates automated backups of the MySQL database
 */

import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'afeworcn_afework_admin',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'afeworcn_afework_content'
};

const backupDir = process.env.BACKUP_DIR || path.join(__dirname, '..', 'backups');

// Create backup directory if it doesn't exist
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
    console.log(`📁 Created backup directory: ${backupDir}`);
}

async function createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `afework-pharma-backup-${timestamp}.sql`;
    const backupFilePath = path.join(backupDir, backupFileName);
    
    console.log('🔄 Starting database backup...');
    console.log(`📅 Timestamp: ${new Date().toISOString()}`);
    console.log(`📁 Backup file: ${backupFileName}`);
    
    try {
        // Test database connection
        const connection = await mysql.createConnection(dbConfig);
        console.log('✅ Database connected successfully');
        
        // Get database information
        const [tables] = await connection.execute('SHOW TABLES');
        console.log(`📊 Found ${tables.length} tables to backup`);
        
        // Create backup content
        let backupContent = '';
        backupContent += `-- Afework Pharma Database Backup\n`;
        backupContent += `-- Created: ${new Date().toISOString()}\n`;
        backupContent += `-- Database: ${dbConfig.database}\n\n`;
        backupContent += `SET FOREIGN_KEY_CHECKS=0;\n\n`;
        
        // Backup each table
        for (const table of tables) {
            const tableName = Object.values(table)[0];
            console.log(`🔄 Backing up table: ${tableName}`);
            
            // Get table structure
            const [createTable] = await connection.execute(`SHOW CREATE TABLE \`${tableName}\``);
            backupContent += `-- Table structure for table \`${tableName}\`\n`;
            backupContent += `DROP TABLE IF EXISTS \`${tableName}\`;\n`;
            backupContent += `${createTable[0]['Create Table']};\n\n`;
            
            // Get table data
            const [rows] = await connection.execute(`SELECT * FROM \`${tableName}\``);
            
            if (rows.length > 0) {
                backupContent += `-- Data for table \`${tableName}\`\n`;
                
                // Get column names
                const [columns] = await connection.execute(`DESCRIBE \`${tableName}\``);
                const columnNames = columns.map(col => `\`${col.Field}\``).join(', ');
                
                // Insert data
                for (const row of rows) {
                    const values = Object.values(row).map(value => {
                        if (value === null) return 'NULL';
                        if (typeof value === 'string') {
                            return `'${value.replace(/'/g, "''")}'`;
                        }
                        return value;
                    }).join(', ');
                    
                    backupContent += `INSERT INTO \`${tableName}\` (${columnNames}) VALUES (${values});\n`;
                }
                backupContent += `\n`;
            }
        }
        
        backupContent += `SET FOREIGN_KEY_CHECKS=1;\n`;
        
        // Write backup file
        fs.writeFileSync(backupFilePath, backupContent, 'utf8');
        
        // Get file size
        const stats = fs.statSync(backupFilePath);
        const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
        
        console.log('✅ Database backup completed successfully!');
        console.log(`📁 Backup file: ${backupFilePath}`);
        console.log(`📊 File size: ${fileSizeInMB} MB`);
        console.log(`📅 Created: ${new Date().toISOString()}`);
        
        // Clean up old backups (keep last 10)
        await cleanupOldBackups();
        
        await connection.end();
        
    } catch (error) {
        console.error('❌ Backup failed:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.error('💡 Make sure your MySQL server is running');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('💡 Check your database credentials');
        }
        
        process.exit(1);
    }
}

async function cleanupOldBackups() {
    try {
        const files = fs.readdirSync(backupDir)
            .filter(file => file.startsWith('afework-pharma-backup-') && file.endsWith('.sql'))
            .map(file => ({
                name: file,
                path: path.join(backupDir, file),
                time: fs.statSync(path.join(backupDir, file)).mtime
            }))
            .sort((a, b) => b.time - a.time);
        
        // Keep only the last 10 backups
        if (files.length > 10) {
            const filesToDelete = files.slice(10);
            console.log(`🧹 Cleaning up ${filesToDelete.length} old backup(s)...`);
            
            for (const file of filesToDelete) {
                fs.unlinkSync(file.path);
                console.log(`🗑️  Deleted: ${file.name}`);
            }
        }
        
    } catch (error) {
        console.warn('⚠️  Could not clean up old backups:', error.message);
    }
}

async function listBackups() {
    try {
        const files = fs.readdirSync(backupDir)
            .filter(file => file.startsWith('afework-pharma-backup-') && file.endsWith('.sql'))
            .map(file => {
                const filePath = path.join(backupDir, file);
                const stats = fs.statSync(filePath);
                return {
                    name: file,
                    size: (stats.size / (1024 * 1024)).toFixed(2),
                    created: stats.birthtime.toISOString(),
                    modified: stats.mtime.toISOString()
                };
            })
            .sort((a, b) => new Date(b.created) - new Date(a.created));
        
        console.log('📋 Available Backups:');
        console.log('====================');
        
        if (files.length === 0) {
            console.log('No backups found.');
            return;
        }
        
        files.forEach((file, index) => {
            console.log(`${index + 1}. ${file.name}`);
            console.log(`   Size: ${file.size} MB`);
            console.log(`   Created: ${file.created}`);
            console.log('');
        });
        
    } catch (error) {
        console.error('❌ Could not list backups:', error.message);
    }
}

// Main execution
const command = process.argv[2];

switch (command) {
    case 'list':
        listBackups();
        break;
    case 'cleanup':
        cleanupOldBackups();
        break;
    default:
        createBackup();
        break;
}

// Usage examples:
// node scripts/backup-db.js          # Create backup
// node scripts/backup-db.js list    # List existing backups
// node scripts/backup-db.js cleanup # Clean up old backups
