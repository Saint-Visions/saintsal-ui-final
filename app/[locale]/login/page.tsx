import { Brand } from "@/components/ui/brand";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { signIn, signUp, resetPassword } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In - SaintSal™",
};

export default async function Login({
  searchParams,
}: {
  searchParams?: { message?: string };
}) {
  // Check if user is already logged in
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // Get user's home workspace
    const { data: homeWorkspace } = await supabase
      .from("workspaces")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("is_home", true)
      .single();

    if (homeWorkspace) {
      redirect(`/${homeWorkspace.id}/chat`);
    } else {
      redirect("/setup");
    }
  }

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <form
        className="animate-in text-foreground flex w-full flex-1 flex-col justify-center gap-2"
        action={signIn}
      >
        <Brand />

        <Label className="text-md mt-4" htmlFor="email">
          Email
        </Label>
        <Input
          className="mb-3 rounded-md border bg-inherit px-4 py-2"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />

        <Label className="text-md" htmlFor="password">
          Password
        </Label>
        <Input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        <SubmitButton className="mb-2 rounded-md bg-gradient-to-r from-yellow-500 to-yellow-600 px-4 py-2 text-black font-bold hover:from-yellow-400 hover:to-yellow-500">
          🔥 Sign In
        </SubmitButton>

        <SubmitButton
          formAction={signUp}
          className="border-foreground/20 mb-2 rounded-md border px-4 py-2 hover:bg-foreground/10"
        >
          Create Account
        </SubmitButton>

        <div className="text-muted-foreground mt-1 flex justify-center text-sm">
          <span className="mr-1">Forgot your password?</span>
          <SubmitButton
            formAction={resetPassword}
            className="text-primary ml-1 underline hover:opacity-80 bg-transparent border-none p-0 h-auto"
          >
            Reset Password
          </SubmitButton>
        </div>

        {resolvedSearchParams?.message && (
          <div className="mt-4 p-4 text-center rounded-lg bg-red-900/20 border border-red-500/20">
            <p className="text-red-400">{resolvedSearchParams.message}</p>
          </div>
        )}
      </form>

      {/* PRODUCTION STATUS - ZERO DEMO */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 bg-green-900/20 border border-green-500/20 rounded-lg px-4 py-2">
          <span className="text-green-400 font-semibold">
            ⚡ LIVE PRODUCTION
          </span>
        </div>
        <p className="text-gray-400 text-sm mt-2">
          SaintSal™ �� Cookin' Knowledge
        </p>
      </div>
    </div>
  );
}
