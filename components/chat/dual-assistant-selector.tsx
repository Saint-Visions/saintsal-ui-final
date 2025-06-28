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
    icon: <Crown className="h-6 w-6" />,
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
    icon: <Zap className="h-6 w-6" />,
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
    icon: <Brain className="h-6 w-6" />,
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
        <h3 className="text-2xl font-bold text-white mb-2">
          Choose Your AI Assistant
        </h3>
        <p className="text-gray-400">
          Select the intelligence mode that matches your current needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ASSISTANT_MODES.map(mode => (
          <Card
            key={mode.id}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
              currentMode === mode.id
                ? `ring-2 ring-offset-2 ring-offset-gray-900 bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-2`
                : "bg-gray-900/50 border hover:border-gray-600"
            } ${
              currentMode === mode.id
                ? mode.color.replace("text-", "ring-").replace("400", "500")
                : "border-gray-700"
            }`}
            onClick={() => handleModeSelect(mode.id)}
          >
            <CardHeader className="text-center pb-3">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${mode.gradient} text-white mx-auto mb-4`}
              >
                {mode.icon}
              </div>
              <CardTitle
                className={`text-xl ${mode.color} flex items-center justify-center`}
              >
                {mode.name}
                {currentMode === mode.id && (
                  <Badge className="ml-2 bg-green-500 text-white text-xs">
                    ACTIVE
                  </Badge>
                )}
              </CardTitle>
              <p className="text-gray-400 text-sm">{mode.specialty}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm text-center">
                {mode.description}
              </p>

              <Separator className="bg-gray-700" />

              <div>
                <h4 className="text-white font-semibold text-sm mb-2">
                  Capabilities:
                </h4>
                <ul className="space-y-1">
                  {mode.capabilities.slice(0, 4).map((capability, index) => (
                    <li
                      key={index}
                      className="flex items-center text-xs text-gray-300"
                    >
                      <Sparkles className="h-3 w-3 mr-2 text-yellow-400 flex-shrink-0" />
                      {capability}
                    </li>
                  ))}
                  {mode.capabilities.length > 4 && (
                    <li className="text-xs text-gray-400 italic">
                      +{mode.capabilities.length - 4} more capabilities...
                    </li>
                  )}
                </ul>
              </div>

              {currentMode === mode.id && (
                <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-3">
                  <div className="flex items-center text-green-400 text-sm font-semibold">
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Ready to assist you
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Mode Switch */}
      <Card className="bg-gray-800/30 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-semibold">Current Mode:</h4>
              <p className="text-gray-400 text-sm">
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
