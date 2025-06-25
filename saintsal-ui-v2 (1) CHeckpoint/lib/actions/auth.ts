"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    redirect("/en/login?message=Email and password are required")
  }

  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    redirect(`/en/login?message=${encodeURIComponent(error.message)}`)
  }

  revalidatePath("/", "layout")
  redirect("/en/workspace1/operations")
}

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    redirect("/en/signup?message=Email and password are required")
  }

  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    }
  })

  if (error) {
    redirect(`/en/signup?message=${encodeURIComponent(error.message)}`)
  }

  redirect("/en/signup?message=Check your email for the confirmation link")
}

export async function resetPassword(formData: FormData) {
  const email = formData.get("email") as string

  if (!email) {
    redirect("/en/login?message=Email is required for password reset")
  }

  const supabase = createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/en/login/password`
  })

  if (error) {
    redirect(`/en/login?message=${encodeURIComponent(error.message)}`)
  }

  redirect("/en/login?message=Check your email for the password reset link")
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  redirect("/en/login")
}
