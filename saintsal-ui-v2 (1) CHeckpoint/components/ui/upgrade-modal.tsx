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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-center flex-1">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              ✨ Your Saint Journey Awaits ✨
            </h2>
            <p className="text-gray-400 text-sm mt-2">{getTriggerMessage()}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Free Tier */}
          <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
            <div className="text-center mb-3">
              <h4 className="font-semibold text-green-400 text-lg">
                🆓 Free Access
              </h4>
              <span className="text-green-400 font-bold text-2xl">$0</span>
              <span className="text-gray-400 text-sm">/month</span>
            </div>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Try GPT-4 Turbo (limited)</li>
              <li>• Auto fallback to GPT-3.5</li>
              <li>• Basic prompts, no memory</li>
              <li>• Upgrade prompt on overuse</li>
            </ul>
            <div className="mt-4 text-center">
              <span className="text-gray-500 text-sm">Current Plan</span>
            </div>
          </div>

          {/* Companion Tier - HIGHLIGHTED */}
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-2 border-yellow-500/50 rounded-lg p-4 relative transform scale-105">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
              MOST POPULAR
            </div>
            <div className="text-center mb-3">
              <h4 className="font-semibold text-yellow-400 text-lg">
                😇 Companion Cognitive
              </h4>
              <span className="text-yellow-400 font-bold text-2xl">$27</span>
              <span className="text-gray-400 text-sm">/month</span>
            </div>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• GPT-4 Turbo (unlocked)</li>
              <li>• Smart Search Engine access</li>
              <li>• Personalized Daily Insights</li>
              <li>• Action prompting + summaries</li>
            </ul>
            <Button className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold hover:from-yellow-400 hover:to-yellow-500">
              🔥 Unlock Your Companion
            </Button>
          </div>

          {/* Pro Tier */}
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
            <div className="text-center mb-3">
              <h4 className="font-semibold text-blue-400 text-lg">
                👑 Command Your Future
              </h4>
              <span className="text-blue-400 font-bold text-2xl">$97</span>
              <span className="text-gray-400 text-sm">/month</span>
            </div>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Full CRM Dashboard</li>
              <li>• Voice Chat (Twilio-enabled)</li>
              <li>• Client/Lead Manager</li>
              <li>• Smart Assistant Workflows</li>
            </ul>
            <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold hover:from-blue-500 hover:to-blue-600">
              👑 Go Pro
            </Button>
          </div>

          {/* Strategic Tier */}
          <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4">
            <div className="text-center mb-3">
              <h4 className="font-semibold text-purple-400 text-lg">
                🏛️ Strategic Command
              </h4>
              <span className="text-purple-400 font-bold text-2xl">$297</span>
              <span className="text-gray-400 text-sm">/month</span>
            </div>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• 5 Seats Included</li>
              <li>• Leadership Dashboard</li>
              <li>• AI Lead Insights</li>
              <li>• Team Collaboration Tools</li>
            </ul>
            <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold hover:from-purple-500 hover:to-purple-600">
              🏛️ Command Center
            </Button>
          </div>

          {/* White Label Elite */}
          <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 rounded-lg p-4">
            <div className="text-center mb-3">
              <h4 className="font-semibold text-amber-400 text-lg">
                🌟 White Label Elite
              </h4>
              <span className="text-amber-400 font-bold text-2xl">$497</span>
              <span className="text-gray-400 text-sm">/month</span>
            </div>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Custom Branding</li>
              <li>• Subaccount Control</li>
              <li>• Up to 10 Users Included</li>
              <li>• Private CRM + API Support</li>
            </ul>
            <Button className="w-full mt-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold hover:from-amber-500 hover:to-amber-600">
              🌟 Go Elite
            </Button>
          </div>

          {/* Enterprise */}
          <div className="bg-gradient-to-r from-red-900/30 to-pink-900/30 border border-red-500/30 rounded-lg p-4">
            <div className="text-center mb-3">
              <h4 className="font-semibold text-red-400 text-lg">
                🚀 Enterprise
              </h4>
              <span className="text-red-400 font-bold text-xl">Custom</span>
              <span className="text-gray-400 text-sm block">Pricing</span>
            </div>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Dedicated Infrastructure</li>
              <li>• Onboarding + Account Exec</li>
              <li>• Usage-Based Scaling</li>
              <li>• Strategic AI Architecture</li>
            </ul>
            <Button className="w-full mt-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold hover:from-red-500 hover:to-red-600">
              🚀 Contact Sales
            </Button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-lg p-4">
          <h3 className="text-yellow-400 font-bold text-lg mb-2">
            ✨ Start Free → Unlock Your Companion → Scale to Elite ✨
          </h3>
          <p className="text-gray-400 text-sm mb-3">
            Annual pricing includes 2 months free! • GHL integration live •
            Domains: saintvisionai.com + companion.saintvisionai.com
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-gray-400 hover:text-white"
            >
              Continue Free Trial
            </Button>
            <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold hover:from-yellow-400 hover:to-yellow-500">
              🔥 Unlock Companion Now - $27/mo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
