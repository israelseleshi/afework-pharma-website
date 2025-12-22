#!/usr/bin/env node

/**
 * Security Testing Script for Afework Pharma Website
 * Automated security testing for production deployment
 */

import https from 'https';
import http from 'http';
import { URL } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const TEST_RESULTS = {
    passed: 0,
    failed: 0,
    total: 0,
    details: []
};

// Helper function to make HTTP requests
function makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const isHttps = urlObj.protocol === 'https:';
        const client = isHttps ? https : http;
        
        const requestOptions = {
            hostname: urlObj.hostname,
            port: urlObj.port || (isHttps ? 443 : 80),
            path: urlObj.pathname + urlObj.search,
            method: options.method || 'GET',
            headers: {
                'User-Agent': 'Security-Test-Script/1.0',
                ...options.headers
            },
            timeout: 10000
        };
        
        const req = client.request(requestOptions, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({
                statusCode: res.statusCode,
                headers: res.headers,
                data: data
            }));
        });
        
        req.on('error', reject);
        req.on('timeout', () => reject(new Error('Request timeout')));
        
        if (options.body) {
            req.write(options.body);
        }
        
        req.end();
    });
}

// Test function wrapper
async function runTest(testName, testFunction) {
    TEST_RESULTS.total++;
    console.log(`\n🧪 Testing: ${testName}`);
    
    try {
        await testFunction();
        TEST_RESULTS.passed++;
        TEST_RESULTS.details.push({ test: testName, status: 'PASS', message: 'Test passed' });
        console.log(`✅ PASS: ${testName}`);
    } catch (error) {
        TEST_RESULTS.failed++;
        TEST_RESULTS.details.push({ test: testName, status: 'FAIL', message: error.message });
        console.log(`❌ FAIL: ${testName} - ${error.message}`);
    }
}

// Security Tests
async function testServerPing() {
    const response = await makeRequest(`${BASE_URL}/api/ping`);
    if (response.statusCode !== 200) {
        throw new Error(`Server not responding. Status: ${response.statusCode}`);
    }
    
    const data = JSON.parse(response.data);
    if (!data.success) {
        throw new Error('Server ping failed');
    }
}

async function testDatabaseConnection() {
    const response = await makeRequest(`${BASE_URL}/api/test-db`);
    if (response.statusCode !== 200) {
        throw new Error(`Database test failed. Status: ${response.statusCode}`);
    }
    
    const data = JSON.parse(response.data);
    if (!data.success) {
        throw new Error('Database connection failed');
    }
}

async function testSecurityHeaders() {
    const response = await makeRequest(`${BASE_URL}/`);
    
    const requiredHeaders = [
        'x-content-type-options',
        'x-frame-options',
        'x-xss-protection'
    ];
    
    for (const header of requiredHeaders) {
        if (!response.headers[header]) {
            throw new Error(`Missing security header: ${header}`);
        }
    }
}

async function testRateLimiting() {
    // Test login rate limiting
    const loginUrl = `${BASE_URL}/api/admin/login`;
    const loginData = JSON.stringify({
        username: 'test',
        password: 'test'
    });
    
    let successCount = 0;
    const maxAttempts = 7; // Try to exceed the 5-attempt limit
    
    for (let i = 0; i < maxAttempts; i++) {
        try {
            const response = await makeRequest(loginUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: loginData
            });
            
            if (response.statusCode === 200) {
                successCount++;
            }
        } catch (error) {
            // Expected to fail after rate limit
        }
    }
    
    if (successCount > 5) {
        throw new Error('Rate limiting not working properly');
    }
}

async function testInputValidation() {
    // Test XSS attempt
    const xssPayload = '<script>alert("xss")</script>';
    const response = await makeRequest(`${BASE_URL}/send-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: xssPayload,
            email: 'test@test.com',
            message: 'test message'
        })
    });
    
    if (response.statusCode === 200) {
        const data = JSON.parse(response.data);
        if (data.success && data.message.includes(xssPayload)) {
            throw new Error('XSS payload not sanitized');
        }
    }
}

async function testAuthenticationRequired() {
    // Test protected endpoint without token
    const response = await makeRequest(`${BASE_URL}/api/content/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates: [] })
    });
    
    if (response.statusCode !== 401) {
        throw new Error('Protected endpoint accessible without authentication');
    }
}

