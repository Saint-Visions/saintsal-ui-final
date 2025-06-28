// PartnerTech.ai Chrome Extension Content Script
// Patent #10,290,222 Protected Technology

console.log("🚀 PartnerTech.ai Content Script Loaded")

// Avoid multiple injections
if (window.partnerTechAiLoaded) {
  console.log("PartnerTech.ai already loaded")
} else {
  window.partnerTechAiLoaded = true
  initializePartnerTechAi()
}

function initializePartnerTechAi() {
  console.log("🔧 Initializing PartnerTech.ai")

  // Create sticky companion
  createStickyCompanion()

  // Analyze page content
  analyzePageContent()

  // Set up message listener
  chrome.runtime.onMessage.addListener(handleMessage)
}

// Create the sticky AI companion
function createStickyCompanion() {
  // Check if companion already exists
  if (document.getElementById("partnertech-companion")) {
    return
  }

  const companion = document.createElement("div")
  companion.id = "partnertech-companion"
  companion.innerHTML = `
    <div class="partnertech-companion-container">
      <div class="partnertech-companion-header">
        <div class="partnertech-logo">
          <span class="partnertech-icon">🚀</span>
          <span class="partnertech-text">PartnerTech.ai</span>
        </div>
        <div class="partnertech-controls">
          <button id="companion-minimize">−</button>
          <button id="companion-close">×</button>
        </div>
      </div>
      
      <div class="partnertech-companion-content">
        <div class="partnertech-status">
          <div class="status-indicator"></div>
          <span>AI Active</span>
        </div>
        
        <div class="partnertech-signals">
          <div class="signals-title">Intent Signals</div>
          <div class="signal-loading">Analyzing page...</div>
        </div>
        
        <div class="partnertech-actions">
          <button class="action-btn primary" onclick="triggerOutreach()">
            📧 Auto Outreach
          </button>
          <button class="action-btn secondary" onclick="extractContacts()">
            👥 Extract Contacts
          </button>
        </div>
      </div>
    </div>
  `

  // Add companion to page
  document.body.appendChild(companion)

  // Add event listeners
  document
    .getElementById("companion-minimize")
    ?.addEventListener("click", () => {
      const content = companion.querySelector(".partnertech-companion-content")
      content.style.display =
        content.style.display === "none" ? "block" : "none"
    })

  document.getElementById("companion-close")?.addEventListener("click", () => {
    companion.remove()
  })

  console.log("✅ Sticky companion created")
}

// Analyze page content for intent signals
function analyzePageContent() {
  console.log("🔍 Analyzing page content")

  const signals = {
    hiring: 0,
    funding: 0,
    expansion: 0,
    details: []
  }

  const url = window.location.href
  const pageText = document.body.innerText.toLowerCase()

  // Check for hiring signals
  const hiringKeywords = [
    "we're hiring",
    "join our team",
    "careers",
    "job openings"
  ]
  hiringKeywords.forEach(keyword => {
    if (pageText.includes(keyword)) {
      signals.hiring += 20
      signals.details.push(`Found hiring keyword: "${keyword}"`)
    }
  })

  // Check for funding signals
  const fundingKeywords = [
    "series a",
    "series b",
    "funding",
    "investment",
    "raised"
  ]
  fundingKeywords.forEach(keyword => {
    if (pageText.includes(keyword)) {
      signals.funding += 25
      signals.details.push(`Found funding keyword: "${keyword}"`)
    }
  })

  // LinkedIn specific analysis
  if (url.includes("linkedin.com")) {
    if (url.includes("/company/")) {
      signals.expansion += 30
      signals.details.push("On LinkedIn company page")
    }
    if (url.includes("/jobs/")) {
      signals.hiring += 40
      signals.details.push("On LinkedIn jobs page")
    }
  }

  updateSignalsDisplay(signals)
  return signals
}

// Update signals display
function updateSignalsDisplay(signals) {
  const signalsContainer = document.querySelector(".partnertech-signals")
  if (!signalsContainer) return

  let html = '<div class="signals-title">Intent Signals</div>'

  if (signals.hiring > 0) {
    html += `<div class="signal-item">🎯 Hiring Intent: ${signals.hiring}%</div>`
  }
  if (signals.funding > 0) {
    html += `<div class="signal-item">💰 Funding Event: ${signals.funding}%</div>`
  }
  if (signals.expansion > 0) {
    html += `<div class="signal-item">📈 Expansion: ${signals.expansion}%</div>`
  }

  if (
    signals.hiring === 0 &&
    signals.funding === 0 &&
    signals.expansion === 0
  ) {
    html += '<div class="signal-item">No strong signals detected</div>'
  }

  signalsContainer.innerHTML = html
}

// Global functions for buttons
window.triggerOutreach = function () {
  console.log("📧 Triggering outreach automation")
  alert("🚀 PartnerTech.ai: Outreach automation triggered!")
}

window.extractContacts = function () {
  console.log("👥 Extracting contacts")
  const emails =
    document.body.innerText.match(
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g
    ) || []
  alert(
    `📧 Found ${emails.length} email addresses: ${emails.slice(0, 3).join(", ")}${emails.length > 3 ? "..." : ""}`
  )
}

// Handle messages from background script
function handleMessage(message, sender, sendResponse) {
  console.log("💬 Content script received message:", message.type)

  switch (message.type) {
    case "ANALYZE_SELECTION":
      alert(
        `🧠 PartnerTech.ai Analysis: "${message.text.substring(0, 100)}..."`
      )
      break
    default:
      console.log("Unknown message type:", message.type)
  }

  return true
}

console.log("✅ PartnerTech.ai Content Script Ready")
