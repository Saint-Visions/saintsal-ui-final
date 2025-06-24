import Link from "next/link"
import { Brand } from "@/components/ui/brand"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { signIn, signUp, resetPassword } from "@/lib/actions/auth"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In - SaintSal™",
  description: "Access your AI-powered business operations platform"
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

export default function Login({
  searchParams
}: {
  searchParams: { message?: string }
}) {
  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      {/* Sign In Form */}
      <form
        className="animate-in text-foreground flex w-full flex-1 flex-col justify-center gap-2"
        action={signIn}
      >
        <Brand />

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Welcome Back to SaintSal™
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Sign in to access your dual AI assistant
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

        <SubmitButton className="mb-2 rounded-md bg-gradient-to-r from-yellow-500 to-yellow-600 px-4 py-2 text-black font-bold hover:from-yellow-400 hover:to-yellow-500">
          🔥 Sign In
        </SubmitButton>

        {searchParams?.message && (
          <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center text-sm">
            {searchParams.message}
          </p>
        )}
      </form>

      {/* Sign Up Form */}
      <form
        className="animate-in text-foreground flex w-full flex-col gap-2 mt-6"
        action={signUp}
      >
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-yellow-400">
            New to SaintSal™?
          </h2>
          <p className="text-gray-400 text-sm">Start cooking with AI today</p>
        </div>

        <Label className="text-md" htmlFor="signup-email">
          Email
        </Label>
        <Input
          className="mb-3 rounded-md border bg-inherit px-4 py-2"
          name="email"
          id="signup-email"
          type="email"
          placeholder="you@example.com"
          required
        />

        <Label className="text-md" htmlFor="signup-password">
          Password
        </Label>
        <Input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          name="password"
          id="signup-password"
          type="password"
          placeholder="••••••••"
          required
        />

        <SubmitButton className="mb-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500">
          🚀 Create Account
        </SubmitButton>
      </form>

      {/* Password Reset */}
      <form action={resetPassword} className="mt-4">
        <div className="text-center">
          <p className="text-gray-400 text-sm">Forgot your password?</p>
          <Label htmlFor="reset-email" className="sr-only">
            Email for password reset
          </Label>
          <div className="flex gap-2 mt-2">
            <Input
              className="flex-1 rounded-md border bg-inherit px-3 py-2 text-sm"
              name="email"
              id="reset-email"
              type="email"
              placeholder="Enter your email"
              required
            />
            <SubmitButton className="px-4 py-2 text-sm bg-gray-600 hover:bg-gray-500 rounded-md">
              Reset
            </SubmitButton>
          </div>
        </div>
      </form>

      {/* Platform Info */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-lg px-4 py-2">
          <span className="text-yellow-400 font-semibold text-sm">
            ✨ Dual AI Platform Ready
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
