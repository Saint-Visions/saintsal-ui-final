// PartnerTech.ai Chrome Extension - Icon Generator
// Creates all required icon sizes for Chrome Web Store

const fs = require("fs")

// SVG icon template with PartnerTech.ai branding
const iconSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#8B5CF6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#EC4899;stop-opacity:1" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge> 
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Background circle with gradient -->
  <circle cx="64" cy="64" r="58" fill="url(#grad1)" filter="url(#glow)"/>
  
  <!-- Inner circle for depth -->
  <circle cx="64" cy="64" r="45" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
  
  <!-- Rocket icon -->
  <g transform="translate(64,64) scale(1.5)">
    <!-- Rocket body -->
    <path d="M0,-20 L6,-10 L6,8 L3,12 L-3,12 L-6,8 L-6,-10 Z" fill="white" opacity="0.95"/>
    
    <!-- Rocket fins -->
    <path d="M-6,-5 L-10,-2 L-8,5 L-6,3 Z" fill="rgba(255,255,255,0.8)"/>
    <path d="M6,-5 L10,-2 L8,5 L6,3 Z" fill="rgba(255,255,255,0.8)"/>
    
    <!-- Rocket window -->
    <circle cx="0" cy="-12" r="3" fill="rgba(59,130,246,0.8)"/>
    
    <!-- Flame -->
    <path d="M-3,12 L0,18 L3,12 Z" fill="#F59E0B" opacity="0.9"/>
  </g>
  
  <!-- Patent text -->
  <text x="64" y="115" font-family="Arial" font-size="8" fill="white" text-anchor="middle" opacity="0.7">Patent #10,290,222</text>
</svg>
`

// Create the SVG file
fs.writeFileSync("icon.svg", iconSVG)

console.log("✅ Created icon.svg")
console.log(
  "📝 To generate PNG files, use an online SVG to PNG converter or ImageMagick:"
)
console.log("   convert icon.svg -resize 16x16 icon16.png")
console.log("   convert icon.svg -resize 32x32 icon32.png")
console.log("   convert icon.svg -resize 48x48 icon48.png")
console.log("   convert icon.svg -resize 128x128 icon128.png")
