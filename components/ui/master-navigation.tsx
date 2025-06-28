"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import {
  Activity,
  BarChart3,
  Brain,
  Building2,
  ChevronDown,
  Crown,
  MessageSquare,
  Settings,
  Sparkles,
  Users,
  Zap
} from "lucide-react"

const NAVIGATION_ITEMS = [
  {
    label: "Chat",
    href: "/chat",
    icon: <MessageSquare className="size-4" />,
    description: "AI Assistant Conversations"
  },
  {
    label: "Operations",
    href: "/operations",
    icon: <Activity className="size-4" />,
    description: "Business Intelligence Dashboard"
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: <BarChart3 className="size-4" />,
    description: "Advanced SaaS Metrics"
  },
  {
    label: "Onboarding",
    href: "/onboarding",
    icon: <Building2 className="size-4" />,
    description: "Multi-Tenant Setup"
  },
  {
    label: "Admin",
    href: "/admin",
    icon: <Crown className="size-4" />,
    description: "SaaS Management",
    adminOnly: true
  }
]

const ASSISTANT_MODES = [
  {
    id: "saint",
    name: "Saint",
    icon: <Crown className="size-4" />,
    color: "text-yellow-400"
  },
  {
    id: "sal",
    name: "Sal",
    icon: <Zap className="size-4" />,
    color: "text-blue-400"
  },
  {
    id: "dual",
    name: "Dual",
    icon: <Brain className="size-4" />,
    color: "text-purple-400"
  }
]

interface MasterNavigationProps {
  currentUser?: {
    name: string
    email: string
    isAdmin: boolean
    plan: string
  }
  currentTenant?: {
    name: string
    subdomain: string
    plan: string
  }
}

export function MasterNavigation({
  currentUser,
  currentTenant
}: MasterNavigationProps) {
  const pathname = usePathname()
  const [assistantMode, setAssistantMode] = useState("dual")

  const isActiveRoute = (href: string) => {
    return pathname.includes(href)
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "enterprise":
        return "text-purple-400 bg-purple-500/20"
      case "pro":
        return "text-yellow-400 bg-yellow-500/20"
      case "starter":
        return "text-blue-400 bg-blue-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  return (
    <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600">
              <Activity className="size-5 text-black" />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-lg font-bold text-transparent">
                SaintSal™
              </h1>
              {currentTenant && (
                <p className="text-xs text-gray-400">{currentTenant.name}</p>
              )}
            </div>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden items-center space-x-6 md:flex">
            {NAVIGATION_ITEMS.map(item => {
              if (item.adminOnly && !currentUser?.isAdmin) return null

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActiveRoute(item.href)
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {isActiveRoute(item.href) && (
                    <Badge className="bg-yellow-500 text-xs text-black">
                      Active
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Side - Assistant Mode & User */}
          <div className="flex items-center space-x-4">
            {/* Assistant Mode Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  {
                    ASSISTANT_MODES.find(mode => mode.id === assistantMode)
                      ?.icon
                  }
                  <span className="ml-2">
                    {
                      ASSISTANT_MODES.find(mode => mode.id === assistantMode)
                        ?.name
                    }
                  </span>
                  <ChevronDown className="ml-1 size-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1 text-sm font-semibold text-gray-400">
                  Assistant Mode
                </div>
                <DropdownMenuSeparator />
                {ASSISTANT_MODES.map(mode => (
                  <DropdownMenuItem
                    key={mode.id}
                    onClick={() => setAssistantMode(mode.id)}
                    className={`flex items-center space-x-2 ${
                      assistantMode === mode.id ? "bg-gray-700" : ""
                    }`}
                  >
                    <div className={mode.color}>{mode.icon}</div>
                    <span>{mode.name} Mode</span>
                    {assistantMode === mode.id && (
                      <Badge className="ml-auto bg-green-500 text-xs text-white">
                        Active
                      </Badge>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            {currentUser && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-300 hover:bg-gray-800"
                  >
                    <Users className="mr-2 size-4" />
                    <span className="hidden sm:block">{currentUser.name}</span>
                    <ChevronDown className="ml-1 size-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <div className="p-2">
                    <div className="font-semibold text-white">
                      {currentUser.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {currentUser.email}
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                      <Badge className={getPlanColor(currentUser.plan)}>
                        {currentUser.plan.toUpperCase()}
                      </Badge>
                      {currentUser.isAdmin && (
                        <Badge className="bg-red-500 text-white">ADMIN</Badge>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 size-4" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BarChart3 className="mr-2 size-4" />
                    Usage & Billing
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Sparkles className="mr-2 size-4" />
                    Upgrade Plan
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* System Status */}
            <Badge className="hidden bg-green-500 text-xs text-white lg:flex">
              <Sparkles className="mr-1 size-3" />
              All Systems Active
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
