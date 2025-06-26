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
          <div className="flex h-full flex-col">
            {chatMessages.length === 0 ? (
              <div className="relative flex h-full flex-col items-center justify-center">
                <div className="top-50% left-50% -translate-x-50% -translate-y-50% absolute mb-20 flex flex-col items-center">
                  <div className="text-center">
                    <h2 className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-3xl font-bold text-transparent">
                      Your GOTTA GUY™ Companion
                    </h2>
                    <p className="mt-2 text-lg font-medium text-yellow-400/80">
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
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <h3 className="mb-4 text-2xl font-bold text-yellow-400">
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
        <div className="flex-1 space-y-2 overflow-y-auto p-3">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleSidebarClick(item.id)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${
                item.active || activeSection === item.id
                  ? "border border-yellow-500/30 bg-gray-500/50 text-yellow-400"
                  : item.locked
                    ? "border border-yellow-500/10 bg-gray-800/30 text-gray-400 opacity-30"
                    : "border border-yellow-500/10 bg-gray-800/30 text-yellow-400/70 hover:bg-gray-700/40 hover:text-yellow-400"
              }`}
              disabled={item.locked && item.id !== "upgrade"}
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
            <Button className="w-full rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-600 py-3 font-bold text-black">
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
