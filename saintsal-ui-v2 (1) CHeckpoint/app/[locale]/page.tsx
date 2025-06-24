import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      {/* SaintSal Logo */}
      <div className="mb-8 flex flex-col items-center">
        <div className="relative mb-6">
          <Image
            src="https://cdn.builder.io/api/v1/assets/d83998c6a81f466db4fb83ab90c7ba25/real_svt_logo-d03762?format=webp&width=800"
            alt="SaintSal Logo"
            width={280}
            height={280}
            className="drop-shadow-2xl"
            priority
          />
        </div>

        {/* Brand Name */}
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-5xl font-bold text-transparent drop-shadow-lg">
            SAINTSAL™
          </h1>
          <p className="mt-2 text-xl font-medium text-yellow-400/80">
            Cookin' Knowledge.
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col items-center gap-4 max-w-md">
        {/* Primary CTA - Operations Dashboard */}
        <Link
          href="/en/workspace1/operations"
          className="group relative flex w-full max-w-[320px] items-center justify-center rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-4 font-bold text-black shadow-2xl transition-all duration-300 hover:from-yellow-400 hover:to-yellow-500 hover:scale-105 hover:-translate-y-1"
        >
          <span className="text-lg">🔥 Start Cookin - Operations</span>
          <svg
            className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>

          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-300 -z-10"></div>
        </Link>

        {/* Secondary Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            href="/en/workspace1/chat"
            className="flex-1 rounded-lg bg-blue-600/20 border border-blue-500/30 px-6 py-3 text-center font-semibold text-blue-400 transition-all hover:bg-blue-600/30 hover:border-blue-400/50"
          >
            💬 AI Chat
          </Link>

          <Link
            href="/en/login"
            className="flex-1 rounded-lg bg-green-600/20 border border-green-500/30 px-6 py-3 text-center font-semibold text-green-400 transition-all hover:bg-green-600/30 hover:border-green-400/50"
          >
            🔐 Sign In
          </Link>
        </div>

        {/* Quick Access Links */}
        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm mb-2">Quick Access:</p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <Link
              href="/en/pricing"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              💰 Pricing
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href="/en/setup"
              className="text-cyan-400 hover:text-cyan-300 underline"
            >
              ⚙️ Setup
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href="/en/help"
              className="text-orange-400 hover:text-orange-300 underline"
            >
              ❓ Help
            </Link>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="mt-12 max-w-4xl">
        <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
          🚀 AI-Powered Business Platform
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🔍</div>
            <div className="text-blue-400 font-semibold text-sm">
              Lead Discovery
            </div>
            <div className="text-gray-400 text-xs">AI-powered lookup</div>
          </div>
          <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🤝</div>
            <div className="text-green-400 font-semibold text-sm">
              Referral Network
            </div>
            <div className="text-gray-400 text-xs">Partner tracking</div>
          </div>
          <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-purple-400 font-semibold text-sm">
              AI Deal Analysis
            </div>
            <div className="text-gray-400 text-xs">GPT-4 insights</div>
          </div>
          <div className="bg-pink-900/20 border border-pink-500/20 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">📱</div>
            <div className="text-pink-400 font-semibold text-sm">
              Mobile Export
            </div>
            <div className="text-gray-400 text-xs">iOS/Android apps</div>
          </div>
        </div>
      </div>

      {/* Status Message */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 bg-green-900/20 border border-green-500/20 rounded-lg px-4 py-2">
          <span className="text-green-400 font-semibold">
            ✅ All Systems Online
          </span>
        </div>
        <p className="text-gray-400 text-sm mt-2">
          SaintSal™ Platform • Ready for Business
        </p>
      </div>
    </div>
  )
}
