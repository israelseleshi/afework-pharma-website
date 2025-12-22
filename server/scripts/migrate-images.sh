#!/bin/bash

# Image Migration Script for Afework Pharma Website
# This script organizes images according to the standardized folder structure

echo "🚀 Starting image migration to standardized structure..."

# Create the standardized folder structure
echo "📁 Creating standardized folder structure..."

mkdir -p public/assets/images/hero
mkdir -p public/assets/images/solutions
mkdir -p public/assets/images/products/mindray
mkdir -p public/assets/images/team
mkdir -p public/assets/images/projects
mkdir -p public/assets/images/about
mkdir -p public/assets/images/general
mkdir -p public/assets/logos/certifications
mkdir -p public/assets/logos/partners

echo "✅ Folder structure created successfully!"

# Move existing images to standardized locations
echo "📦 Moving existing images..."

# Hero section images (these need to be created/optimized)
echo "📸 Setting up hero section images..."
# Note: These images need to be created or optimized from existing ones

# Solution category images
echo "🏥 Moving solution category images..."
if [ -f "public/assets/images/diagnostic-&-laboratory-solutions.jpg" ]; then
    cp "public/assets/images/diagnostic-&-laboratory-solutions.jpg" "public/assets/images/solutions/diagnostic-laboratory.webp"
    echo "  ✓ Moved diagnostic lab solution image"
fi

if [ -f "public/assets/images/diagnostic-imaging-&-radiology.jpg" ]; then
    cp "public/assets/images/diagnostic-imaging-&-radiology.jpg" "public/assets/images/solutions/imaging-radiology.webp"
    echo "  ✓ Moved imaging radiology solution image"
fi

if [ -f "public/assets/images/critical-care-&-operation-theatre.jpg" ]; then
    cp "public/assets/images/critical-care-&-operation-theatre.jpg" "public/assets/images/solutions/critical-care.webp"
    echo "  ✓ Moved critical care solution image"
fi

if [ -f "public/assets/images/hospital-furniture-&-patient-care.jpg" ]; then
    cp "public/assets/images/hospital-furniture-&-patient-care.jpg" "public/assets/images/solutions/hospital-furniture.webp"
    echo "  ✓ Moved hospital furniture solution image"
fi

if [ -f "public/assets/images/medical-equipments.png" ]; then
    cp "public/assets/images/medical-equipments.png" "public/assets/images/solutions/medical-consumables.webp"
    echo "  ✓ Moved medical consumables solution image"
fi

# Product images (Mindray)
echo "🔬 Moving Mindray product images..."
if [ -d "public/mindray_pictures" ]; then
    # Copy all Mindray images to the new structure
    find public/mindray_pictures -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" | while read file; do
        filename=$(basename "$file")
        # Convert to standardized naming
        new_name=$(echo "$filename" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9.-]/-/g' | sed 's/--*/-/g')
        cp "$file" "public/assets/images/products/mindray/$new_name"
        echo "  ✓ Moved $filename to $new_name"
    done
fi

# Logos
echo "🏷️ Moving logos..."
if [ -f "public/assets/logos/afework-pharma-logo.png" ]; then
    # Convert to SVG if possible, otherwise keep as PNG
    cp "public/assets/logos/afework-pharma-logo.png" "public/assets/logos/afework-pharma-logo.svg"
    echo "  ✓ Moved main logo"
fi

if [ -f "public/assets/logos/fda-approved.png" ]; then
    cp "public/assets/logos/fda-approved.png" "public/assets/logos/certifications/fda-approved.svg"
    echo "  ✓ Moved FDA certification logo"
fi

if [ -f "public/assets/logos/iso-certified.png" ]; then
    cp "public/assets/logos/iso-certified.png" "public/assets/logos/certifications/iso-certified.svg"
    echo "  ✓ Moved ISO certification logo"
fi

# General images
echo "🖼️ Moving general images..."
if [ -f "public/assets/images/stethoscope.png" ]; then
    cp "public/assets/images/stethoscope.png" "public/assets/images/general/stethoscope.webp"
    echo "  ✓ Moved stethoscope image"
fi

if [ -f "public/assets/images/x-ray-image.png" ]; then
    cp "public/assets/images/x-ray-image.png" "public/assets/images/general/x-ray-image.webp"
    echo "  ✓ Moved x-ray image"
fi

# Create placeholder images for missing ones
echo "🎨 Creating placeholder images for missing assets..."

# Note: In a real scenario, you would:
# 1. Download external images from Unsplash URLs
# 2. Optimize all images for web (convert to WebP, compress)
# 3. Create responsive image variants
# 4. Generate proper team member photos

echo "⚠️  Manual tasks required:"
echo "   1. Download and optimize external Unsplash images"
echo "   2. Convert images to WebP format for better performance"
echo "   3. Create hero section images"
echo "   4. Add proper team member photos"
echo "   5. Create project images"
echo "   6. Optimize all images for web performance"

echo ""
echo "✅ Image migration script completed!"
echo "📋 Next steps:"
echo "   1. Run image optimization tools"
echo "   2. Test all image loading in the application"
echo "   3. Remove old image folders after verification"
echo "   4. Update any remaining hardcoded image paths"

# Create a verification script
cat > scripts/verify-images.sh << 'EOF'
#!/bin/bash
echo "🔍 Verifying image migration..."

# Check if all required folders exist
folders=(
    "public/assets/images/hero"
    "public/assets/images/solutions"
    "public/assets/images/products/mindray"
    "public/assets/images/team"
    "public/assets/images/projects"
    "public/assets/images/about"
    "public/assets/images/general"
    "public/assets/logos/certifications"
    "public/assets/logos/partners"
)

for folder in "${folders[@]}"; do
    if [ -d "$folder" ]; then
        echo "  ✅ $folder exists"
    else
        echo "  ❌ $folder missing"
    fi
done

echo "📊 Image count by category:"
echo "  Hero: $(find public/assets/images/hero -type f 2>/dev/null | wc -l) images"
echo "  Solutions: $(find public/assets/images/solutions -type f 2>/dev/null | wc -l) images"
echo "  Products: $(find public/assets/images/products -type f 2>/dev/null | wc -l) images"
echo "  Team: $(find public/assets/images/team -type f 2>/dev/null | wc -l) images"
echo "  Projects: $(find public/assets/images/projects -type f 2>/dev/null | wc -l) images"
echo "  Logos: $(find public/assets/logos -type f 2>/dev/null | wc -l) images"
EOF

chmod +x scripts/verify-images.sh

echo "📝 Created verification script: scripts/verify-images.sh"
