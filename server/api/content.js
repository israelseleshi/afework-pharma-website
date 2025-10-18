const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'mQ+3HMm2(g)q.R758J!;Lb',
  database: process.env.DB_NAME || 'afework_pharma_cms',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// GET /api/content/all - Fetch all content
router.get('/all', async (req, res) => {
  try {
    console.log('📋 Fetching all content from database...');
    
    const [rows] = await pool.execute(
      'SELECT section_key, content_type, content_value, updated_at FROM cms_content ORDER BY section_key'
    );
    
    console.log(`✅ Found ${rows.length} content items`);
    
    res.json({
      success: true,
      content: rows,
      message: `Retrieved ${rows.length} content items`
    });
    
  } catch (error) {
    console.error('❌ Error fetching content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content from database',
      error: error.message
    });
  }
});

// GET /api/content/:key - Fetch specific content by key
router.get('/:key', async (req, res) => {
  try {
    const { key } = req.params;
    console.log(`📋 Fetching content for key: ${key}`);
    
    const [rows] = await pool.execute(
      'SELECT section_key, content_type, content_value, updated_at FROM cms_content WHERE section_key = ?',
      [key]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Content not found for key: ${key}`
      });
    }
    
    res.json({
      success: true,
      content: rows[0],
      message: `Retrieved content for ${key}`
    });
    
  } catch (error) {
    console.error('❌ Error fetching content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content from database',
      error: error.message
    });
  }
});

// POST /api/content/batch - Update multiple content items
router.post('/batch', async (req, res) => {
  try {
    const { updates } = req.body;
    
    if (!updates || !Array.isArray(updates)) {
      return res.status(400).json({
        success: false,
        message: 'Updates array is required'
      });
    }
    
    console.log(`📝 Processing ${updates.length} content updates...`);
    
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      for (const update of updates) {
        const { section_key, content_type, content_value } = update;
        
        console.log(`📝 Updating ${section_key}: ${content_value?.substring(0, 50)}...`);
        
        // Insert or update content
        await connection.execute(`
          INSERT INTO cms_content (section_key, content_type, content_value, updated_at) 
          VALUES (?, ?, ?, NOW()) 
          ON DUPLICATE KEY UPDATE 
          content_value = VALUES(content_value), 
          updated_at = NOW()
        `, [section_key, content_type || 'text', content_value]);
      }
      
      await connection.commit();
      console.log('✅ All content updates committed successfully');
      
      res.json({
        success: true,
        message: `Successfully updated ${updates.length} content items`,
        updated_count: updates.length
      });
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
    
  } catch (error) {
    console.error('❌ Error updating content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update content in database',
      error: error.message
    });
  }
});

// POST /api/content/:key - Update single content item
router.post('/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const { content_value, content_type } = req.body;
    
    console.log(`📝 Updating single content: ${key}`);
    
    await pool.execute(`
      INSERT INTO cms_content (section_key, content_type, content_value, updated_at) 
      VALUES (?, ?, ?, NOW()) 
      ON DUPLICATE KEY UPDATE 
      content_value = VALUES(content_value), 
      updated_at = NOW()
    `, [key, content_type || 'text', content_value]);
    
    console.log(`✅ Successfully updated ${key}`);
    
    res.json({
      success: true,
      message: `Successfully updated ${key}`,
      section_key: key,
      content_value
    });
    
  } catch (error) {
    console.error('❌ Error updating content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update content in database',
      error: error.message
    });
  }
});

module.exports = router;
