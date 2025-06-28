#!/bin/bash

# PartnerTech.ai Chrome Extension Package Script
# Patent #10,290,222 Protected Technology

echo "🚀 Packaging PartnerTech.ai Chrome Extension..."

# Create icons directory if it doesn't exist
mkdir -p icons

# Create placeholder icons (you'll replace with actual branded icons)
echo "📦 Creating extension icons..."

# Note: In production, replace these with actual PartnerTech.ai branded icons
# For now, creating placeholder SVGs that can be converted to PNG

cat > icons/icon.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="128" height="128" rx="20" fill="url(#grad)"/>
  <text x="64" y="75" font-family="Arial" font-size="60" fill="white" text-anchor="middle">🚀</text>
  <text x="64" y="110" font-family="Arial" font-size="12" fill="white" text-anchor="middle" opacity="0.8">PartnerTech</text>
</svg>
EOF

echo "✅ Package contents:"
echo "├── manifest.json"
echo "├── background.js" 
echo "├── content-script.js"
echo "├── popup.html"
echo "├── popup.js"
echo "├── styles.css"
echo "├── icons/"
echo "└── README.md"

# Create the zip file
echo "📦 Creating extension package..."
zip -r partnertech_extension.zip . -x "*.sh" "*.md" "package.sh"

echo "🎉 Extension packaged successfully!"
echo "📁 File: partnertech_extension.zip"
echo ""
echo "🔥 NEXT STEPS:"
echo "1. Go to Chrome Web Store Developer Dashboard"
echo "2. Click 'New Item'"
echo "3. Upload partnertech_extension.zip"
echo "4. Fill in store listing details"
echo "5. Submit for review (24-48 hours)"
echo ""
echo "🚀 Ready to launch! Patent #10,290,222 protected technology!"
