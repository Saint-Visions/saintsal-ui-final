// PartnerTech.ai Chrome Extension Background Service Worker
// Patent #10,290,222 Protected Technology

console.log("🚀 PartnerTech.ai Extension - Background Service Worker Started")

// Extension installation and setup
chrome.runtime.onInstalled.addListener(async details => {
  console.log("📦 Extension installed:", details.reason)

  // Set default settings
  await chrome.storage.sync.set({
    extensionEnabled: true,
    apiKey: "",
    userId: "",
    tenantId: "",
    assistantMode: "dual", // saint, sal, or dual
    autoDetectIntent: true,
    showStickyCompanion: true,
    apiEndpoint: "https://api.partnertech.ai"
  })

  // Create context menu items
  chrome.contextMenus.create({
    id: "partnertech-analyze",
    title: "Analyze with PartnerTech.ai",
    contexts: ["selection", "page"]
  })

  chrome.contextMenus.create({
    id: "partnertech-extract-contact",
    title: "Extract Contact Info",
    contexts: ["selection", "page"]
  })

  chrome.contextMenus.create({
    id: "partnertech-trigger-outreach",
    title: "Trigger Auto Outreach",
    contexts: ["selection", "page"]
  })
})

// Tab tracking for intent detection
const activeTabData = new Map()

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    console.log("🔍 Tab updated:", tab.url)

    // Detect if we're on LinkedIn, company websites, etc.
    const intentSignals = await detectIntentSignals(tab.url, tab.title)

    // Store tab data
    activeTabData.set(tabId, {
      url: tab.url,
      title: tab.title,
      intentSignals,
      timestamp: Date.now()
    })

    // Inject content script if needed
    const settings = await chrome.storage.sync.get(["extensionEnabled"])
    if (settings.extensionEnabled) {
      try {
        await chrome.scripting.executeScript({
          target: { tabId },
          files: ["content-script.js"]
        })
      } catch (error) {
        console.log("Could not inject script:", error)
      }
    }

    // Send signals to popup if open
    try {
      chrome.runtime.sendMessage({
        type: "INTENT_SIGNALS_DETECTED",
        tabId,
        signals: intentSignals,
        url: tab.url,
        title: tab.title
      })
    } catch (error) {
      // Popup not open, ignore
    }
  }
})

// Context menu click handler
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log("📋 Context menu clicked:", info.menuItemId)

  const settings = await chrome.storage.sync.get(["apiKey", "apiEndpoint"])

  switch (info.menuItemId) {
    case "partnertech-analyze":
      await analyzeSelection(info, tab, settings)
      break
    case "partnertech-extract-contact":
      await extractContactInfo(info, tab, settings)
      break
    case "partnertech-trigger-outreach":
      await triggerOutreach(info, tab, settings)
      break
  }
})

// Message handling from content script and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("💬 Message received:", message.type)

  switch (message.type) {
    case "GET_TAB_DATA":
      const tabData = activeTabData.get(sender.tab?.id || message.tabId)
      sendResponse({ success: true, data: tabData })
      break

    case "TRIGGER_ACTION":
      handleActionTrigger(message, sender)
        .then(result => sendResponse({ success: true, result }))
        .catch(error => sendResponse({ success: false, error: error.message }))
      return true // Keep message channel open for async response

    case "UPDATE_INTENT_SIGNALS":
      updateIntentSignals(message.tabId, message.signals)
      sendResponse({ success: true })
      break

    case "GET_SETTINGS":
      chrome.storage.sync
        .get(null)
        .then(settings => sendResponse({ success: true, settings }))
        .catch(error => sendResponse({ success: false, error: error.message }))
      return true

    default:
      sendResponse({ success: false, error: "Unknown message type" })
  }
})

