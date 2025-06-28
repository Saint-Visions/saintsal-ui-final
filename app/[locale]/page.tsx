"use client"

import { IconArrowRight } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"

export default function HomePage() {
  const router = useRouter()
  const [showLeadRouter, setShowLeadRouter] = useState(false)

  const handleStartCookin = () => {
    console.log("🔥 Start Cookin button clicked!")

    try {
      const isBuilderPreview =
        typeof window !== "undefined" &&
        (window.location.hostname.includes("builder") ||
          window.location.hostname.includes("fly.dev") ||
          window.location.href.includes("projects.builder.codes"))

      if (isBuilderPreview) {
        window.open("http://localhost:3000/en/workspace1/operations", "_blank")
      } else {
        router.push("/en/workspace1/operations")
      }
    } catch (error) {
      console.error("Navigation error:", error)
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

  const handleGetExtension = () => {
    window.open(
      "https://chrome.google.com/webstore/detail/partnertech-ai",
      "_blank"
    )
  }

  if (showLeadRouter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12 px-6">
        <div className="mb-8 text-center">
          <button
            onClick={() => setShowLeadRouter(false)}
            className="text-gray-400 hover:text-white"
          >
            ← Back to Homepage
          </button>
        </div>
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Smart Lead Router</h2>
          <p>Coming soon - intelligent lead qualification and routing!</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="flex size-full flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('https://cdn.builder.io/api/v1/image/assets%2Fd83998c6a81f466db4fb83ab90c7ba25%2Fe25bface0e514ede908be8dc550038cd?format=webp&width=800')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
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

      {/* Triple CTA Buttons */}
      <div className="mt-8 flex flex-col md:flex-row gap-4 items-center">
        {/* Chrome Extension CTA */}
        <button
          onClick={handleGetExtension}
          className="group relative flex w-[280px] cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:from-green-400 hover:to-emerald-500 hover:shadow-green-500/25"
        >
          <span className="text-lg">🧩 Get Chrome Extension</span>
          <IconArrowRight
            className="ml-2 transition-transform duration-300 group-hover:translate-x-2"
            size={20}
          />
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 opacity-30 blur transition duration-300 group-hover:opacity-70"></div>
        </button>

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
          <IconArrowRight
            className="ml-2 transition-transform duration-300 group-hover:translate-x-2"
            size={20}
          />
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-30 blur transition duration-300 group-hover:opacity-70"></div>
        </button>
      </div>

      {/* Smart Lead Router CTA */}
      <div className="mt-6">
        <button
          onClick={() => setShowLeadRouter(true)}
          className="group relative flex cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 px-8 py-3 font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:from-purple-400 hover:to-pink-500"
        >
          <span className="text-base">🎯 Smart Lead Intake</span>
          <span className="ml-2 text-base">🧠</span>
        </button>
        <p className="mt-2 text-center text-sm text-gray-400">
          AI-powered routing • Get qualified in 60 seconds
        </p>
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

      {/* Call to Action Section */}
      <div className="mt-16 text-center max-w-3xl px-6">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Transform Your Lead Generation?
        </h2>
        <p className="text-gray-300 text-lg mb-8">
          Join the patent-protected platform that goes beyond data collection to
          <span className="text-green-400 font-semibold">
            {" "}
            execute real business actions
          </span>
          .
        </p>

        {/* Final CTA Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleGetExtension}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            🧩 Get Extension
            <div className="text-xs mt-1 opacity-80">Instant access</div>
          </button>
          <button
            onClick={() => setShowLeadRouter(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            🎯 Get Qualified
            <div className="text-xs mt-1 opacity-80">60-second intake</div>
          </button>
          <button
            onClick={handleSaaSOnboarding}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            🚀 Full Platform
            <div className="text-xs mt-1 opacity-80">Multi-tenant SaaS</div>
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-400">
          14-day free trial • No credit card required • Chrome Web Store
          approved
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
