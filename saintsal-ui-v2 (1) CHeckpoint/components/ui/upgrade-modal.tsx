"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  triggerReason?: "usage_limit" | "companion_access" | "pro_features"
}

export function UpgradeModal({
  isOpen,
  onClose,
  triggerReason = "usage_limit"
}: UpgradeModalProps) {
  if (!isOpen) return null

  const getTriggerMessage = () => {
    switch (triggerReason) {
      case "usage_limit":
        return "🔥 You're cooking with gas! Ready to unlock unlimited power?"
      case "companion_access":
        return "😇 Your AI companion is waiting! Unlock your full potential."
      case "pro_features":
        return "👑 Level up to Pro and command your business future!"
      default:
        return "✨ Ready to unlock your full Saint potential?"
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex-1 text-center">
            <h2 className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-3xl font-bold text-transparent">
              ✨ Your Saint Journey Awaits ✨
            </h2>
            <p className="mt-2 text-sm text-gray-400">{getTriggerMessage()}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Pricing Tiers */}
        <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Free Tier */}
          <div className="rounded-lg border border-gray-600/30 bg-gray-800/50 p-4">
            <div className="mb-3 text-center">
              <h4 className="text-lg font-semibold text-green-400">
                🆓 Free Access
              </h4>
              <span className="text-2xl font-bold text-green-400">$0</span>
              <span className="text-sm text-gray-400">/month</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Try GPT-4 Turbo (limited)</li>
              <li>• Auto fallback to GPT-3.5</li>
              <li>• Basic prompts, no memory</li>
              <li>• Upgrade prompt on overuse</li>
            </ul>
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-500">Current Plan</span>
            </div>
          </div>

          {/* Companion Tier - HIGHLIGHTED */}
          <div className="relative scale-105 rounded-lg border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 p-4">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
              MOST POPULAR
            </div>
            <div className="mb-3 text-center">
              <h4 className="text-lg font-semibold text-yellow-400">
                😇 Companion Cognitive
              </h4>
              <span className="text-2xl font-bold text-yellow-400">$27</span>
              <span className="text-sm text-gray-400">/month</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• GPT-4 Turbo (unlocked)</li>
              <li>• Smart Search Engine access</li>
              <li>• Personalized Daily Insights</li>
              <li>• Action prompting + summaries</li>
            </ul>
            <Button className="mt-4 w-full bg-gradient-to-r from-yellow-500 to-yellow-600 font-bold text-black hover:from-yellow-400 hover:to-yellow-500">
              🔥 Unlock Your Companion
            </Button>
          </div>

          {/* Pro Tier */}
          <div className="rounded-lg border border-blue-500/30 bg-blue-900/30 p-4">
            <div className="mb-3 text-center">
              <h4 className="text-lg font-semibold text-blue-400">
                👑 Command Your Future
              </h4>
              <span className="text-2xl font-bold text-blue-400">$97</span>
              <span className="text-sm text-gray-400">/month</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Full CRM Dashboard</li>
              <li>• Voice Chat (Twilio-enabled)</li>
              <li>• Client/Lead Manager</li>
              <li>• Smart Assistant Workflows</li>
            </ul>
            <Button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-700 font-bold text-white hover:from-blue-500 hover:to-blue-600">
              👑 Go Pro
            </Button>
          </div>

          {/* Strategic Tier */}
          <div className="rounded-lg border border-purple-500/30 bg-purple-900/30 p-4">
            <div className="mb-3 text-center">
              <h4 className="text-lg font-semibold text-purple-400">
                🏛️ Strategic Command
              </h4>
              <span className="text-2xl font-bold text-purple-400">$297</span>
              <span className="text-sm text-gray-400">/month</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• 5 Seats Included</li>
              <li>• Leadership Dashboard</li>
              <li>• AI Lead Insights</li>
              <li>• Team Collaboration Tools</li>
            </ul>
            <Button className="mt-4 w-full bg-gradient-to-r from-purple-600 to-purple-700 font-bold text-white hover:from-purple-500 hover:to-purple-600">
              🏛️ Command Center
            </Button>
          </div>

          {/* White Label Elite */}
          <div className="rounded-lg border border-amber-500/30 bg-gradient-to-r from-amber-500/20 to-amber-600/20 p-4">
            <div className="mb-3 text-center">
              <h4 className="text-lg font-semibold text-amber-400">
                🌟 White Label Elite
              </h4>
              <span className="text-2xl font-bold text-amber-400">$497</span>
              <span className="text-sm text-gray-400">/month</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Custom Branding</li>
              <li>• Subaccount Control</li>
              <li>• Up to 10 Users Included</li>
              <li>• Private CRM + API Support</li>
            </ul>
            <Button className="mt-4 w-full bg-gradient-to-r from-amber-600 to-amber-700 font-bold text-white hover:from-amber-500 hover:to-amber-600">
              🌟 Go Elite
            </Button>
          </div>

          {/* Enterprise */}
          <div className="rounded-lg border border-red-500/30 bg-gradient-to-r from-red-900/30 to-pink-900/30 p-4">
            <div className="mb-3 text-center">
              <h4 className="text-lg font-semibold text-red-400">
                🚀 Enterprise
              </h4>
              <span className="text-xl font-bold text-red-400">Custom</span>
              <span className="block text-sm text-gray-400">Pricing</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Dedicated Infrastructure</li>
              <li>• Onboarding + Account Exec</li>
              <li>• Usage-Based Scaling</li>
              <li>• Strategic AI Architecture</li>
            </ul>
            <Button className="mt-4 w-full bg-gradient-to-r from-red-600 to-red-700 font-bold text-white hover:from-red-500 hover:to-red-600">
              🚀 Contact Sales
            </Button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="rounded-lg border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 p-4 text-center">
          <h3 className="mb-2 text-lg font-bold text-yellow-400">
            ✨ Start Free → Unlock Your Companion → Scale to Elite ✨
          </h3>
          <p className="mb-3 text-sm text-gray-400">
            Annual pricing includes 2 months free! • GHL integration live •
            Domains: saintvisionai.com + companion.saintvisionai.com
          </p>
          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-gray-400 hover:text-white"
            >
              Continue Free Trial
            </Button>
            <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 font-bold text-black hover:from-yellow-400 hover:to-yellow-500">
              🔥 Unlock Companion Now - $27/mo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
