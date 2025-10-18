/**
 * API Configuration for Development and Production
 */

// Determine if we're in production
const isProduction = process.env.NODE_ENV === 'production' || window.location.hostname !== 'localhost';

// API endpoints
export const API_ENDPOINTS = {
  // CMS API - uses PHP in production, Node.js simulation in development
  CMS: isProduction ? '/cms-api.php' : '/api/cms',
  
  // Contact API - uses PHP in production
  CONTACT: '/contact-directadmin-fix.php',
  
  // Content API - uses PHP in production, Node.js in development
  CONTENT: isProduction ? '/api/content.php' : '/api/cms'
};

// API configuration
export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// Helper function to get the correct API endpoint
export const getApiEndpoint = (endpoint: keyof typeof API_ENDPOINTS): string => {
  return API_ENDPOINTS[endpoint];
};

console.log('🔧 API Configuration:', {
  environment: isProduction ? 'production' : 'development',
  hostname: window.location.hostname,
  cmsEndpoint: API_ENDPOINTS.CMS
});
