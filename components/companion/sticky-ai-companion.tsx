"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Bot,
  Brain,
  Eye,
  Zap,
  Clock,
  Users,
  MessageSquare,
  Calendar,
  Mail,
  Phone,
  Target,
  TrendingUp,
  Activity,
  Sparkles,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Minimize2,
  Maximize2,
  X
} from "lucide-react"

interface CompanionData {
  user: {
    name: string
    currentActivity: string
    goals: string[]
    urgentTasks: number
  }
  tracking: {
    websiteVisits: number
    emailInteractions: number
    phoneConnections: number
    meetingsScheduled: number
    conversions: number
    referralOpportunities: number
  }
  insights: {
    type: "opportunity" | "warning" | "suggestion" | "celebration"
    title: string
    description: string
    action?: string
    priority: "high" | "medium" | "low"
    timestamp: string
  }[]
  automationQueue: {
    id: string
    type: "email" | "text" | "call" | "meeting" | "follow_up"
    target: string
    action: string
    scheduledFor: string
    status: "pending" | "executing" | "completed" | "failed"
  }[]
  notifications: {
    id: string
    type: "lead" | "referral" | "opportunity" | "system"
    message: string
    timestamp: string
    read: boolean
  }[]
}

// Mock data - in production this would be real-time from your tracking systems
const MOCK_COMPANION_DATA: CompanionData = {
  user: {
    name: "Business Owner",
    currentActivity: "Reviewing lead pipeline",
    goals: [
      "Close 5 deals this month",
      "Generate 50 referrals",
      "Automate follow-ups"
    ],
    urgentTasks: 3
  },
  tracking: {
    websiteVisits: 1247,
    emailInteractions: 89,
    phoneConnections: 23,
    meetingsScheduled: 12,
    conversions: 8,
    referralOpportunities: 34
  },
  insights: [
    {
      type: "opportunity",
      title: "High-Value Lead Detected",
      description:
        "TechCorp Solutions just viewed your pricing page 3 times in the last hour",
      action: "Send personalized follow-up email",
      priority: "high",
      timestamp: "2 minutes ago"
    },
    {
      type: "celebration",
      title: "Conversion Achievement!",
      description:
        "You've converted 2 new clients today - 150% above your daily target",
      priority: "medium",
      timestamp: "1 hour ago"
    },
    {
      type: "suggestion",
      title: "Referral Opportunity",
      description:
        "Marcus Rodriguez (CEO at GrowthLab) is connected to 3 potential leads",
      action: "Send referral request",
      priority: "medium",
      timestamp: "3 hours ago"
    },
    {
      type: "warning",
      title: "Follow-up Overdue",
      description: "5 leads haven't been contacted in 48+ hours",
      action: "Send automated check-in sequence",
      priority: "high",
      timestamp: "4 hours ago"
    }
  ],
  automationQueue: [
    {
      id: "auto-1",
      type: "email",
      target: "sarah.chen@techcorp.com",
      action: "Send welcome sequence email #2",
      scheduledFor: "In 15 minutes",
      status: "pending"
    },
    {
      id: "auto-2",
      type: "meeting",
      target: "Marcus Rodriguez",
      action: "Schedule demo call",
      scheduledFor: "Tomorrow 2:00 PM",
      status: "pending"
    },
    {
      id: "auto-3",
      type: "text",
      target: "+1 (555) 123-4567",
      action: "Send follow-up reminder",
      scheduledFor: "In 2 hours",
      status: "executing"
    }
  ],
  notifications: [
    {
      id: "notif-1",
      type: "lead",
      message: "New hot lead: TechCorp Solutions (95% match)",
      timestamp: "5 minutes ago",
      read: false
    },
    {
      id: "notif-2",
      type: "referral",
      message: "Referral opportunity: 3 connections via Marcus Rodriguez",
      timestamp: "1 hour ago",
      read: false
    },
    {
      id: "notif-3",
      type: "opportunity",
      message: "Intent signal: GrowthLab researching CRM solutions",
      timestamp: "2 hours ago",
      read: true
    }
  ]
}

