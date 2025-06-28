// PartnerTech.ai Chrome Extension Popup JavaScript
// Patent #10,290,222 Protected Technology

console.log("🚀 PartnerTech.ai Popup Loaded")

// Initialize popup when DOM is ready
document.addEventListener("DOMContentLoaded", initializePopup)

async function initializePopup() {
  console.log("🔧 Initializing popup...")

  // Get current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  const currentTab = tab

  // Setup tab management
  setupTabs()

  // Load current page data
  loadCurrentPageData(currentTab)

  // Setup event listeners
  setupEventListeners()

  // Get settings
  const settings = await getSettings()
  updateUIWithSettings(settings)

  console.log("✅ Popup initialized")
}

// Setup tab functionality
function setupTabs() {
  const tabs = document.querySelectorAll(".tab")
  const tabContents = document.querySelectorAll(".tab-content")

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove("active"))
      tabContents.forEach(content => content.classList.remove("active"))

      // Add active to clicked tab
      tab.classList.add("active")
      const targetTab = tab.getAttribute("data-tab")
      document.getElementById(targetTab)?.classList.add("active")
    })
  })
}

// Load current page data
async function loadCurrentPageData(tab) {
  console.log("📊 Loading page data for:", tab.url)

  // Update company info
  updateCompanyInfo(tab)

  // Get tab data from background script
  try {
    const response = await chrome.runtime.sendMessage({
      type: "GET_TAB_DATA",
      tabId: tab.id
    })

    if (response.success && response.data) {
      updateIntentSignals(response.data.intentSignals)
    }
  } catch (error) {
    console.error("Failed to get tab data:", error)
  }

  // Analyze current page
  analyzeCurrentPage(tab)
}

// Update company info based on current page
function updateCompanyInfo(tab) {
  const companyNameEl = document.getElementById("current-company")
  const companyDetailsEl = document.getElementById("company-details")

  if (!companyNameEl || !companyDetailsEl) return

  const domain = new URL(tab.url).hostname.replace("www.", "")
  const title = tab.title

  // Extract company name from domain or title
  let companyName = domain
    .split(".")
    .slice(0, -1)
    .join(" ")
    .replace(/[^a-zA-Z\s]/g, "")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  if (tab.url.includes("linkedin.com/company/")) {
    const match = tab.url.match(/\/company\/([^\/]+)/)
    if (match) {
      companyName = match[1]
        .replace(/-/g, " ")
        .replace(/\b\w/g, l => l.toUpperCase())
    }
  }

  companyNameEl.textContent = companyName || "Unknown Company"
  companyDetailsEl.textContent = `${domain} • Analyzing...`
}

// Analyze current page
async function analyzeCurrentPage(tab) {
  console.log("🔍 Analyzing current page...")

  const signals = analyzePageForSignals(tab.url, tab.title)
  updateIntentSignals(signals)
}

// Analyze page for intent signals
function analyzePageForSignals(url, title) {
  const signals = {
    hiring: 0,
    funding: 0,
    expansion: 0,
    techChange: 0,
    details: []
  }

  // LinkedIn detection
  if (url.includes("linkedin.com")) {
    signals.details.push("LinkedIn platform detected")

    if (url.includes("/jobs/")) {
      signals.hiring += 40
      signals.details.push("On LinkedIn jobs page")
    }

    if (url.includes("/company/")) {
      signals.expansion += 25
      signals.details.push("On LinkedIn company page")
    }
  }

  // Job board detection
  const jobBoards = ["indeed.com", "glassdoor.com", "lever.co", "greenhouse.io"]
  if (jobBoards.some(board => url.includes(board))) {
    signals.hiring += 50
    signals.details.push("Job board detected")
  }

  // News/funding sites
  const newsSites = [
    "crunchbase.com",
    "techcrunch.com",
    "venturebeat.com",
    "reuters.com"
  ]
  if (newsSites.some(site => url.includes(site))) {
    signals.funding += 35
    signals.details.push("News/funding site")
  }

  // Tech sites
  if (url.includes("github.com") || url.includes("stackoverflow.com")) {
    signals.techChange += 30
    signals.details.push("Tech platform detected")
  }

  return signals
}

