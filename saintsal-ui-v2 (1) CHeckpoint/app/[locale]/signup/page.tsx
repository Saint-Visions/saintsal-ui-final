import Link from "next/link"
import { Brand } from "@/components/ui/brand"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { signUp } from "@/lib/actions/auth"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Join SaintSal™ - Start Cookin'",
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
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      {/* Welcome & Signup Form */}
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

        {/* Saint Journey Pricing Showcase */}
        <div className="mb-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg p-6">
          <h3 className="text-center text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
            ✨ Your Saint Journey Awaits ✨
          </h3>

          {/* Free Tier */}
          <div className="mb-4 bg-gray-800/50 border border-gray-600/30 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-green-400">🆓 Free Access</h4>
              <span className="text-green-400 font-bold">$0/mo</span>
            </div>
            <ul className="text-gray-300 text-xs space-y-1">
              <li>• Try GPT-4 Turbo (limited)</li>
              <li>• Auto fallback to GPT-3.5</li>
              <li>• Basic prompts, no memory</li>
              <li>• Upgrade prompt on overuse</li>
            </ul>
          </div>

          {/* Companion Tier - HIGHLIGHTED */}
          <div className="mb-4 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-2 border-yellow-500/50 rounded-lg p-3 relative">
            <div className="absolute -top-2 left-4 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
              MOST POPULAR
            </div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-yellow-400">
                😇 Companion Cognitive Awareness
              </h4>
              <span className="text-yellow-400 font-bold">$27/mo</span>
            </div>
            <ul className="text-gray-300 text-xs space-y-1">
              <li>• GPT-4 Turbo (unlocked)</li>
              <li>• Smart Search Engine access</li>
              <li>• Personalized Daily Insights</li>
              <li>• Action prompting + summaries</li>
            </ul>
          </div>

          {/* Pro Tier */}
          <div className="mb-4 bg-blue-900/30 border border-blue-500/30 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-blue-400">
                👑 Command Your Future (Pro)
              </h4>
              <span className="text-blue-400 font-bold">$97/mo</span>
            </div>
            <ul className="text-gray-300 text-xs space-y-1">
              <li>• Full CRM Dashboard</li>
              <li>• Voice Chat (Twilio-enabled)</li>
              <li>• Client/Lead Manager</li>
              <li>• Smart Assistant Workflows</li>
            </ul>
          </div>

          {/* Strategic Tier */}
          <div className="mb-4 bg-purple-900/30 border border-purple-500/30 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-purple-400">
                🏛️ Strategic Command Center
              </h4>
              <span className="text-purple-400 font-bold">$297/mo</span>
            </div>
            <ul className="text-gray-300 text-xs space-y-1">
              <li>• 5 Seats Included</li>
              <li>• Leadership Dashboard</li>
              <li>• AI Lead Insights</li>
              <li>• Team Collaboration Tools</li>
            </ul>
          </div>

          {/* White Label Elite */}
          <div className="mb-4 bg-gradient-to-r from-gold-500/20 to-amber-600/20 border border-amber-500/30 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-amber-400">
                🌟 White Label Elite
              </h4>
              <span className="text-amber-400 font-bold">$497/mo</span>
            </div>
            <ul className="text-gray-300 text-xs space-y-1">
              <li>• Custom Branding</li>
              <li>• Subaccount Control</li>
              <li>• Up to 10 Users Included</li>
              <li>• Private CRM + API Support</li>
            </ul>
          </div>

          {/* Enterprise */}
          <div className="bg-gradient-to-r from-red-900/30 to-pink-900/30 border border-red-500/30 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-red-400">
                🚀 Enterprise Solutions
              </h4>
              <span className="text-red-400 font-bold">Custom</span>
            </div>
            <ul className="text-gray-300 text-xs space-y-1">
              <li>• Dedicated Infrastructure</li>
              <li>• Onboarding + Account Exec</li>
              <li>• Usage-Based Scaling</li>
              <li>• Strategic AI Architecture</li>
            </ul>
          </div>

          <div className="mt-4 text-center">
            <p className="text-yellow-400 text-xs font-semibold">
              ✨ Start FREE → Become a Saint at $27 → Scale to Elite ✨
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Annual pricing includes 2 months free!
            </p>
          </div>
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
          🔥 Create Account & Start Free Trial
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
          <p className="text-gray-400 text-sm mb-3">Already have an account?</p>
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
  )
}
