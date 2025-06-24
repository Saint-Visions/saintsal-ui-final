import Link from "next/link"
import { Brand } from "@/components/ui/brand"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { signUp } from "@/lib/actions/auth"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Join SaintVisionAI™ - Start Cookin'",
  description:
    "Create your account and access dual AI-powered business operations"
}

function SubmitButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}) {
  return (
    <Button type="submit" className={className} {...props}>
      {children}
    </Button>
  )
}

export default function SignUpPage({
  searchParams
}: {
  searchParams: { message?: string }
}) {
  return (
    <div
      className="flex w-full min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url('https://cdn.builder.io/api/v1/image/assets%2Fd83998c6a81f466db4fb83ab90c7ba25%2F6564abdef64249dcb9ba82e0ed0ef8af?format=webp&width=800')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md mx-auto">
        {/* Welcome & Signup Form */}
        <div className="bg-black/40 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-8 shadow-2xl">
          <form
            className="animate-in text-foreground flex w-full flex-1 flex-col justify-center gap-2"
            action={signUp}
          >
            <Brand />

            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Become a Saint! ✨
              </h1>
              <p className="text-gray-400 text-sm mt-2">
                Join the elite community of AI-powered business leaders
              </p>
            </div>

            {/* Simple Getting Started Info */}
            <div className="mb-6 bg-gradient-to-r from-green-500/10 to-blue-600/10 border border-green-500/20 rounded-lg p-4">
              <h3 className="text-green-400 font-semibold text-sm mb-2">
                🚀 Get started instantly:
              </h3>
              <ul className="text-gray-300 text-xs space-y-1">
                <li>✨ Free access to dual AI (GPT-4 + Azure)</li>
                <li>🔍 Smart search capabilities</li>
                <li>💬 Chat with your AI companion</li>
                <li>🎯 Upgrade when you're ready for unlimited</li>
              </ul>
            </div>

            <Label className="text-md mt-4" htmlFor="signup-email">
              Email Address
            </Label>
            <Input
              className="mb-3 rounded-md border bg-inherit px-4 py-2"
              name="email"
              id="signup-email"
              type="email"
              placeholder="chef@yourbusiness.com"
              required
            />

            <Label className="text-md" htmlFor="signup-password">
              Create Password
            </Label>
            <Input
              className="mb-6 rounded-md border bg-inherit px-4 py-2"
              name="password"
              id="signup-password"
              type="password"
              placeholder="Make it strong! 💪"
              required
            />

            <SubmitButton className="mb-4 rounded-md bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-white font-bold hover:from-blue-500 hover:to-blue-600">
              🔥 Become a Saint & Get Your GOTTA GUY™
            </SubmitButton>

            {searchParams?.message && (
              <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center text-sm">
                {searchParams.message}
              </p>
            )}

            {/* Terms & Privacy */}
            <p className="text-gray-400 text-xs text-center mt-4">
              By creating an account, you agree to our{" "}
              <Link
                href="/terms"
                className="text-yellow-400 underline hover:text-yellow-300"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-yellow-400 underline hover:text-yellow-300"
              >
                Privacy Policy
              </Link>
            </p>
          </form>

          {/* Returning User CTA */}
          <div className="mt-8 text-center">
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400 text-sm mb-3">
                Already have an account?
              </p>
              <Link
                href="/en/login"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition-all"
              >
                😇 Welcome Back, Saint!
              </Link>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="mt-6 bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-400 font-semibold text-sm mb-2">
              🎯 What happens next?
            </h3>
            <ol className="text-gray-300 text-xs space-y-1 list-decimal list-inside">
              <li>Verify your email (check your inbox)</li>
              <li>Complete quick setup (2 minutes)</li>
              <li>Meet your dual AI assistants</li>
              <li>Start with free search & chat</li>
              <li>Upgrade when ready ($27/month)</li>
            </ol>
          </div>

          {/* Platform Status */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg px-4 py-2">
              <span className="text-green-400 font-semibold text-sm">
                ✅ All Systems Ready
              </span>
            </div>
            <p className="text-gray-400 text-xs mt-2">
              Azure Cognitive Services + OpenAI GPT-4o
            </p>
          </div>

          {/* Quick Links */}
          <div className="mt-6 text-center">
            <div className="flex justify-center gap-4 text-xs">
              <Link
                href="/en/pricing"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                💰 Pricing
              </Link>
              <Link
                href="/en/help"
                className="text-orange-400 hover:text-orange-300 underline"
              >
                ❓ Help
              </Link>
              <Link
                href="/"
                className="text-cyan-400 hover:text-cyan-300 underline"
              >
                🏠 Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