// Intent signal detection
async function detectIntentSignals(url, title) {
  const signals = {
    hiring: 0,
    funding: 0,
    expansion: 0,
    techChange: 0,
    competitors: 0,
    sources: []
  }

  // LinkedIn detection
  if (url.includes("linkedin.com")) {
    signals.sources.push("linkedin")

    // Job postings
    if (url.includes("/jobs/") || title?.toLowerCase().includes("hiring")) {
      signals.hiring += 30
    }

    // Company pages
    if (url.includes("/company/")) {
      signals.expansion += 20
    }
  }

  // Job board detection
  const jobBoards = [
    "indeed.com",
    "glassdoor.com",
    "lever.co",
    "greenhouse.io",
    "workday.com"
  ]
  if (jobBoards.some(board => url.includes(board))) {
    signals.hiring += 40
    signals.sources.push("job_board")
  }

  // News/funding detection
  if (
    url.includes("crunchbase.com") ||
    url.includes("techcrunch.com") ||
    url.includes("venturebeat.com")
  ) {
    signals.funding += 35
    signals.sources.push("news")
  }

  // Tech stack detection
  if (url.includes("stackshare.io") || url.includes("builtwith.com")) {
    signals.techChange += 30
    signals.sources.push("tech_stack")
  }

  // Company website detection
  const domain = new URL(url).hostname
  if (
    !domain.includes("google.") &&
    !domain.includes("facebook.") &&
    !domain.includes("linkedin.") &&
    !domain.includes("twitter.")
  ) {
    signals.expansion += 10
    signals.sources.push("company_website")
  }

  return signals
}

// Action trigger handler
async function handleActionTrigger(message, sender) {
  const settings = await chrome.storage.sync.get([
    "apiKey",
    "apiEndpoint",
    "userId",
    "tenantId"
  ])

  if (!settings.apiKey) {
    throw new Error("API key not configured")
  }

  console.log("🎯 Triggering action:", message.action)

  const actionData = {
    action: message.action,
    context: message.context,
    url: sender.tab?.url,
    title: sender.tab?.title,
    userId: settings.userId,
    tenantId: settings.tenantId,
    timestamp: Date.now()
  }

  // Send to PartnerTech.ai API
  try {
    const response = await fetch(
      `${settings.apiEndpoint}/api/actions/trigger`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${settings.apiKey}`,
          "X-Extension-Version": "1.0.0"
        },
        body: JSON.stringify(actionData)
      }
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const result = await response.json()

    // Show notification
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon48.png",
      title: "PartnerTech.ai",
      message: `Action "${message.action}" triggered successfully!`
    })

    return result
  } catch (error) {
    console.error("❌ Action trigger failed:", error)
    throw error
  }
}

// Analyze selection
async function analyzeSelection(info, tab, settings) {
  const text = info.selectionText || ""

  // Send to content script for UI feedback
  chrome.tabs.sendMessage(tab.id, {
    type: "SHOW_ANALYSIS",
    text,
    analysis: "Analyzing with AI..."
  })

  // TODO: Call AI analysis API
  console.log("📊 Analyzing selection:", text.substring(0, 100))
}

// Extract contact information
async function extractContactInfo(info, tab, settings) {
  chrome.tabs.sendMessage(tab.id, {
    type: "EXTRACT_CONTACTS",
    selection: info.selectionText
  })
}

// Trigger outreach automation
async function triggerOutreach(info, tab, settings) {
  const context = {
    url: tab.url,
    title: tab.title,
    selection: info.selectionText
  }

  await handleActionTrigger(
    {
      action: "trigger-outreach",
      context
    },
    { tab }
  )
}

// Update intent signals
function updateIntentSignals(tabId, newSignals) {
  const tabData = activeTabData.get(tabId)
  if (tabData) {
    tabData.intentSignals = { ...tabData.intentSignals, ...newSignals }
    activeTabData.set(tabId, tabData)
  }
}

// Cleanup inactive tabs
setInterval(() => {
  chrome.tabs.query({}, tabs => {
    const activeTabIds = new Set(tabs.map(tab => tab.id))

    for (const [tabId] of activeTabData) {
      if (!activeTabIds.has(tabId)) {
        activeTabData.delete(tabId)
      }
    }
  })
}, 300000) // Clean up every 5 minutes

console.log("✅ PartnerTech.ai Background Service Worker Ready")
