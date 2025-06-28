// PartnerTech.ai Chrome Extension Background Service Worker
// Patent #10,290,222 Protected Technology

console.log("🚀 PartnerTech.ai Extension - Background Worker Started")

// Extension installation
chrome.runtime.onInstalled.addListener(async details => {
  console.log("📦 PartnerTech.ai Extension installed:", details.reason)

  // Set default settings
  await chrome.storage.sync.set({
    extensionEnabled: true,
    apiKey: "",
    userId: "",
    assistantMode: "dual",
    autoDetectIntent: true,
    showStickyCompanion: true
  })

  // Create context menu
  chrome.contextMenus.create({
    id: "partnertech-analyze",
    title: "Analyze with PartnerTech.ai",
    contexts: ["selection", "page"]
  })
})

// Tab tracking for intent detection
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    console.log("🔍 Analyzing tab:", tab.url)

    // Detect intent signals
    const intentSignals = detectIntentSignals(tab.url, tab.title)

    // Inject content script
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
  }
})

// Intent signal detection
function detectIntentSignals(url, title) {
  const signals = {
    hiring: 0,
    funding: 0,
    expansion: 0,
    sources: []
  }

  // LinkedIn detection
  if (url.includes("linkedin.com")) {
    signals.sources.push("linkedin")
    if (url.includes("/jobs/") || title?.toLowerCase().includes("hiring")) {
      signals.hiring += 40
    }
    if (url.includes("/company/")) {
      signals.expansion += 25
    }
  }

  // Job board detection
  const jobBoards = ["indeed.com", "glassdoor.com", "lever.co", "greenhouse.io"]
  if (jobBoards.some(board => url.includes(board))) {
    signals.hiring += 50
    signals.sources.push("job_board")
  }

  // Funding news detection
  if (url.includes("crunchbase.com") || url.includes("techcrunch.com")) {
    signals.funding += 40
    signals.sources.push("news")
  }

  return signals
}

// Context menu handler
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "partnertech-analyze") {
    console.log("📊 Analyzing selection with PartnerTech.ai")

    chrome.tabs.sendMessage(tab.id, {
      type: "ANALYZE_SELECTION",
      text: info.selectionText,
      url: tab.url
    })
  }
})

console.log("✅ PartnerTech.ai Background Worker Ready")
