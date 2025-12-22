#!/bin/bash
# Safer restructuring script that checks for existence before moving files.

set -e
echo "--- Starting Project Restructuring (V2) ---"

# --- 1. Create New Directory Structure ---
echo "Step 1: Ensuring new directories exist..."
mkdir -p src/client src/server src/types
mkdir -p public/assets/images/team public/assets/images/solutions public/assets/images/general public/assets/logos

# --- 2. Move Source Files ---
echo "Step 2: Moving source files..."
# Move client files from src/ to src/client/
for item in src/*; do
    if [ "$(basename "$item")" != "server.ts" ] && [ -e "$item" ]; then
        git mv "$item" src/client/
    fi
done

# Move server file
if [ -f "src/server.ts" ]; then
    git mv src/server.ts src/server/
fi

# --- 3. Consolidate Assets ---
echo "Step 3: Consolidating assets..."
if [ -d "critical_care_operation_theatre" ]; then
    git mv critical_care_operation_theatre/* public/assets/images/solutions/
    git rm -r critical_care_operation_theatre
fi
if [ -d "diagnostic_laboratory_solutions" ]; then
    git mv diagnostic_laboratory_solutions/* public/assets/images/solutions/
    git rm -r diagnostic_laboratory_solutions
fi
if [ -d "mindray_radiology_pictures" ]; then
    git mv mindray_radiology_pictures/* public/assets/images/solutions/
    git rm -r mindray_radiology_pictures
fi

# --- 4. Clean Root Directory ---
echo "Step 4: Cleaning root directory..."
git rm -f AfeWork_Pharma_Lab_Solutions_Brochure.docx AfeWork_Pharma_Radiology_Brochure.docx 2>/dev/null || true
git rm -f deploy.js create_brochure.py test-server.js setup-cms-database.js package.json.old vercel.json 2>/dev/null || true

# --- 5. Update Config Paths ---
echo "Step 5: Updating configuration paths..."
# Update tsconfig.json - Check if paths exist before replacing
if grep -q '"\./src/' tsconfig.json; then
    sed -i 's|"\./src/|"\./src/client/|g' tsconfig.json
fi

# Update vite.config.ts
if grep -q "path.resolve(__dirname, './src')" vite.config.ts; then
    sed -i "s|path.resolve(__dirname, './src')|path.resolve(__dirname, './src/client')|g" vite.config.ts
fi

# Update image constants
sed -i "s|'/assets/images/afewrork-team-image.jpg'|'/assets/images/team/placeholder.jpg'|g" src/client/constants/images.ts
sed -i "s|'/hospital_furniture_patient_care/hospital_furniture.png'|'/assets/images/solutions/hospital_furniture.png'|g" src/client/constants/images.ts
sed -i "s|'/medical_consumables_reagents/medical_consumables.png'|'/assets/images/solutions/medical_consumables.png'|g" src/client/constants/images.ts

echo "--- Restructuring Script V2 Finished ---"