async function testFileUploadSecurity() {
    // Test file upload with malicious file
    const maliciousFile = 'malicious.exe';
    const response = await makeRequest(`${BASE_URL}/api/media/upload`, {
        method: 'POST',
        headers: { 'Authorization': 'Bearer invalid-token' },
        body: JSON.stringify({
            filename: maliciousFile,
            mimetype: 'application/x-executable'
        })
    });
    
    if (response.statusCode === 200) {
        throw new Error('Malicious file upload not blocked');
    }
}

async function testCORSConfiguration() {
    const response = await makeRequest(`${BASE_URL}/api/ping`, {
        headers: {
            'Origin': 'https://malicious-site.com'
        }
    });
    
    const corsHeader = response.headers['access-control-allow-origin'];
    if (corsHeader === '*') {
        throw new Error('CORS configured too permissively');
    }
}

async function testSQLInjection() {
    const sqlPayload = "'; DROP TABLE admin_users; --";
    const response = await makeRequest(`${BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: sqlPayload,
            password: 'test'
        })
    });
    
    // Should not crash the server
    if (response.statusCode >= 500) {
        throw new Error('SQL injection vulnerability detected');
    }
}

async function testErrorHandling() {
    // Test with invalid JSON
    const response = await makeRequest(`${BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid json'
    });
    
    if (response.statusCode >= 500) {
        throw new Error('Server error on invalid input');
    }
}

async function testContentSecurityPolicy() {
    const response = await makeRequest(`${BASE_URL}/`);
    const cspHeader = response.headers['content-security-policy'];
    
    if (!cspHeader) {
        throw new Error('Content Security Policy header missing');
    }
    
    if (!cspHeader.includes('default-src')) {
        throw new Error('CSP header incomplete');
    }
}

// Main test runner
async function runSecurityTests() {
    console.log('🔒 Afework Pharma Security Testing');
    console.log('==================================');
    console.log(`🌐 Testing against: ${BASE_URL}`);
    console.log(`⏰ Started at: ${new Date().toISOString()}\n`);
    
    // Core functionality tests
    await runTest('Server Ping', testServerPing);
    await runTest('Database Connection', testDatabaseConnection);
    
    // Security tests
    await runTest('Security Headers', testSecurityHeaders);
    await runTest('Rate Limiting', testRateLimiting);
    await runTest('Input Validation', testInputValidation);
    await runTest('Authentication Required', testAuthenticationRequired);
    await runTest('File Upload Security', testFileUploadSecurity);
    await runTest('CORS Configuration', testCORSConfiguration);
    await runTest('SQL Injection Protection', testSQLInjection);
    await runTest('Error Handling', testErrorHandling);
    await runTest('Content Security Policy', testContentSecurityPolicy);
    
    // Print results
    console.log('\n📊 Security Test Results');
    console.log('========================');
    console.log(`✅ Passed: ${TEST_RESULTS.passed}`);
    console.log(`❌ Failed: ${TEST_RESULTS.failed}`);
    console.log(`📈 Total: ${TEST_RESULTS.total}`);
    console.log(`🎯 Success Rate: ${((TEST_RESULTS.passed / TEST_RESULTS.total) * 100).toFixed(1)}%`);
    
    if (TEST_RESULTS.failed > 0) {
        console.log('\n❌ Failed Tests:');
        TEST_RESULTS.details
            .filter(test => test.status === 'FAIL')
            .forEach(test => {
                console.log(`   • ${test.test}: ${test.message}`);
            });
    }
    
    console.log(`\n⏰ Completed at: ${new Date().toISOString()}`);
    
    // Exit with error code if tests failed
    if (TEST_RESULTS.failed > 0) {
        process.exit(1);
    }
}

// Run tests
runSecurityTests().catch(error => {
    console.error('❌ Security test runner failed:', error.message);
    process.exit(1);
});
