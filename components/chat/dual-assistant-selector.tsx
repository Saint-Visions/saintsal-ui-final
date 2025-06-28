"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Brain,
  Sparkles,
  Crown,
  Zap,
  Users,
  Building2,
  ChevronRight
} from "lucide-react"

interface AssistantMode {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  gradient: string
  capabilities: string[]
  specialty: string
}

const ASSISTANT_MODES: AssistantMode[] = [
  {
    id: "saint",
    name: "Saint",
    description: "Strategic business intelligence and executive-level insights",
    icon: <Crown className="size-6" />,
    color: "text-yellow-400",
    gradient: "from-yellow-500 to-yellow-600",
    capabilities: [
      "Strategic Business Analysis",
      "Executive Decision Support",
      "Market Intelligence",
      "Competitive Analysis",
      "Growth Strategy",
      "Enterprise Planning"
    ],
    specialty: "C-Suite Strategic Advisor"
  },
  {
    id: "sal",
    name: "Sal",
    description:
      "Your everyday operational assistant - the ultimate 'GOTTA GUY™'",
    icon: <Zap className="size-6" />,
    color: "text-blue-400",
    gradient: "from-blue-500 to-blue-600",
    capabilities: [
      "Daily Operations Support",
      "Lead Discovery & Qualification",
      "Deal Analysis & Tracking",
      "Referral Network Management",
      "Task Automation",
      "Practical Problem Solving"
    ],
    specialty: "Operations & Daily Support"
  },
  {
    id: "dual",
    name: "Dual Mode",
    description: "Best of both - strategic insights with operational execution",
    icon: <Brain className="size-6" />,
    color: "text-purple-400",
    gradient: "from-purple-500 to-purple-600",
    capabilities: [
      "Unified Strategic + Operational",
      "Cross-functional Analysis",
      "End-to-end Business Support",
      "Adaptive Intelligence",
      "Context-aware Responses",
      "Complete Business Ecosystem"
    ],
    specialty: "Full-Spectrum Business AI"
  }
]

interface DualAssistantSelectorProps {
  selectedMode?: string
  onModeChange?: (mode: string) => void
  compact?: boolean
}

export function DualAssistantSelector({
  selectedMode = "dual",
  onModeChange,
  compact = false
}: DualAssistantSelectorProps) {
  const [currentMode, setCurrentMode] = useState(selectedMode)

  const handleModeSelect = (modeId: string) => {
    setCurrentMode(modeId)
    onModeChange?.(modeId)
  }

  if (compact) {
    return (
      <div className="flex space-x-2">
        {ASSISTANT_MODES.map(mode => (
          <Button
            key={mode.id}
            variant={currentMode === mode.id ? "default" : "outline"}
            size="sm"
            onClick={() => handleModeSelect(mode.id)}
            className={`${
              currentMode === mode.id
                ? `bg-gradient-to-r ${mode.gradient} text-white`
                : `border-gray-600 ${mode.color} hover:bg-gray-800`
            }`}
          >
            {mode.icon}
            <span className="ml-1">{mode.name}</span>
          </Button>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="mb-2 text-2xl font-bold text-white">
          Choose Your AI Assistant
        </h3>
        <p className="text-gray-400">
          Select the intelligence mode that matches your current needs
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {ASSISTANT_MODES.map(mode => (
          <Card
            key={mode.id}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
              currentMode === mode.id
                ? `border-2 bg-gradient-to-br from-gray-900/80 to-gray-800/60 ring-2 ring-offset-2 ring-offset-gray-900`
                : "border bg-gray-900/50 hover:border-gray-600"
            } ${
              currentMode === mode.id
                ? mode.color.replace("text-", "ring-").replace("400", "500")
                : "border-gray-700"
            }`}
            onClick={() => handleModeSelect(mode.id)}
          >
            <CardHeader className="pb-3 text-center">
              <div
                className={`inline-flex size-12 items-center justify-center rounded-full bg-gradient-to-r ${mode.gradient} mx-auto mb-4 text-white`}
              >
                {mode.icon}
              </div>
              <CardTitle
                className={`text-xl ${mode.color} flex items-center justify-center`}
              >
                {mode.name}
                {currentMode === mode.id && (
                  <Badge className="ml-2 bg-green-500 text-xs text-white">
                    ACTIVE
                  </Badge>
                )}
              </CardTitle>
              <p className="text-sm text-gray-400">{mode.specialty}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-center text-sm text-gray-300">
                {mode.description}
              </p>

              <Separator className="bg-gray-700" />

              <div>
                <h4 className="mb-2 text-sm font-semibold text-white">
                  Capabilities:
                </h4>
                <ul className="space-y-1">
                  {mode.capabilities.slice(0, 4).map((capability, index) => (
                    <li
                      key={index}
                      className="flex items-center text-xs text-gray-300"
                    >
                      <Sparkles className="mr-2 size-3 shrink-0 text-yellow-400" />
                      {capability}
                    </li>
                  ))}
                  {mode.capabilities.length > 4 && (
                    <li className="text-xs italic text-gray-400">
                      +{mode.capabilities.length - 4} more capabilities...
                    </li>
                  )}
                </ul>
              </div>

              {currentMode === mode.id && (
                <div className="rounded-lg border border-green-500/20 bg-green-900/20 p-3">
                  <div className="flex items-center text-sm font-semibold text-green-400">
                    <ChevronRight className="mr-1 size-4" />
                    Ready to assist you
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Mode Switch */}
      <Card className="border-gray-700 bg-gray-800/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white">Current Mode:</h4>
              <p className="text-sm text-gray-400">
                {ASSISTANT_MODES.find(m => m.id === currentMode)?.specialty}
              </p>
            </div>
            <div className="flex space-x-2">
              {ASSISTANT_MODES.map(mode => (
                <Button
                  key={mode.id}
                  variant={currentMode === mode.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleModeSelect(mode.id)}
                  className={`${
                    currentMode === mode.id
                      ? `bg-gradient-to-r ${mode.gradient} text-white`
                      : `${mode.color} hover:bg-gray-700`
                  }`}
                >
                  {mode.icon}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
