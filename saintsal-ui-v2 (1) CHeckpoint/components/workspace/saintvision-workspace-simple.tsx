"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SaintSalOperationsDashboard } from "@/components/operations/sainsal-operations-dashboard"
import { LeadDiscovery } from "@/components/leads/lead-discovery"
import { ReferralNetwork } from "@/components/referrals/referral-network"
import { AIDealDashboard } from "@/components/deals/ai-deal-dashboard"
import {
  Home,
  User,
  Brain,
  FileText,
  Wrench,
  Mic,
  Users,
  Settings,
  CreditCard,
  Clock,
  Lock,
  LogOut,
  ChevronRight,
  MessageSquare
} from "lucide-react"

const sidebarItems = [
  { id: "dashboard", label: "Main Dashboard", icon: Home, active: true },
  { id: "companion", label: "My Companion 🧠", icon: Brain, locked: false },
  { id: "search", label: "Smart Search 🔍", icon: FileText, locked: true },
  { id: "leads", label: "Lead Discovery 💎", icon: Users, locked: true },
  { id: "deals", label: "Deal Analysis 📈", icon: CreditCard, locked: true },
  { id: "referrals", label: "Referral Network 🤝", icon: Users, locked: true },
  { id: "crm", label: "GHL CRM Integration", icon: Settings, locked: true },
  { id: "tools", label: "AI Model Selector 🤖", icon: Wrench, locked: true },
  { id: "files", label: "File Manager 📁", icon: FileText, locked: true },
  { id: "voice", label: "Voice Chat 🎤", icon: Mic, locked: true },
  { id: "mobile", label: "Mobile Export 📱", icon: Settings, locked: true },
  { id: "account", label: "My Account ⚙️", icon: Settings, locked: true },
  { id: "upgrade", label: "Upgrade Tier ⚡️", icon: Lock, locked: true },
  { id: "logout", label: "Logout", icon: LogOut, locked: true }
]

