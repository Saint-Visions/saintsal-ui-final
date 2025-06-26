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

interface SignUpPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ message?: string }>
}

export default async function SignUpPage({
  params,
  searchParams
}: SignUpPageProps) {
  const resolvedSearchParams = await searchParams
  return (
    <div
      className="flex min-h-screen w-full"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url('https://cdn.builder.io/api/v1/image/assets%2Fd83998c6a81f466db4fb83ab90c7ba25%2F6564abdef64249dcb9ba82e0ed0ef8af?format=webp&width=800')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="mx-auto flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
        {/* Welcome & Signup Form */}
        <div className="rounded-xl border border-yellow-500/20 bg-black/40 p-8 shadow-2xl backdrop-blur-lg">
          <form
            className="animate-in text-foreground flex w-full flex-1 flex-col justify-center gap-2"
            action={signUp}
          >
            <Brand />

            <div className="mb-6 text-center">
              <h1 className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-3xl font-bold text-transparent">
                Become a Saint! ✨
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                Join the elite community and get your AI GOTTA GUY™ for
                everything
              </p>
            </div>

            {/* Simple Getting Started Info */}
            <div className="mb-6 rounded-lg border border-green-500/20 bg-gradient-to-r from-green-500/10 to-blue-600/10 p-4">
              <h3 className="mb-2 text-sm font-semibold text-green-400">
                🚀 Get started instantly:
              </h3>
              <ul className="space-y-1 text-xs text-gray-300">
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

            <SubmitButton className="mb-4 rounded-md bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 font-bold text-white hover:from-blue-500 hover:to-blue-600">
              🔥 Become a Saint & Get Your GOTTA GUY™
            </SubmitButton>

            {searchParams?.message && (
              <p className="rounded border border-red-400 bg-red-100 px-4 py-3 text-center text-sm text-red-700">
                {searchParams.message}
              </p>
            )}

            {/* Terms & Privacy */}
            <p className="mt-4 text-center text-xs text-gray-400">
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
              <p className="mb-3 text-sm text-gray-400">
                Already have an account?
              </p>
              <Link
                href="/en/login"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-3 font-semibold text-black transition-all hover:from-yellow-400 hover:to-yellow-500"
              >
                😇 Welcome Back, Saint!
              </Link>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="mt-6 rounded-lg border border-blue-500/20 bg-blue-900/20 p-4">
            <h3 className="mb-2 text-sm font-semibold text-blue-400">
              🎯 What happens next?
            </h3>
            <ol className="list-inside list-decimal space-y-1 text-xs text-gray-300">
              <li>Verify your email (check your inbox)</li>
              <li>Complete quick setup (2 minutes)</li>
              <li>Meet your dual AI assistants</li>
              <li>Start with free search & chat</li>
              <li>Upgrade when ready ($27/month)</li>
            </ol>
          </div>

          {/* Platform Status */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-lg border border-green-500/20 bg-gradient-to-r from-green-500/10 to-green-600/10 px-4 py-2">
              <span className="text-sm font-semibold text-green-400">
                ✅ All Systems Ready
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              Azure Cognitive Services + OpenAI GPT-4o
            </p>
          </div>

          {/* Quick Links */}
          <div className="mt-6 text-center">
            <div className="flex justify-center gap-4 text-xs">
              <Link
                href="/en/pricing"
                className="text-purple-400 underline hover:text-purple-300"
              >
                💰 Pricing
              </Link>
              <Link
                href="/en/help"
                className="text-orange-400 underline hover:text-orange-300"
              >
                ❓ Help
              </Link>
              <Link
                href="/"
                className="text-cyan-400 underline hover:text-cyan-300"
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
