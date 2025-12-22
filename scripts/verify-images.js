#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Import the image constants (we'll read the file and parse it)
const imagesConstantsPath = path.join(__dirname, '../src/constants/images.ts');
const publicPath = path.join(__dirname, '../public');

console.log('🔍 Verifying image files exist...\n');

// Key image paths to check
const imagesToCheck = [
  // Solution images
  '/assets/images/solutions/diagnostic-laboratory.webp',
  '/assets/images/solutions/imaging-radiology.webp',
  '/assets/images/solutions/critical-care.webp',
  '/assets/images/solutions/hospital-furniture.webp',
  '/medical_consumables_reagents/medical_consumables.png',
  
  // Product images
  '/assets/images/products/mindray/mindray-bs-240-pro-chemistry-analyzer.png',
  '/assets/images/products/mindray/mindray-bc-5150-hermatology-analyzer.png',
  '/assets/images/products/mindray/mindray-dc-70-ultrasound-system.jpg',
  '/assets/images/products/mindray/mindray-dp-50-digital-x-ray-system.jpg',
  '/assets/images/products/mindray/mindray-benevent-a3-ventilator.png',
  '/assets/images/products/mindray/mindray-beneheart-r3-patient-monitor.jpeg',
  '/assets/images/products/mindray/mindray-cl-900i-chemistry-analyzer.jpg',
  '/assets/images/products/mindray/mindray-resona-7-ultrasound-system.png',
  '/assets/images/products/mindray/mindray-sv300-ventilator.png',
  
  // General images
  '/assets/images/medical-equipments.png',
  '/assets/images/general/stethoscope.webp',
  '/assets/images/general/x-ray-image.webp',
  
  // Logos
  '/assets/logos/afework-pharma-logo.png',
  '/assets/logos/certifications/fda-approved.svg',
  '/assets/logos/certifications/iso-certified.svg'
];

let existingCount = 0;
let missingCount = 0;

console.log('📋 Checking image files:\n');

imagesToCheck.forEach(imagePath => {
  const fullPath = path.join(publicPath, imagePath);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    const stats = fs.statSync(fullPath);
    console.log(`✅ ${imagePath} (${Math.round(stats.size / 1024)}KB)`);
    existingCount++;
  } else {
    console.log(`❌ ${imagePath} - MISSING`);
    missingCount++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`✅ Found: ${existingCount} images`);
console.log(`❌ Missing: ${missingCount} images`);

if (missingCount > 0) {
  console.log(`\n⚠️  Missing images need to be:`);
  console.log(`   1. Downloaded from external sources`);
  console.log(`   2. Converted to appropriate formats`);
  console.log(`   3. Placed in the correct directories`);
}

console.log(`\n🔍 Checking folder structure:`);

const foldersToCheck = [
  'public/assets/images/hero',
  'public/assets/images/solutions',
  'public/assets/images/products/mindray',
  'public/assets/images/team',
  'public/assets/images/projects',
  'public/assets/images/about',
  'public/assets/images/general',
  'public/assets/logos/certifications',
  'public/assets/logos/partners'
];

foldersToCheck.forEach(folder => {
  const fullPath = path.join(__dirname, '..', folder);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    const files = fs.readdirSync(fullPath);
    console.log(`✅ ${folder} (${files.length} files)`);
  } else {
    console.log(`❌ ${folder} - MISSING FOLDER`);
  }
});

console.log(`\n✨ Verification complete!`);