// Update intent signals display
function updateIntentSignals(signals) {
  if (!signals) return

  console.log("📈 Updating intent signals:", signals)

  // Update the signal items in the popup
  const signalsContainer = document.querySelector("#signals .intent-signals")
  if (!signalsContainer) return

  // Clear existing signal loading
  const loading = signalsContainer.querySelector(".signal-loading")
  if (loading) loading.remove()

  // You could update individual signal displays here
  // This would match the logic from content-script.js
}

// Setup event listeners
function setupEventListeners() {
  // Settings button (if exists)
  const settingsBtn = document.querySelector('[data-action="settings"]')
  if (settingsBtn) {
    settingsBtn.addEventListener("click", openSettings)
  }

  // Quick action buttons
  document.querySelectorAll(".quick-action").forEach(button => {
    button.addEventListener("click", e => {
      const action = e.currentTarget.getAttribute("onclick")
      if (action) {
        eval(action) // Execute the onclick action
      }
    })
  })

  // Action buttons in signals
  document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", e => {
      const action = e.currentTarget.getAttribute("onclick")
      if (action) {
        eval(action) // Execute the onclick action
      }
    })
  })
}

// Get settings from storage
async function getSettings() {
  try {
    const response = await chrome.runtime.sendMessage({ type: "GET_SETTINGS" })
    return response.success ? response.settings : {}
  } catch (error) {
    console.error("Failed to get settings:", error)
    return {}
  }
}

// Update UI with settings
function updateUIWithSettings(settings) {
  console.log("⚙️ Updating UI with settings:", settings)

  // Update assistant mode indicator if needed
  const currentMode = settings.assistantMode || "dual"

  // You could highlight the current mode in the assistant tab
  // and update other UI elements based on settings
}

// Trigger action functions (called from HTML onclick)
window.triggerAction = async function (action) {
  console.log("🎯 Triggering action:", action)

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    const response = await chrome.runtime.sendMessage({
      type: "TRIGGER_ACTION",
      action,
      context: {
        url: tab.url,
        title: tab.title,
        timestamp: Date.now()
      }
    })

    if (response.success) {
      showNotification("✅ Action triggered successfully!")
    } else {
      showNotification("❌ Action failed: " + response.error)
    }
  } catch (error) {
    console.error("Action trigger failed:", error)
    showNotification("❌ Failed to trigger action")
  }
}

// Switch assistant mode
window.switchAssistant = async function (mode) {
  console.log("🤖 Switching assistant mode to:", mode)

  try {
    await chrome.storage.sync.set({ assistantMode: mode })
    showNotification(`🧠 Switched to ${mode.toUpperCase()} mode`)

    // Update UI to reflect current mode
    document.querySelectorAll(".quick-action").forEach(action => {
      action.classList.remove("active")
    })

    const activeAction = document.querySelector(
      `.quick-action[onclick="switchAssistant('${mode}')"]`
    )
    if (activeAction) {
      activeAction.classList.add("active")
    }
  } catch (error) {
    console.error("Failed to switch assistant:", error)
    showNotification("❌ Failed to switch mode")
  }
}

// Open dashboard
window.openDashboard = function () {
  chrome.tabs.create({ url: "https://app.partnertech.ai/dashboard" })
  window.close()
}

// Show notification in popup
function showNotification(message) {
  // Create a temporary notification element
  const notification = document.createElement("div")
  notification.className = "popup-notification"
  notification.textContent = message
  notification.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: #10b981;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Open settings (placeholder)
function openSettings() {
  console.log("⚙️ Opening settings...")
  // You could create a settings page or modal here
  showNotification("Settings coming soon!")
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("💬 Popup received message:", message.type)

  switch (message.type) {
    case "INTENT_SIGNALS_DETECTED":
      updateIntentSignals(message.signals)
      break

    default:
      console.log("Unknown message type:", message.type)
  }
})

console.log("✅ PartnerTech.ai Popup Ready")
