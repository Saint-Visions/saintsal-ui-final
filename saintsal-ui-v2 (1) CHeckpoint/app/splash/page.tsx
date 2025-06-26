import Link from "next/link"
import { Brand } from "@/components/ui/brand"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Welcome to SaintVisionAI™",
  description:
    "Inside these walls, AI doesn't just answer. It adapts. It empowers. It becomes..."
}

export default function SplashPage() {
  return (
    <div
      className="flex min-h-screen w-full"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('https://cdn.builder.io/api/v1/image/assets%2Fd83998c6a81f466db4fb83ab90c7ba25%2F543d5cd50df1486fb29085099a83f6c2?format=webp&width=800')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="mx-auto flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-4xl">
        {/* Main Welcome Container */}
        <div className="rounded-xl border border-yellow-500/20 bg-black/40 p-12 text-center shadow-2xl backdrop-blur-lg">
          <Brand />

          {/* Main Headline */}
          <div className="my-8">
            <h1 className="mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
              WELCOME TO
            </h1>
            <h1 className="mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-6xl font-bold text-transparent md:text-7xl">
              SaintVisionAI
            </h1>
            <p className="text-lg font-medium text-yellow-400/70">
              Powered by SaintSal™
            </p>
          </div>

          {/* Core Message */}
          <div className="mb-8 rounded-lg border border-yellow-500/30 bg-gradient-to-r from-gray-900/50 to-gray-800/50 p-8">
            <p className="mb-2 text-xl font-bold leading-relaxed text-gray-200 md:text-2xl">
              "INSIDE THESE WALLS, AI DOESN'T JUST
            </p>
            <p className="mb-6 text-xl font-bold leading-relaxed text-gray-200 md:text-2xl">
              ANSWER. IT ADAPTS. IT EMPOWERS. IT
            </p>
            <p className="mb-8 text-xl font-bold leading-relaxed text-gray-200 md:text-2xl">
              BECOMES..."
            </p>

            {/* Value Props */}
            <div className="flex flex-col items-center justify-center gap-6 text-lg font-bold text-yellow-400 md:flex-row">
              <span>REAL KNOWLEDGE</span>
              <span className="text-2xl">🧠</span>
              <span>REAL GROWTH</span>
              <span className="text-yellow-400">•</span>
              <span>REAL POWER</span>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mb-8">
            <p className="mb-6 text-lg font-semibold text-yellow-400 md:text-xl">
              READY TO MOVE SMARTER TODAY THAN YOU DID YESTERDAY?
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/en/signup"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-4 text-lg font-bold text-black shadow-lg transition-all duration-300 hover:from-yellow-400 hover:to-yellow-500"
              >
                🚀 BECOME A SAINT
              </Link>

              <Link
                href="/en/login"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:from-blue-500 hover:to-blue-600"
              >
                😇 WELCOME BACK, SAINT
              </Link>
            </div>
          </div>

          {/* Elite Features Preview */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-blue-500/20 bg-blue-900/30 p-4">
              <div className="mb-2 text-3xl">🧠</div>
              <div className="text-sm font-semibold text-blue-400">
                Azure Cognitive
              </div>
              <div className="text-xs text-gray-400">Advanced AI Reasoning</div>
            </div>
            <div className="rounded-lg border border-green-500/20 bg-green-900/30 p-4">
              <div className="mb-2 text-3xl">⚡</div>
              <div className="text-sm font-semibold text-green-400">
                OpenAI GPT-4o
              </div>
              <div className="text-xs text-gray-400">
                Lightning-Fast Responses
              </div>
            </div>
            <div className="rounded-lg border border-purple-500/20 bg-purple-900/30 p-4">
              <div className="mb-2 text-3xl">👑</div>
              <div className="text-sm font-semibold text-purple-400">
                Elite Access
              </div>
              <div className="text-xs text-gray-400">Saints-Only Features</div>
            </div>
          </div>

          {/* Institution Status */}
          <div className="mt-8 border-t border-gray-700 pt-6">
            <div className="inline-flex items-center gap-2 rounded-lg border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 px-4 py-2">
              <span className="text-sm font-semibold text-yellow-400">
                ✨ AI Research Institute Active
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              Premium AI Infrastructure • Saints-Only Access • Ready for Elite
              Members
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
