import Link from "next/link"
import { Brand } from "@/components/ui/brand"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { signIn, resetPassword } from "@/lib/actions/auth"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Welcome Back - SaintVisionAI™",
  description: "Sign in to your AI-powered business operations platform"
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

export default async function LoginPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ message?: string }>
}) {
  const resolvedSearchParams = await searchParams

  return (
    <div
      className="flex min-h-screen w-full"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('https://cdn.builder.io/api/v1/image/assets%2Fd83998c6a81f466db4fb83ab90c7ba25%2F6564abdef64249dcb9ba82e0ed0ef8af?format=webp&width=800')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="mx-auto flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
        {/* Returning User Sign In */}
        <div className="rounded-xl border border-yellow-500/20 bg-black/40 p-8 shadow-2xl backdrop-blur-lg">
          <form
            className="animate-in text-foreground flex w-full flex-1 flex-col justify-center gap-2"
            action={signIn}
          >
            <Brand />

            <div className="mb-6 text-center">
              <h1 className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-3xl font-bold text-transparent">
                Welcome Back, Saint! 😇
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                Your dual AI sanctuary awaits - ready to elevate your business?
              </p>
            </div>

            <Label className="text-md mt-4" htmlFor="email">
              Email
            </Label>
            <Input
              className="mb-3 rounded-md border bg-inherit px-4 py-2"
              name="email"
              id="email"
              type="email"
              placeholder="you@example.com"
              required
            />

            <Label className="text-md" htmlFor="password">
              Password
            </Label>
            <Input
              className="mb-6 rounded-md border bg-inherit px-4 py-2"
              name="password"
              id="password"
              type="password"
              placeholder="••••••••"
              required
            />

            <SubmitButton className="mb-4 rounded-md bg-gradient-to-r from-yellow-500 to-yellow-600 px-4 py-2 font-bold text-black hover:from-yellow-400 hover:to-yellow-500">
              🔥 Sign In & Start Cookin'
            </SubmitButton>

            {resolvedSearchParams?.message && (
              <p className="rounded border border-red-400 bg-red-100 px-4 py-3 text-center text-sm text-red-700">
                {resolvedSearchParams.message}
              </p>
            )}
          </form>

          {/* Password Reset */}
          <form action={resetPassword} className="mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-400">Forgot your password?</p>
              <Label htmlFor="reset-email" className="sr-only">
                Email for password reset
              </Label>
              <div className="mt-2 flex gap-2">
                <Input
                  className="flex-1 rounded-md border bg-inherit px-3 py-2 text-sm"
                  name="email"
                  id="reset-email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
                <SubmitButton className="rounded-md bg-gray-600 px-4 py-2 text-sm hover:bg-gray-500">
                  Reset
                </SubmitButton>
              </div>
            </div>
          </form>

          {/* New User CTA */}
          <div className="mt-8 text-center">
            <div className="border-t border-gray-700 pt-6">
              <p className="mb-3 text-sm text-gray-400">First time here?</p>
              <Link
                href="/en/signup"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white transition-all hover:from-blue-500 hover:to-blue-600"
              >
                🚀 Start Your SaintVisionAI Journey
              </Link>
            </div>
          </div>

          {/* Platform Status */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-lg border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 px-4 py-2">
              <span className="text-sm font-semibold text-yellow-400">
                ✨ Dual AI Platform Ready
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
