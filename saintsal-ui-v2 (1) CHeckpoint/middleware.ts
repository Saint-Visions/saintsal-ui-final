import { i18nRouter } from "next-i18n-router"
import { NextResponse, type NextRequest } from "next/server"
import i18nConfig from "./i18nConfig"

export async function middleware(request: NextRequest) {
  // For debugging - just handle i18n routing
  const i18nResult = i18nRouter(request, i18nConfig)
  if (i18nResult) return i18nResult

  // Skip Supabase auth for now to get the app running
  return NextResponse.next({
    request: {
      headers: request.headers
    }
  })
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next|auth).*)"
}
