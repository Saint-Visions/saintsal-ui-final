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
  { id: "companion", label: "My Companion 🧠", icon: Brain, locked: true },
  { id: "business", label: "My Business 📁", icon: FileText, locked: true },
  { id: "notes", label: "Sticky Notes ✍️", icon: FileText, locked: true },
  { id: "tools", label: "Ai Tools 🛠️🌃", icon: Wrench, locked: true },
  { id: "generator", label: "Image Generator 🤖", icon: Mic, locked: true },
  { id: "launchpad", label: "SVG Launchpad 🚀", icon: Users, locked: true },
  { id: "help", label: "Feedback & Help 🗣️", icon: Settings, locked: true },
  { id: "crm", label: "PartnerTech.ai CRM", icon: CreditCard, locked: true },
  { id: "portal", label: "Client Portal 🏟️", icon: Clock, locked: true },
  {
    id: "institute",
    label: "SVT Institute of AI (R + D) 🏛️",
    icon: Lock,
    locked: true
  },
  { id: "upgrade", label: "Upgrade Tier ⚡️", icon: Lock, locked: true },
  { id: "account", label: "My Account 💫", icon: Lock, locked: true },
  { id: "logout", label: "Logout 👀", icon: LogOut, locked: true }
]

export function SaintVisionWorkspaceSimple() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const router = useRouter()

  const handleSidebarClick = (itemId: string) => {
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

    setActiveSection(itemId)
  }

  const renderMainContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <SaintSalOperationsDashboard />
      case "companion":
        return (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="text-center max-w-2xl">
              <div className="mb-8">
                <Brain className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  Your GOTTA GUY™ Companion
                </h2>
                <p className="mt-2 text-lg text-yellow-400/80 font-medium">
                  Azure Cognitive + OpenAI GPT-4o
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-8">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">
                  Chat Interface Coming Soon
                </h3>
                <p className="text-gray-300 mb-6">
                  Your personal AI companion will provide intelligent responses
                  using:
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-900/30 border border-blue-500/20 rounded-lg p-4">
                    <h4 className="text-blue-400 font-semibold mb-2">
                      Azure Cognitive
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Enterprise-grade AI services
                    </p>
                  </div>
                  <div className="bg-green-900/30 border border-green-500/20 rounded-lg p-4">
                    <h4 className="text-green-400 font-semibold mb-2">
                      OpenAI GPT-4o
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Latest AI language model
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <input
                    type="text"
                    placeholder="Ask your GOTTA GUY™ anything..."
                    className="flex-1 bg-gray-800/50 border border-yellow-500/30 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500"
                    disabled
                  />
                  <Button
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold"
                    disabled
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                </div>

                <p className="text-gray-400 text-sm mt-4">
                  Upgrade to PRO to activate your AI companion
                </p>
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
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Lock className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                Feature Locked
              </h3>
              <p className="text-gray-400 mb-6">
                Upgrade to PRO to unlock this feature
              </p>
              <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold">
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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('https://cdn.builder.io/api/v1/image/assets%2Fd83998c6a81f466db4fb83ab90c7ba25%2F17fbf771b01940e59f3e060900a7a7b3?format=webp&width=800')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Sidebar */}
      <div className="w-80 bg-black/50 backdrop-blur-lg border-r border-yellow-500/20 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-yellow-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center">
              <span className="text-black font-bold text-xl">SV</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-yellow-400">
                SaintVisionAI™
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full font-bold">
                  FREE🔥
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleSidebarClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                item.active || activeSection === item.id
                  ? "bg-gray-500/50 text-yellow-400 border border-yellow-500/30"
                  : item.locked
                    ? "bg-gray-800/30 text-gray-400 opacity-30 border border-yellow-500/10 hover:opacity-60"
                    : "bg-gray-800/30 text-yellow-400/70 border border-yellow-500/10 hover:bg-gray-700/40 hover:text-yellow-400"
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium truncate">{item.label}</span>
              {item.locked && (
                <Lock className="w-3 h-3 ml-auto flex-shrink-0" />
              )}
            </button>
          ))}
        </div>

        {/* Upgrade Section */}
        <div className="p-4 border-t border-yellow-500/20">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
              <span className="text-black font-bold text-lg">SV</span>
            </div>
            <h3 className="text-lg font-bold text-yellow-400 mb-1">
              Upgrade to Unlimited
            </h3>
            <p className="text-sm text-gray-400 mb-3">
              Generate Premium Content by upgrading to an unlimited plan!
            </p>
            <Button
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-2xl py-3"
              onClick={() =>
                alert(
                  "🔥 Upgrade to PRO for $27/month!\n\nUnlock:\n• Unlimited AI Companion\n• All Premium Features\n• Priority Support"
                )
              }
            >
              Get started with PRO
            </Button>
            <p className="text-sm text-gray-400 mt-2">Join 80,000+ users now</p>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-yellow-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
              <span className="text-yellow-400 font-bold text-sm">AP</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-yellow-400">
                Saint Gottaguy
              </div>
            </div>
            <div className="w-10 h-10 border border-yellow-500/30 rounded-full flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 bg-black/30 backdrop-blur-sm border-b border-yellow-500/20 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-yellow-400">
              {sidebarItems.find(item => item.id === activeSection)?.label ||
                "Dashboard"}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-yellow-400 hover:text-yellow-300 text-sm"
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