export function SaintVisionWorkspaceSimple() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const router = useRouter()

  const handleSidebarClick = (itemId: string) => {
    console.log("Sidebar clicked:", itemId)

    if (itemId === "logout") {
      router.push("/en/login")
      return
    }

    if (itemId === "upgrade") {
      // Show upgrade modal - for now just log
      console.log("Upgrade modal would show here")
      return
    }

    // For locked items, show upgrade prompt
    const item = sidebarItems.find(i => i.id === itemId)
    if (item?.locked) {
      // Show upgrade prompt
      console.log("Upgrade required for:", item.label)
      alert(
        `🔒 Upgrade to PRO to unlock "${item.label}"\n\nGet unlimited access for just $27/month!`
      )
      return
    }

    console.log("Setting active section to:", itemId)
    setActiveSection(itemId)
  }
  const renderMainContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <SaintSalOperationsDashboard />
      case "companion":
        return (
          <div
            className="flex h-full flex-col"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url('https://cdn.builder.io/api/v1/image/assets%2Fd83998c6a81f466db4fb83ab90c7ba25%2F17fbf771b01940e59f3e060900a7a7b3?format=webp&width=800')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          >
            {/* Header */}
            <div className="shrink-0 border-b border-yellow-500/20 p-6">
              <div className="text-center">
                <h2 className="mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-3xl font-bold text-transparent">
                  Your GOTTA GUY™ Companion
                </h2>
                <p className="font-medium text-yellow-400/80">
                  SaintVisionAI™ • Azure Cognitive + OpenAI GPT-4o
                </p>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex flex-1 flex-col items-center justify-center p-6">
              <div className="w-full max-w-4xl">
                {/* Welcome Message */}
                <div className="mb-6 rounded-xl border border-yellow-500/20 bg-black/40 p-6 backdrop-blur-lg">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600">
                      <Brain className="size-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-bold text-yellow-400">
                        Your GOTTA GUY™ is ready!
                      </h3>
                      <p className="text-sm text-gray-400">
                        Connected to the global AI network
                      </p>
                    </div>
                  </div>

                  <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg border border-blue-500/20 bg-blue-900/30 p-4">
                      <h4 className="mb-2 flex items-center gap-2 font-semibold text-blue-400">
                        <span className="size-2 rounded-full bg-blue-400"></span>
                        Azure Cognitive
                      </h4>
                      <p className="text-sm text-gray-300">
                        Enterprise-grade AI services
                      </p>
                    </div>
                    <div className="rounded-lg border border-green-500/20 bg-green-900/30 p-4">
                      <h4 className="mb-2 flex items-center gap-2 font-semibold text-green-400">
                        <span className="size-2 rounded-full bg-green-400"></span>
                        OpenAI GPT-4o
                      </h4>
                      <p className="text-sm text-gray-300">
                        Latest AI language model
                      </p>
                    </div>
                  </div>

                  <p className="text-center text-gray-300">
                    Ask me anything about business strategy, lead generation,
                    deal analysis, or get personalized insights. I'm your GOTTA
                    GUY™ for everything!
                  </p>
                </div>

                {/* Chat Input */}
                <div className="rounded-xl border border-yellow-500/30 bg-black/50 p-4 backdrop-blur-lg">
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      placeholder="Ask your GOTTA GUY™ anything... 'Generate 10 leads in fintech' or 'Analyze my sales pipeline'"
                      className="flex-1 rounded-lg border border-yellow-500/30 bg-gray-800/50 px-4 py-3 text-gray-300 placeholder:text-gray-500 focus:border-yellow-400 focus:outline-none"
                    />
                    <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-3 font-bold text-black hover:from-yellow-400 hover:to-yellow-500">
                      <MessageSquare className="mr-2 size-4" />
                      Send
                    </Button>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm">
                    <p className="text-gray-400">
                      <span className="font-semibold text-yellow-400">
                        FREE TIER:
                      </span>{" "}
                      10 messages/day • Upgrade for unlimited
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-green-400"></span>
                      <span className="text-xs text-green-400">Connected</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                  <button className="rounded-lg border border-purple-500/20 bg-purple-900/30 p-3 text-center transition-colors hover:bg-purple-900/50">
                    <span className="text-sm font-medium text-purple-400">
                      💎 Find Leads
                    </span>
                  </button>
                  <button className="rounded-lg border border-blue-500/20 bg-blue-900/30 p-3 text-center transition-colors hover:bg-blue-900/50">
                    <span className="text-sm font-medium text-blue-400">
                      📈 Analyze Deal
                    </span>
                  </button>
                  <button className="rounded-lg border border-green-500/20 bg-green-900/30 p-3 text-center transition-colors hover:bg-green-900/50">
                    <span className="text-sm font-medium text-green-400">
                      🤝 Track Referrals
                    </span>
                  </button>
                  <button className="rounded-lg border border-orange-500/20 bg-orange-900/30 p-3 text-center transition-colors hover:bg-orange-900/50">
                    <span className="text-sm font-medium text-orange-400">
                      ⚡ Automate
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      case "leads":
        return (
          <LeadDiscovery
            onLeadFound={lead => console.log("Lead found:", lead)}
          />
        )
      case "referrals":
        return <ReferralNetwork />
      case "deals":
        return <AIDealDashboard />
      default:
        return (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <Lock className="mx-auto mb-4 size-16 text-yellow-400" />
              <h3 className="mb-4 text-2xl font-bold text-yellow-400">
                Feature Locked
              </h3>
              <p className="mb-6 text-gray-400">
                Upgrade to PRO to unlock this feature
              </p>
              <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 font-bold text-black">
                🔥 Upgrade to PRO
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url('https://cdn.builder.io/api/v1/image/assets%2Fd83998c6a81f466db4fb83ab90c7ba25%2F17fbf771b01940e59f3e060900a7a7b3?format=webp&width=800')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Sidebar */}
      <div className="flex w-80 flex-col border-r border-yellow-500/20 bg-black/50 backdrop-blur-lg">
        {/* Header */}
        <div className="border-b border-yellow-500/20 p-4">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600">
              <span className="text-xl font-bold text-black">SV</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-yellow-400">
                SaintVisionAI™
              </h1>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-yellow-400/20 px-2 py-1 text-xs font-bold text-yellow-400">
                  FREE🔥
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleSidebarClick(item.id)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${
                item.active || activeSection === item.id
                  ? "border border-yellow-500/30 bg-gray-500/50 text-yellow-400"
                  : item.locked
                    ? "border border-yellow-500/10 bg-gray-800/30 text-gray-400 opacity-30 hover:opacity-60"
                    : "border border-yellow-500/10 bg-gray-800/30 text-yellow-400/70 hover:bg-gray-700/40 hover:text-yellow-400"
              }`}
            >
              <item.icon className="size-4 shrink-0" />
              <span className="truncate text-sm font-medium">{item.label}</span>
              {item.locked && (
                <Lock className="ml-auto size-3 shrink-0" />
              )}
            </button>
          ))}
        </div>

        {/* Upgrade Section */}
        <div className="border-t border-yellow-500/20 p-4">
          <div className="mb-4 text-center">
            <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600">
              <span className="text-lg font-bold text-black">SV</span>
            </div>
            <h3 className="mb-1 text-lg font-bold text-yellow-400">
              Upgrade to Unlimited
            </h3>
            <p className="mb-3 text-sm text-gray-400">
              Generate Premium Content by upgrading to an unlimited plan!
            </p>
            <Button
              className="w-full rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-600 py-3 font-bold text-black"
              onClick={() =>
                alert(
                  "🔥 Upgrade to PRO for $27/month!\n\nUnlock:\n• Unlimited AI Companion\n• All Premium Features\n• Priority Support"
                )
              }
            >
              Get started with PRO
            </Button>
            <p className="mt-2 text-sm text-gray-400">Join 80,000+ users now</p>
          </div>
        </div>

        {/* User Profile */}
        <div className="border-t border-yellow-500/20 p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-gray-500">
              <span className="text-sm font-bold text-yellow-400">AP</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-yellow-400">
                Saint Gottaguy
              </div>
            </div>
            <div className="flex size-10 items-center justify-center rounded-full border border-yellow-500/30">
              <ChevronRight className="size-4 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="flex h-16 items-center justify-between border-b border-yellow-500/20 bg-black/30 px-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-yellow-400">
              {sidebarItems.find(item => item.id === activeSection)?.label ||
                "Dashboard"}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-yellow-400 hover:text-yellow-300"
            >
              🏠 Home
            </Link>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">{renderMainContent()}</div>
      </div>
    </div>
  )
}
