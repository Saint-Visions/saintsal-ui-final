"use client"

import { IconArrowRight } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const { theme } = useTheme()
  const router = useRouter()

  const handleStartCookin = () => {
    console.log("🔥 Start Cookin button clicked!")

    try {
      // Check if we're in Builder.io preview environment
      const isBuilderPreview =
        typeof window !== "undefined" &&
        (window.location.hostname.includes("builder") ||
          window.location.hostname.includes("fly.dev") ||
          window.location.href.includes("projects.builder.codes"))

      console.log(
        "Environment detected:",
        isBuilderPreview ? "Builder.io Preview" : "Local/Production"
      )

      if (isBuilderPreview) {
        // In Builder.io preview, open in new tab to local server
        console.log("Opening operations dashboard in new tab...")
        window.open("http://localhost:3000/en/workspace1/operations", "_blank")
      } else {
        // In normal environment, use Next.js router
        console.log("Navigating with Next.js router...")
        router.push("/en/workspace1/operations")
      }
    } catch (error) {
      console.error("Navigation error:", error)
      // Ultimate fallback - direct navigation
      window.location.href = "/en/workspace1/operations"
    }
  }

  const handleSaaSOnboarding = () => {
    console.log("🚀 SaaS Setup button clicked!")
    try {
      router.push("/en/onboarding")
    } catch (error) {
      console.error("Navigation error:", error)
      window.location.href = "/en/onboarding"
    }
  }

  return (
    <div className="flex size-full flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Patent Badge */}
      <div className="mb-4 flex items-center">
        <div className="bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-2 text-black font-bold rounded-full">
          👑 Patent #10,290,222 Protected
        </div>
      </div>

      {/* SaintSal Logo */}
      <div className="mb-6 flex flex-col items-center">
        <div className="relative mb-4">
          <Image
            src="https://cdn.builder.io/api/v1/assets/d83998c6a81f466db4fb83ab90c7ba25/real_svt_logo-d03762?format=webp&width=800"
            alt="SaintSal Logo"
            width={320}
            height={320}
            className="drop-shadow-2xl"
            priority
          />
        </div>

        {/* Enhanced Brand Section */}
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-5xl font-bold text-transparent drop-shadow-lg">
            PartnerTech.ai
          </h1>
          <div className="mt-2 flex items-center justify-center gap-2">
            <p className="text-xl font-medium text-yellow-400/80">
              Powered by SAINTSAL™
            </p>
            <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
              LIVE
            </span>
          </div>

          {/* Value Proposition */}
          <p className="mt-4 max-w-2xl text-lg text-gray-300">
            The only{" "}
            <span className="text-yellow-400 font-semibold">
              intent-triggered SaaS platform
            </span>{" "}
            that
            <span className="text-green-400 font-semibold">
              {" "}
              executes actions
            </span>
            , not just collects data.
          </p>

          {/* Competitive Advantage */}
          <div className="mt-3 flex items-center justify-center gap-4">
            <div className="flex items-center text-sm text-gray-400">
              <span className="text-red-400 line-through mr-2">
                Seamless.ai style
              </span>
              <span className="text-green-400 font-semibold">
                + AI Automation
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dual CTA Buttons */}
      <div className="mt-8 flex flex-col md:flex-row gap-4 items-center">
        {/* Operations Dashboard CTA */}
        <button
          onClick={handleStartCookin}
          className="group relative flex w-[280px] cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-4 font-bold text-black shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:from-yellow-400 hover:to-yellow-500 hover:shadow-yellow-500/25"
        >
          <span className="text-lg">🔥 Start Cookin - Operations</span>
          <IconArrowRight
            className="ml-2 transition-transform duration-300 group-hover:translate-x-2"
            size={20}
          />
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-30 blur transition duration-300 group-hover:opacity-70"></div>
        </button>

        {/* SaaS Onboarding CTA */}
        <button
          onClick={handleSaaSOnboarding}
          className="group relative flex w-[280px] cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:from-blue-400 hover:to-purple-500 hover:shadow-blue-500/25"
        >
          <span className="text-lg">🚀 SaaS Multi-Tenant Setup</span>
          <IconRocket
            className="ml-2 transition-transform duration-300 group-hover:translate-x-2"
            size={20}
          />
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-30 blur transition duration-300 group-hover:opacity-70"></div>
        </button>
      </div>

      {/* Platform Advantages */}
      <div className="mx-auto mt-12 max-w-6xl px-6">
        <h3 className="mb-8 text-center text-3xl font-bold text-white">
          🚀 Beyond Lead Collection - We{" "}
          <span className="text-green-400">Execute Actions</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Intent Discovery */}
          <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-900/30 to-blue-800/20 p-6 text-center transition-all hover:scale-105">
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20">
              <IconBrain className="size-6 text-blue-400" />
            </div>
            <h4 className="mb-2 text-lg font-semibold text-blue-400">
              Intent Signals
            </h4>
            <p className="text-sm text-gray-300 mb-3">
              Track hiring, funding, expansion, tech changes in real-time
            </p>
            <Badge className="bg-blue-500/20 text-blue-400 text-xs">
              vs Seamless: Static data
            </Badge>
          </div>

          {/* AI Companion */}
          <div className="rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-900/30 to-purple-800/20 p-6 text-center transition-all hover:scale-105">
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/20">
              <IconZap className="size-6 text-purple-400" />
            </div>
            <h4 className="mb-2 text-lg font-semibold text-purple-400">
              Sticky AI Companion
            </h4>
            <p className="text-sm text-gray-300 mb-3">
              Always-on assistant with context memory across apps
            </p>
            <Badge className="bg-purple-500/20 text-purple-400 text-xs">
              Patent Protected
            </Badge>
          </div>

          {/* Automation Engine */}
          <div className="rounded-xl border border-green-500/20 bg-gradient-to-br from-green-900/30 to-green-800/20 p-6 text-center transition-all hover:scale-105">
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20">
              <IconRocket className="size-6 text-green-400" />
            </div>
            <h4 className="mb-2 text-lg font-semibold text-green-400">
              Action Triggers
            </h4>
            <p className="text-sm text-gray-300 mb-3">
              Auto-email, SMS, calls, LinkedIn outreach with AI routing
            </p>
            <Badge className="bg-green-500/20 text-green-400 text-xs">
              vs Seamless: Manual only
            </Badge>
          </div>

          {/* Multi-Tenant SaaS */}
          <div className="rounded-xl border border-yellow-500/20 bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 p-6 text-center transition-all hover:scale-105">
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500/20">
              <IconCrown className="size-6 text-yellow-400" />
            </div>
            <h4 className="mb-2 text-lg font-semibold text-yellow-400">
              Enterprise SaaS
            </h4>
            <p className="text-sm text-gray-300 mb-3">
              Multi-tenant, custom domains, Stripe billing, team roles
            </p>
            <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">
              Production Ready
            </Badge>
          </div>
        </div>
      </div>

      {/* Social Proof & Trust Signals */}
      <div className="mt-12 text-center">
        <div className="mb-4 flex justify-center items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">$297-$1197</div>
            <div className="text-sm text-gray-400">Monthly SaaS Tiers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              Azure Enterprise
            </div>
            <div className="text-sm text-gray-400">Infrastructure Ready</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              Patent Protected
            </div>
            <div className="text-sm text-gray-400">Competitive Moat</div>
          </div>
        </div>
      </div>

      {/* Enhanced Feature Grid */}
      <div className="mx-auto mt-12 max-w-4xl px-6">
        <h3 className="mb-6 text-center text-2xl font-bold text-white">
          🔧 Complete SaaS Platform Features
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-blue-500/20 bg-blue-900/20 p-4 text-center">
            <div className="mb-2 text-3xl">🎯</div>
            <div className="text-sm font-semibold text-blue-400">
              Intent Discovery
            </div>
            <div className="text-xs text-gray-400">Real-time signals</div>
          </div>
          <div className="rounded-lg border border-green-500/20 bg-green-900/20 p-4 text-center">
            <div className="mb-2 text-3xl">🤖</div>
            <div className="text-sm font-semibold text-green-400">
              Dual AI Assistants
            </div>
            <div className="text-xs text-gray-400">Saint/Sal/Dual modes</div>
          </div>
          <div className="rounded-lg border border-purple-500/20 bg-purple-900/20 p-4 text-center">
            <div className="mb-2 text-3xl">⚡</div>
            <div className="text-sm font-semibold text-purple-400">
              Action Automation
            </div>
            <div className="text-xs text-gray-400">Email/SMS/Calls</div>
          </div>
          <div className="rounded-lg border border-yellow-500/20 bg-yellow-900/20 p-4 text-center">
            <div className="mb-2 text-3xl">💳</div>
            <div className="text-sm font-semibold text-yellow-400">
              Stripe Billing
            </div>
            <div className="text-xs text-gray-400">3-tier SaaS</div>
          </div>
          <div className="rounded-lg border border-pink-500/20 bg-pink-900/20 p-4 text-center">
            <div className="mb-2 text-3xl">🏢</div>
            <div className="text-sm font-semibold text-pink-400">
              Multi-Tenant
            </div>
            <div className="text-xs text-gray-400">Custom domains</div>
          </div>
          <div className="rounded-lg border border-indigo-500/20 bg-indigo-900/20 p-4 text-center">
            <div className="mb-2 text-3xl">📊</div>
            <div className="text-sm font-semibold text-indigo-400">
              Analytics
            </div>
            <div className="text-xs text-gray-400">MRR/ARR tracking</div>
          </div>
          <div className="rounded-lg border border-cyan-500/20 bg-cyan-900/20 p-4 text-center">
            <div className="mb-2 text-3xl">🎨</div>
            <div className="text-sm font-semibold text-cyan-400">
              Custom Branding
            </div>
            <div className="text-xs text-gray-400">White-label ready</div>
          </div>
          <div className="rounded-lg border border-orange-500/20 bg-orange-900/20 p-4 text-center">
            <div className="mb-2 text-3xl">🔗</div>
            <div className="text-sm font-semibold text-orange-400">
              API Integrations
            </div>
            <div className="text-xs text-gray-400">Webhooks ready</div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-16 text-center max-w-3xl px-6">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Build Your SaaS Empire?
        </h2>
        <p className="text-gray-300 text-lg mb-8">
          Join the patent-protected platform that goes beyond data collection to
          <span className="text-green-400 font-semibold">
            {" "}
            execute real business actions
          </span>
          .
        </p>

        {/* Final CTA */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleSaaSOnboarding}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            🚀 Start Your SaaS Journey
          </button>
          <div className="text-sm text-gray-400">
            14-day free trial • No credit card required
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pb-8 text-center">
        <p className="text-gray-500 text-sm">
          © 2024 Saint Vision Technologies • Patent #10,290,222 • Enterprise
          Ready
        </p>
      </div>
    </div>
  )
}
