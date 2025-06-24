import Link from "next/link"
import { Brand } from "@/components/ui/brand"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Welcome to SaintVisionAI™",
  description: "Your strategic partner for a smarter, bolder future"
}

export default function SplashPage() {
  return (
    <div
      className="flex w-full min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('https://cdn.builder.io/api/v1/image/assets%2Fd83998c6a81f466db4fb83ab90c7ba25%2F543d5cd50df1486fb29085099a83f6c2?format=webp&width=800')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-4xl mx-auto">
        {/* Main Welcome Container */}
        <div className="bg-black/40 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-12 shadow-2xl text-center">
          <Brand />

          {/* Main Headline */}
          <div className="mt-8 mb-8">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
              WELCOME TO
            </h1>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
              SaintVisionAI
            </h1>
            <p className="text-lg text-yellow-400/70 font-medium">
              Powered by SaintSal™
            </p>
          </div>

          {/* Core Message */}
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-yellow-500/30 rounded-lg p-8 mb-8">
            <p className="text-xl md:text-2xl text-gray-200 font-bold leading-relaxed mb-2">
              "INSIDE THESE WALLS, AI DOESN'T JUST
            </p>
            <p className="text-xl md:text-2xl text-gray-200 font-bold leading-relaxed mb-6">
              ANSWER. IT ADAPTS. IT EMPOWERS. IT
            </p>
            <p className="text-xl md:text-2xl text-gray-200 font-bold leading-relaxed mb-8">
              BECOMES..."
            </p>

            {/* Value Props */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-yellow-400 font-bold text-lg">
              <span>REAL KNOWLEDGE</span>
              <span className="text-2xl">🧠</span>
              <span>REAL GROWTH</span>
              <span className="text-yellow-400">•</span>
              <span>REAL POWER</span>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mb-8">
            <p className="text-lg md:text-xl text-yellow-400 font-semibold mb-6">
              READY TO MOVE SMARTER TODAY THAN YOU DID YESTERDAY?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/en/signup"
                className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-lg font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-lg"
              >
                🚀 BECOME A SAINT
              </Link>

              <Link
                href="/en/login"
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-lg"
              >
                😇 WELCOME BACK, SAINT
              </Link>
            </div>
          </div>

          {/* Elite Features Preview */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-blue-900/30 border border-blue-500/20 rounded-lg p-4">
              <div className="text-3xl mb-2">🧠</div>
              <div className="text-blue-400 font-semibold text-sm">
                Azure Cognitive
              </div>
              <div className="text-gray-400 text-xs">Advanced AI Reasoning</div>
            </div>
            <div className="bg-green-900/30 border border-green-500/20 rounded-lg p-4">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-green-400 font-semibold text-sm">
                OpenAI GPT-4o
              </div>
              <div className="text-gray-400 text-xs">
                Lightning-Fast Responses
              </div>
            </div>
            <div className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-4">
              <div className="text-3xl mb-2">👑</div>
              <div className="text-purple-400 font-semibold text-sm">
                Elite Access
              </div>
              <div className="text-gray-400 text-xs">Saints-Only Features</div>
            </div>
          </div>

          {/* Institution Status */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-lg px-4 py-2">
              <span className="text-yellow-400 font-semibold text-sm">
                ✨ AI Research Institute Active
              </span>
            </div>
            <p className="text-gray-400 text-xs mt-2">
              Premium AI Infrastructure • Saints-Only Access • Ready for Elite
              Members
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
