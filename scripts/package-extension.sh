#!/bin/bash

# 🚀 PartnerTech.ai Chrome Extension Packaging Script
# Patent #10,290,222 Protected Technology

echo "🚀 Packaging PartnerTech.ai Chrome Extension..."

# Create output directory
mkdir -p chrome-extension-dist

# Remove old zip if exists
rm -f chrome-extension-dist/partnertech-extension.zip

# Check if source files exist
if [ ! -f "code/chrome-extension/manifest.json" ]; then
    echo "❌ Error: manifest.json not found in code/chrome-extension/"
    exit 1
fi

# Create icons directory and placeholder icons if they don't exist
mkdir -p code/chrome-extension/icons

# Create a simple SVG icon if it doesn't exist
if [ ! -f "code/chrome-extension/icons/icon.svg" ]; then
    echo "📦 Creating placeholder icon..."
    cat > code/chrome-extension/icons/icon.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="128" height="128" rx="20" fill="url(#grad)"/>
  <text x="64" y="75" font-family="Arial" font-size="60" fill="white" text-anchor="middle">🚀</text>
</svg>
EOF
fi

echo "📦 Bundling extension files..."

# Change to the chrome extension directory and zip from there
cd code/chrome-extension

# Create the zip with all required files
zip -r ../../chrome-extension-dist/partnertech-extension.zip \
    manifest.json \
    background.js \
    content-script.js \
    popup.html \
    popup.js \
    styles.css \
    icons/ \
    -x "*.sh" "*.md" "README.md" "store-listing.md" "package.sh"

# Go back to root
cd ../..

# Check if zip was created successfully
if [ -f "chrome-extension-dist/partnertech-extension.zip" ]; then
    echo "✅ Extension packaged successfully!"
    echo "📁 File: chrome-extension-dist/partnertech-extension.zip"
    echo "�� Size: $(du -h chrome-extension-dist/partnertech-extension.zip | cut -f1)"
    echo ""
    echo "🚀 READY FOR CHROME WEB STORE!"
    echo "1. Go to Chrome Developer Dashboard"
    echo "2. Click 'New Item'"
    echo "3. Upload: chrome-extension-dist/partnertech-extension.zip"
    echo "4. Fill in store listing details"
    echo "5. Submit for review"
    echo ""
    echo "🔥 Patent #10,290,222 Protected Technology - Ready to Launch!"
else
    echo "❌ Error: Failed to create extension package"
    exit 1
fi
