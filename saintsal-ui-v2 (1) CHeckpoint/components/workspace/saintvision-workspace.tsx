"use client"

import { useState, useContext } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Brand } from "@/components/ui/brand"
import { Button } from "@/components/ui/button"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatUI } from "@/components/chat/chat-ui"
import { ChatHelp } from "@/components/chat/chat-help"
import { ChatSettings } from "@/components/chat/chat-settings"
import { QuickSettings } from "@/components/chat/quick-settings"
import { SaintSalOperationsDashboard } from "@/components/operations/sainsal-operations-dashboard"
import { LeadDiscovery } from "@/components/leads/lead-discovery"
import { ReferralNetwork } from "@/components/referrals/referral-network"
import { AIDealDashboard } from "@/components/deals/ai-deal-dashboard"
import { useChatHandler } from "@/components/chat/chat-hooks/use-chat-handler"
import { ChatbotUIContext } from "@/context/context"
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
  ChevronRight
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

export function SaintVisionWorkspace() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const { chatMessages } = useContext(ChatbotUIContext)
  const { handleNewChat, handleFocusChatInput } = useChatHandler()
  const router = useRouter()

  const handleSidebarClick = (itemId: string) => {
    if (itemId === "logout") {
      router.push("/en/login")
      return
    }

    if (itemId === "upgrade") {
      // Show upgrade modal
      return
    }

    // For locked items, show upgrade prompt
    const item = sidebarItems.find(i => i.id === itemId)
    if (item?.locked) {
      // Show upgrade prompt
      console.log("Upgrade required for:", item.label)
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
          <div className="h-full flex flex-col">
            {chatMessages.length === 0 ? (
              <div className="relative flex h-full flex-col items-center justify-center">
                <div className="top-50% left-50% -translate-x-50% -translate-y-50% absolute mb-20 flex flex-col items-center">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                      Your GOTTA GUY™ Companion
                    </h2>
                    <p className="mt-2 text-lg text-yellow-400/80 font-medium">
                      Azure Cognitive + OpenAI GPT-4o
                    </p>
                  </div>
                </div>

                <div className="w-full min-w-[300px] items-end px-2 pb-3 pt-0 sm:w-[600px] sm:pb-8 sm:pt-5 md:w-[700px] lg:w-[700px] xl:w-[800px]">
                  <ChatInput />
                </div>
              </div>
            ) : (
              <ChatUI />
            )}
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
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                Coming Soon
              </h3>
              <p className="text-gray-400">
                This feature is under development.
              </p>
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
                    ? "bg-gray-800/30 text-gray-400 opacity-30 border border-yellow-500/10"
                    : "bg-gray-800/30 text-yellow-400/70 border border-yellow-500/10 hover:bg-gray-700/40 hover:text-yellow-400"
              }`}
              disabled={item.locked && item.id !== "upgrade"}
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
            <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-2xl py-3">
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
            <QuickSettings />
            <ChatSettings />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">{renderMainContent()}</div>
      </div>

      {/* Chat Help (floating) */}
      {activeSection === "companion" && (
        <div className="absolute bottom-4 right-4">
          <ChatHelp />
        </div>
      )}
    </div>
  )
}
