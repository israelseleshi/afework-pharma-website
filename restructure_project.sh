#!/bin/bash
# This script automates the project restructuring process.

set -e # Exit immediately if a command exits with a non-zero status.

echo "--- Starting Project Restructuring ---"

# --- 1. Create New Directory Structure ---
echo "Step 1: Creating new directories..."
mkdir -p src/client src/server src/types
mkdir -p public/assets/images/team public/assets/images/solutions public/assets/images/general public/assets/logos

# --- 2. Move Source Files into src/client and src/server ---
echo "Step 2: Moving source files..."
# Move all top-level files and folders from src to src/client, except the server file
shopt -s extglob
git mv src/!(server.ts) src/client/ || echo "No client files to move from src root."

# Move the server file
git mv src/server.ts src/server/ || echo "server.ts not found in src."

# --- 3. Consolidate Public Assets ---
echo "Step 3: Consolidating public assets..."
# Move images from old folders into the new standardized structure
git mv critical_care_operation_theatre/* public/assets/images/solutions/ 2>/dev/null || echo "No images in critical_care_operation_theatre"
git mv diagnostic_laboratory_solutions/* public/assets/images/solutions/ 2>/dev/null || echo "No images in diagnostic_laboratory_solutions"
git mv mindray_radiology_pictures/* public/assets/images/solutions/ 2>/dev/null || echo "No images in mindray_radiology_pictures"

# --- 4. Clean Up Root Directory and Obsolete Folders ---
echo "Step 4: Cleaning up root directory..."
# Remove old, now-empty asset folders
git rm -r critical_care_operation_theatre diagnostic_laboratory_solutions mindray_radiology_pictures 2>/dev/null || echo "Old asset folders already removed."

# Remove obsolete files from the root directory
git rm AfeWork_Pharma_Lab_Solutions_Brochure.docx AfeWork_Pharma_Radiology_Brochure.docx 2>/dev/null || echo "Docx files not found."
git rm deploy.js create_brochure.py test-server.js setup-cms-database.js package.json.old vercel.json 2>/dev/null || echo "Obsolete scripts not found."

# --- 5. Update Configuration and Code Paths (CRITICAL STEP) ---
echo "Step 5: Updating configuration and code paths..."

# Update tsconfig.json paths to point to the new src/client directory
sed -i 's|"\./src/|"\./src/client/|g' tsconfig.json
sed -i 's|"src/|"src/client/|g' tsconfig.json

# Update vite.config.ts alias to point to the new src/client directory
sed -i "s|path.resolve(__dirname, './src')|path.resolve(__dirname, './src/client')|g" vite.config.ts

# Update image paths in constants file (this is a best-guess, may need manual review)
sed -i "s|'/assets/images/afewrork-team-image.jpg'|'/assets/images/team/placeholder.jpg'|g" src/client/constants/images.ts
sed -i "s|'/hospital_furniture_patient_care/hospital_furniture.png'|'/assets/images/solutions/hospital_furniture.png'|g" src/client/constants/images.ts
sed -i "s|'/medical_consumables_reagents/medical_consumables.png'|'/assets/images/solutions/medical_consumables.png'|g" src/client/constants/images.ts


echo "--- Restructuring Script Finished ---"
echo "Please review the changes and then commit them."
