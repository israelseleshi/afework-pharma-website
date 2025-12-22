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
