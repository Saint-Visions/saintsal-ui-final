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

  // Analyze page content for intent signals
  analyzePageContent()

  // Set up page monitoring
  setupPageMonitoring()

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
      <div class="partnertech-companion-header" id="companion-header">
        <div class="partnertech-logo">
          <span class="partnertech-icon">🚀</span>
          <span class="partnertech-text">PartnerTech.ai</span>
        </div>
        <div class="partnertech-controls">
          <button id="companion-minimize" title="Minimize">−</button>
          <button id="companion-close" title="Close">×</button>
        </div>
      </div>
      
      <div class="partnertech-companion-content" id="companion-content">
        <div class="partnertech-status">
          <div class="status-indicator active"></div>
          <span>AI Active</span>
        </div>
        
        <div class="partnertech-signals" id="intent-signals">
          <div class="signals-title">Intent Signals</div>
          <div class="signal-loading">Analyzing page...</div>
        </div>
        
        <div class="partnertech-actions">
          <button class="action-btn primary" id="trigger-outreach">
            📧 Auto Outreach
          </button>
          <button class="action-btn secondary" id="extract-contacts">
            👥 Extract Contacts
          </button>
          <button class="action-btn secondary" id="schedule-follow">
            📅 Schedule Follow-up
          </button>
        </div>
        
        <div class="partnertech-chat" id="ai-chat">
          <div class="chat-header">💬 AI Assistant</div>
          <div class="chat-messages" id="chat-messages">
            <div class="ai-message">
              Hi! I'm analyzing this page for business opportunities. Need help with anything?
            </div>
          </div>
          <div class="chat-input-container">
            <input type="text" id="chat-input" placeholder="Ask AI anything..." />
            <button id="chat-send">→</button>
          </div>
        </div>
      </div>
    </div>
  `

  // Add companion to page
  document.body.appendChild(companion)

  // Make draggable
  makeDraggable(companion.querySelector("#companion-header"), companion)

  // Add event listeners
  setupCompanionEvents()

  console.log("✅ Sticky companion created")
}

// Setup companion event listeners
function setupCompanionEvents() {
  // Minimize/maximize
  document
    .getElementById("companion-minimize")
    ?.addEventListener("click", () => {
      const content = document.getElementById("companion-content")
      const companion = document.getElementById("partnertech-companion")

      if (content.style.display === "none") {
        content.style.display = "block"
        companion.classList.remove("minimized")
      } else {
        content.style.display = "none"
        companion.classList.add("minimized")
      }
    })

  // Close
  document.getElementById("companion-close")?.addEventListener("click", () => {
    document.getElementById("partnertech-companion")?.remove()
  })

  // Action buttons
  document.getElementById("trigger-outreach")?.addEventListener("click", () => {
    triggerAction("email-outreach", {
      url: window.location.href,
      title: document.title,
      type: "outreach"
    })
  })

  document.getElementById("extract-contacts")?.addEventListener("click", () => {
    extractContactsFromPage()
  })

  document.getElementById("schedule-follow")?.addEventListener("click", () => {
    triggerAction("schedule-follow-up", {
      url: window.location.href,
      title: document.title,
      type: "scheduling"
    })
  })

  // Chat functionality
  const chatInput = document.getElementById("chat-input")
  const chatSend = document.getElementById("chat-send")

  const sendChatMessage = () => {
    const message = chatInput.value.trim()
    if (message) {
      addChatMessage("user", message)
      chatInput.value = ""
      processAiMessage(message)
    }
  }

  chatSend?.addEventListener("click", sendChatMessage)
  chatInput?.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      sendChatMessage()
    }
  })
}

// Make element draggable
function makeDraggable(header, element) {
  let isDragging = false
  let currentX = 0
  let currentY = 0
  let initialX = 0
  let initialY = 0

  header.addEventListener("mousedown", e => {
    isDragging = true
    initialX = e.clientX - currentX
    initialY = e.clientY - currentY
    header.style.cursor = "grabbing"
  })

  document.addEventListener("mousemove", e => {
    if (isDragging) {
      e.preventDefault()
      currentX = e.clientX - initialX
      currentY = e.clientY - initialY

      element.style.transform = `translate(${currentX}px, ${currentY}px)`
    }
  })

  document.addEventListener("mouseup", () => {
    isDragging = false
    header.style.cursor = "grab"
  })
}

// Analyze page content for intent signals
function analyzePageContent() {
  console.log("🔍 Analyzing page content for intent signals")

  const signals = {
    hiring: 0,
    funding: 0,
    expansion: 0,
    techChange: 0,
    competitors: 0,
    details: []
  }

  // Analyze URL
  const url = window.location.href
  const title = document.title

  // Check for hiring signals
  const hiringKeywords = [
    "we're hiring",
    "join our team",
    "careers",
    "job openings",
    "now hiring",
    "seeking",
    "looking for",
    "engineer",
    "developer",
    "product manager",
    "sales",
    "marketing"
  ]

  const pageText = document.body.innerText.toLowerCase()

  hiringKeywords.forEach(keyword => {
    if (pageText.includes(keyword)) {
      signals.hiring += 10
      signals.details.push(`Found hiring keyword: "${keyword}"`)
    }
  })

  // Check for funding signals
  const fundingKeywords = [
    "series a",
    "series b",
    "series c",
    "seed round",
    "funding",
    "investment",
    "raised",
    "investors",
    "venture capital",
    "vc"
  ]

  fundingKeywords.forEach(keyword => {
    if (pageText.includes(keyword)) {
      signals.funding += 15
      signals.details.push(`Found funding keyword: "${keyword}"`)
    }
  })

  // Check for expansion signals
  const expansionKeywords = [
    "new office",
    "expanding",
    "growth",
    "scaling",
    "new market",
    "international",
    "launching"
  ]

  expansionKeywords.forEach(keyword => {
    if (pageText.includes(keyword)) {
      signals.expansion += 12
      signals.details.push(`Found expansion keyword: "${keyword}"`)
    }
  })

  // LinkedIn specific analysis
  if (url.includes("linkedin.com")) {
    if (url.includes("/company/")) {
      signals.expansion += 20
      signals.details.push("On LinkedIn company page")
    }
    if (url.includes("/jobs/")) {
      signals.hiring += 30
      signals.details.push("On LinkedIn jobs page")
    }
  }

  // Update companion with signals
  updateSignalsDisplay(signals)

  // Send to background script
  chrome.runtime.sendMessage({
    type: "UPDATE_INTENT_SIGNALS",
    tabId: null,
    signals
  })

  return signals
}

// Update signals display in companion
function updateSignalsDisplay(signals) {
  const signalsContainer = document.getElementById("intent-signals")
  if (!signalsContainer) return

  let html = '<div class="signals-title">Intent Signals</div>'

  if (signals.hiring > 0) {
    html += `
      <div class="signal-item hiring">
        <span class="signal-icon">🎯</span>
        <span class="signal-text">Hiring Intent</span>
        <span class="signal-score">${signals.hiring}%</span>
      </div>
    `
  }

  if (signals.funding > 0) {
    html += `
      <div class="signal-item funding">
        <span class="signal-icon">💰</span>
        <span class="signal-text">Funding Event</span>
        <span class="signal-score">${signals.funding}%</span>
      </div>
    `
  }

  if (signals.expansion > 0) {
    html += `
      <div class="signal-item expansion">
        <span class="signal-icon">📈</span>
        <span class="signal-text">Expansion</span>
        <span class="signal-score">${signals.expansion}%</span>
      </div>
    `
  }

  if (
    signals.hiring === 0 &&
    signals.funding === 0 &&
    signals.expansion === 0
  ) {
    html += '<div class="signal-item neutral">No strong signals detected</div>'
  }

  signalsContainer.innerHTML = html
}

// Extract contacts from page
function extractContactsFromPage() {
  console.log("👥 Extracting contacts from page")

  const contacts = []
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g
  const phoneRegex = /(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g

  const pageText = document.body.innerText

  // Find emails
  const emails = pageText.match(emailRegex) || []
  emails.forEach(email => {
    contacts.push({ type: "email", value: email })
  })

  // Find phone numbers
  const phones = pageText.match(phoneRegex) || []
  phones.forEach(phone => {
    contacts.push({ type: "phone", value: phone })
  })

  // Show results
  if (contacts.length > 0) {
    addChatMessage(
      "ai",
      `Found ${contacts.length} contacts: ${contacts
        .map(c => c.value)
        .join(", ")}`
    )
  } else {
    addChatMessage("ai", "No contacts found on this page.")
  }

  return contacts
}

// Trigger action via background script
function triggerAction(action, context) {
  console.log("🎯 Triggering action:", action)

  chrome.runtime.sendMessage(
    {
      type: "TRIGGER_ACTION",
      action,
      context
    },
    response => {
      if (response.success) {
        addChatMessage("ai", `Action "${action}" triggered successfully!`)
      } else {
        addChatMessage("ai", `Failed to trigger action: ${response.error}`)
      }
    }
  )
}

// Add message to chat
function addChatMessage(sender, message) {
  const chatMessages = document.getElementById("chat-messages")
  if (!chatMessages) return

  const messageDiv = document.createElement("div")
  messageDiv.className = `${sender}-message`
  messageDiv.textContent = message

  chatMessages.appendChild(messageDiv)
  chatMessages.scrollTop = chatMessages.scrollHeight
}

// Process AI message
function processAiMessage(message) {
  // Simulate AI response (in real app, this would call the API)
  setTimeout(() => {
    let response = "I'm analyzing that for you..."

    if (message.toLowerCase().includes("contact")) {
      response =
        "I can help extract contacts from this page. Click the 'Extract Contacts' button above."
    } else if (message.toLowerCase().includes("outreach")) {
      response =
        "I can trigger automated outreach sequences. Would you like me to start an email campaign?"
    } else if (message.toLowerCase().includes("intent")) {
      response =
        "I'm continuously monitoring this page for intent signals like hiring, funding, or expansion activities."
    }

    addChatMessage("ai", response)
  }, 1000)
}

// Setup page monitoring
function setupPageMonitoring() {
  // Monitor for dynamic content changes
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        // Re-analyze if significant content added
        const addedText = Array.from(mutation.addedNodes)
          .map(node => node.textContent || "")
          .join(" ")

        if (addedText.length > 100) {
          console.log("📝 Significant content change detected, re-analyzing...")
          setTimeout(analyzePageContent, 2000)
        }
      }
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}

// Handle messages from background script
function handleMessage(message, sender, sendResponse) {
  console.log("💬 Content script received message:", message.type)

  switch (message.type) {
    case "SHOW_ANALYSIS":
      addChatMessage("ai", `Analysis: ${message.analysis}`)
      break

    case "EXTRACT_CONTACTS":
      const contacts = extractContactsFromPage()
      sendResponse({ success: true, contacts })
      break

    case "UPDATE_COMPANION":
      updateSignalsDisplay(message.signals)
      break

    default:
      console.log("Unknown message type:", message.type)
  }

  return true
}

console.log("✅ PartnerTech.ai Content Script Ready")
