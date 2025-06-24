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
      <form
        className="animate-in text-foreground flex w-full flex-1 flex-col justify-center gap-2"
        onSubmit={handleLogin}
      >
        <Brand />

        <Label className="text-md mt-4" htmlFor="email">
          Email
        </Label>
        <Input
          className="mb-3 rounded-md border bg-inherit px-4 py-2"
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <Label className="text-md" htmlFor="password">
          Password
        </Label>
        <Input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          className="mb-2 rounded-md bg-blue-700 px-4 py-2 text-white hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </Button>

        <Button
          type="button"
          onClick={handleSignUp}
          variant="outline"
          className="border-foreground/20 mb-2 rounded-md border px-4 py-2"
        >
          Sign Up
        </Button>

        <div className="text-muted-foreground mt-1 flex justify-center text-sm">
          <span className="mr-1">Forgot your password?</span>
          <button
            type="button"
            onClick={handleResetPassword}
            className="text-primary ml-1 underline hover:opacity-80"
          >
            Reset
          </button>
        </div>

        {searchParams?.message && (
          <p className="bg-foreground/10 text-foreground mt-4 p-4 text-center">
            {searchParams.message}
          </p>
        )}

        {/* Demo Info */}
        <div className="mt-6 rounded-lg bg-green-900/20 border border-green-500/20 p-4 text-center">
          <p className="text-green-400 font-semibold text-sm mb-2">
            ✅ Demo Mode Active
          </p>
          <p className="text-green-300 text-xs">
            Enter any email/password to access the dashboard
          </p>
        </div>

        {/* Quick Access Buttons */}
        <div className="mt-4 space-y-2">
          <Button
            type="button"
            onClick={() => router.push("/en/workspace1/operations")}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold hover:from-yellow-400 hover:to-yellow-500"
          >
            🔥 Quick Access - Operations Dashboard
          </Button>

          <Button
            type="button"
            onClick={() => router.push("/en/workspace1/chat")}
            variant="outline"
            className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
          >
            💬 Quick Access - AI Chat
          </Button>
        </div>
      </form>
    </div>
  )
}
