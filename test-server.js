// Simple test to check if server is responding
import fetch from 'node-fetch';

async function testServer() {
    try {
        console.log('🧪 Testing server connection...');
        
        // Test basic server ping
        const pingResponse = await fetch('http://localhost:3000/api/ping');
        console.log('📡 Ping response status:', pingResponse.status);
        
        // Test CMS endpoint
        const cmsResponse = await fetch('http://localhost:3000/api/cms/home-content.php');
        console.log('🏠 CMS response status:', cmsResponse.status);
        
        if (cmsResponse.ok) {
            const data = await cmsResponse.json();
            console.log('✅ CMS data received:', data.success ? 'Success' : 'Failed');
            if (data.data && data.data.length > 0) {
                console.log('📊 Hero content title:', data.data.find(item => item.section_type === 'hero')?.section_title);
            }
        } else {
            console.log('❌ CMS response failed');
        }
        
    } catch (error) {
        console.error('❌ Server test failed:', error.message);
    }
}

// Run test after a short delay
setTimeout(testServer, 2000);
