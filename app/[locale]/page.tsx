import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div
      className="min-h-screen w-full overflow-y-auto"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url('https://cdn.builder.io/api/v1/image/assets%2Fd83998c6a81f466db4fb83ab90c7ba25%2F0a6aaa015be4440f85c384537eca8462?format=webp&width=800')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex w-full flex-col items-center p-6 pt-40">
        {/* Institutional Messaging - First and Prominent */}
        <div className="mb-8 mt-24 max-w-4xl rounded-xl border border-yellow-500/30 bg-black/50 p-6 text-center shadow-2xl backdrop-blur-lg">
          <p className="mb-2 text-xl font-bold leading-relaxed text-yellow-400 md:text-2xl">
            "SaintSal™ AI doesn't just answer.
          </p>
          <p className="mb-2 text-xl font-bold leading-relaxed text-yellow-400 md:text-2xl">
            It adapts. It empowers. It becomes your...
          </p>
          <p className="text-3xl font-extrabold leading-relaxed text-yellow-300 drop-shadow-lg md:text-4xl">
            GOTTA GUY™!"
          </p>
        </div>

        {/* SaintSal Branding */}
        <div className="mb-8 rounded-xl border border-yellow-500/20 bg-black/40 p-8 shadow-2xl backdrop-blur-lg">
          <div className="flex flex-col items-center">
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
                SaintVisionAI™
              </h1>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-4">
            {/* Primary CTA - Operations Dashboard */}
            <Link
              href="/en/operations"
              className="group relative flex w-full max-w-[320px] items-center justify-center rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-4 font-bold text-black shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:from-yellow-400 hover:to-yellow-500"
            >
              <span className="text-lg">🔥 Start Cooking</span>
              <svg
                className="ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1"
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
              <div className="absolute -inset-0.5 -z-10 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-30 blur transition duration-300 group-hover:opacity-70"></div>
            </Link>

            {/* Secondary Navigation */}
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <Link
                href="/en/workspace1/chat"
                className="flex-1 rounded-lg border border-blue-500/30 bg-blue-600/20 px-6 py-3 text-center font-semibold text-blue-400 transition-all hover:border-blue-400/50 hover:bg-blue-600/30"
              >
                💬 AI Chat
              </Link>

              <Link
                href="/en/login"
                className="flex-1 rounded-lg border border-green-500/30 bg-green-600/20 px-6 py-3 text-center font-semibold text-green-400 transition-all hover:border-green-400/50 hover:bg-green-600/30"
              >
                🔐 Sign In
              </Link>
            </div>

            {/* Quick Access Links */}
            <div className="mt-4 text-center">
              <p className="mb-2 text-sm text-gray-400">Quick Access:</p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <Link
                  href="/en/pricing"
                  className="text-purple-400 underline hover:text-purple-300"
                >
                  💰 Pricing
                </Link>
                <span className="text-gray-600">•</span>
                <Link
                  href="/en/setup"
                  className="text-cyan-400 underline hover:text-cyan-300"
                >
                  ⚙️ Setup
                </Link>
                <span className="text-gray-600">•</span>
                <Link
                  href="/en/help"
                  className="text-orange-400 underline hover:text-orange-300"
                >
                  ❓ Help
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* What's Inside These Walls - Features Preview */}
        <div className="max-w-6xl rounded-xl border border-yellow-500/20 bg-black/40 p-8 shadow-2xl backdrop-blur-lg">
          <h3 className="mb-6 text-center text-2xl font-bold text-yellow-400">
            🚀 What's Inside These Walls
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-blue-500/20 bg-blue-900/30 p-4 text-center">
              <div className="mb-2 text-3xl">🔍</div>
              <div className="text-sm font-semibold text-blue-400">
                Lead Discovery
              </div>
              <div className="text-xs text-gray-400">AI-powered lookup</div>
            </div>
            <div className="rounded-lg border border-green-500/20 bg-green-900/30 p-4 text-center">
              <div className="mb-2 text-3xl">🤝</div>
              <div className="text-sm font-semibold text-green-400">
                Referral Network
              </div>
              <div className="text-xs text-gray-400">Partner tracking</div>
            </div>
            <div className="rounded-lg border border-purple-500/20 bg-purple-900/30 p-4 text-center">
              <div className="mb-2 text-3xl">📈</div>
              <div className="text-sm font-semibold text-purple-400">
                AI Deal Analysis
              </div>
              <div className="text-xs text-gray-400">GPT-4 insights</div>
            </div>
            <div className="rounded-lg border border-pink-500/20 bg-pink-900/30 p-4 text-center">
              <div className="mb-2 text-3xl">📱</div>
              <div className="text-sm font-semibold text-pink-400">
                Mobile Export
              </div>
              <div className="text-xs text-gray-400">iOS/Android apps</div>
            </div>
          </div>

          {/* Elite Access */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-lg border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 px-6 py-3">
              <span className="font-semibold text-yellow-400">
                ✨ Elite AI Sanctuary • Ready for Saints
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Azure Cognitive Services + OpenAI GPT-4o • Premium Infrastructure
            </p>
          </div>
        </div>

        {/* New User CTA */}
        <div className="mt-8 text-center">
          <p className="mb-4 text-sm text-gray-300">
            Ready to enter these walls?
          </p>
          <Link
            href="/en/signup"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:from-blue-500 hover:to-blue-600"
          >
            🚀 Become a Saint
          </Link>
        </div>
      </div>
    </div>
  );
}