interface StickyAiCompanionProps {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  minimizable?: boolean
}

export function StickyAiCompanion({
  position = "bottom-right",
  minimizable = true
}: StickyAiCompanionProps) {
  const [data, setData] = useState<CompanionData>(MOCK_COMPANION_DATA)
  const [isMinimized, setIsMinimized] = useState(false)
  const [activeTab, setActiveTab] = useState("insights")
  const [userInput, setUserInput] = useState("")

  const getPositionClass = () => {
    switch (position) {
      case "bottom-right":
        return "bottom-6 right-6"
      case "bottom-left":
        return "bottom-6 left-6"
      case "top-right":
        return "top-6 right-6"
      case "top-left":
        return "top-6 left-6"
      default:
        return "bottom-6 right-6"
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return <Target className="h-4 w-4 text-green-400" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-red-400" />
      case "suggestion":
        return <Sparkles className="h-4 w-4 text-yellow-400" />
      case "celebration":
        return <CheckCircle className="h-4 w-4 text-purple-400" />
      default:
        return <Activity className="h-4 w-4 text-blue-400" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "opportunity":
        return "border-green-500/20 bg-green-900/20"
      case "warning":
        return "border-red-500/20 bg-red-900/20"
      case "suggestion":
        return "border-yellow-500/20 bg-yellow-900/20"
      case "celebration":
        return "border-purple-500/20 bg-purple-900/20"
      default:
        return "border-blue-500/20 bg-blue-900/20"
    }
  }

  const handleExecuteAutomation = (id: string) => {
    setData(prev => ({
      ...prev,
      automationQueue: prev.automationQueue.map(item =>
        item.id === id ? { ...item, status: "executing" as const } : item
      )
    }))

    // Simulate execution
    setTimeout(() => {
      setData(prev => ({
        ...prev,
        automationQueue: prev.automationQueue.map(item =>
          item.id === id ? { ...item, status: "completed" as const } : item
        )
      }))
    }, 3000)
  }

  const handleQuickAction = (action: string) => {
    console.log(`Executing quick action: ${action}`)
    // Execute the action through your automation system
  }

  if (isMinimized) {
    return (
      <div className={`fixed ${getPositionClass()} z-50`}>
        <Button
          onClick={() => setIsMinimized(false)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-2xl hover:scale-110 transition-transform"
        >
          <Bot className="h-8 w-8" />
        </Button>
        {data.notifications.filter(n => !n.read).length > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            {data.notifications.filter(n => !n.read).length}
          </Badge>
        )}
      </div>
    )
  }

  return (
    <div
      className={`fixed ${getPositionClass()} z-50 w-96 max-h-[600px] overflow-hidden`}
    >
      <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 shadow-2xl">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-black" />
              </div>
              <div>
                <CardTitle className="text-lg text-yellow-400">
                  AI Companion
                </CardTitle>
                <p className="text-xs text-gray-400">
                  Always tracking, always optimizing
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
              {minimizable && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsMinimized(true)}
                  className="text-gray-400 hover:text-white"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">
                {data.tracking.conversions}
              </div>
              <div className="text-xs text-gray-400">Today</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-400">
                {data.tracking.referralOpportunities}
              </div>
              <div className="text-xs text-gray-400">Referrals</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400">
                {data.tracking.meetingsScheduled}
              </div>
              <div className="text-xs text-gray-400">Scheduled</div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 max-h-[400px] overflow-y-auto">
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
            {["insights", "automation", "tracking"].map(tab => (
              <Button
                key={tab}
                size="sm"
                variant={activeTab === tab ? "default" : "ghost"}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-xs ${
                  activeTab === tab
                    ? "bg-yellow-500 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab === "insights" && <Brain className="h-3 w-3 mr-1" />}
                {tab === "automation" && <Zap className="h-3 w-3 mr-1" />}
                {tab === "tracking" && <Activity className="h-3 w-3 mr-1" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </div>

          {/* Content */}
          {activeTab === "insights" && (
            <div className="space-y-3">
              {data.insights.map((insight, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border ${getInsightColor(insight.type)}`}
                >
                  <div className="flex items-start space-x-2">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <div className="text-white font-medium text-sm">
                        {insight.title}
                      </div>
                      <div className="text-gray-300 text-xs mt-1">
                        {insight.description}
                      </div>
                      <div className="text-gray-500 text-xs mt-1">
                        {insight.timestamp}
                      </div>
                      {insight.action && (
                        <Button
                          size="sm"
                          className="mt-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs"
                          onClick={() => handleQuickAction(insight.action!)}
                        >
                          {insight.action}
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "automation" && (
            <div className="space-y-3">
              {data.automationQueue.map(item => (
                <div key={item.id} className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {item.type === "email" && (
                        <Mail className="h-4 w-4 text-blue-400" />
                      )}
                      {item.type === "text" && (
                        <MessageSquare className="h-4 w-4 text-green-400" />
                      )}
                      {item.type === "call" && (
                        <Phone className="h-4 w-4 text-yellow-400" />
                      )}
                      {item.type === "meeting" && (
                        <Calendar className="h-4 w-4 text-purple-400" />
                      )}
                      <div>
                        <div className="text-white text-sm font-medium">
                          {item.action}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {item.target}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {item.scheduledFor}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge
                        className={`text-xs ${
                          item.status === "pending"
                            ? "bg-yellow-500"
                            : item.status === "executing"
                              ? "bg-blue-500"
                              : item.status === "completed"
                                ? "bg-green-500"
                                : "bg-red-500"
                        } text-white`}
                      >
                        {item.status}
                      </Badge>
                      {item.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => handleExecuteAutomation(item.id)}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs"
                        >
                          Execute Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "tracking" && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-gray-800/50 rounded-lg">
                  <div className="text-lg font-bold text-blue-400">
                    {data.tracking.websiteVisits}
                  </div>
                  <div className="text-xs text-gray-400">Website Visits</div>
                </div>
                <div className="text-center p-2 bg-gray-800/50 rounded-lg">
                  <div className="text-lg font-bold text-green-400">
                    {data.tracking.emailInteractions}
                  </div>
                  <div className="text-xs text-gray-400">
                    Email Interactions
                  </div>
                </div>
                <div className="text-center p-2 bg-gray-800/50 rounded-lg">
                  <div className="text-lg font-bold text-yellow-400">
                    {data.tracking.phoneConnections}
                  </div>
                  <div className="text-xs text-gray-400">Phone Connections</div>
                </div>
                <div className="text-center p-2 bg-gray-800/50 rounded-lg">
                  <div className="text-lg font-bold text-purple-400">
                    {data.tracking.meetingsScheduled}
                  </div>
                  <div className="text-xs text-gray-400">
                    Meetings Scheduled
                  </div>
                </div>
              </div>

              {/* Recent Notifications */}
              <div className="space-y-2">
                <div className="text-white font-medium text-sm">
                  Recent Activity
                </div>
                {data.notifications.slice(0, 3).map(notif => (
                  <div
                    key={notif.id}
                    className={`p-2 rounded-lg ${notif.read ? "bg-gray-800/50" : "bg-blue-900/20 border border-blue-500/20"}`}
                  >
                    <div className="text-white text-xs">{notif.message}</div>
                    <div className="text-gray-500 text-xs mt-1">
                      {notif.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Input */}
          <Separator className="bg-gray-700" />
          <div className="space-y-2">
            <Input
              placeholder="Ask your AI companion anything..."
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white text-sm"
            />
            <div className="flex space-x-2">
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-xs"
              >
                Send Command
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
