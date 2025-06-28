"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Target,
  Zap,
  Mail,
  Phone,
  Calendar,
  Users,
  TrendingUp,
  MapPin,
  Building2,
  Sparkles,
  Eye,
  MessageSquare,
  Clock,
  CheckCircle,
  ArrowRight,
  ExternalLink
} from "lucide-react"

interface Lead {
  id: string
  company: string
  name: string
  title: string
  email: string
  phone: string
  location: string
  employees: string
  revenue: string
  industry: string
  website: string
  intentSignals: IntentSignal[]
  engagementScore: number
  referralPotential: number
  lastActivity: string
  status: "hot" | "warm" | "cold" | "contacted" | "scheduled"
  automationTriggers: string[]
}

interface IntentSignal {
  type:
    | "hiring"
    | "funding"
    | "expansion"
    | "technology"
    | "competitor"
    | "event"
  signal: string
  confidence: number
  source: string
  date: string
  actionable: boolean
}

// Mock data - in production this would come from your advanced AI discovery engine
const MOCK_LEADS: Lead[] = [
  {
    id: "lead-1",
    company: "TechCorp Solutions",
    name: "Sarah Chen",
    title: "VP of Sales",
    email: "sarah.chen@techcorp.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    employees: "50-200",
    revenue: "$10M-$50M",
    industry: "SaaS",
    website: "techcorp.com",
    intentSignals: [
      {
        type: "hiring",
        signal: "Posted 3 sales roles in last 30 days",
        confidence: 95,
        source: "LinkedIn Jobs",
        date: "2024-01-15",
        actionable: true
      },
      {
        type: "technology",
        signal: "Researching CRM automation tools",
        confidence: 87,
        source: "Website Activity",
        date: "2024-01-14",
        actionable: true
      },
      {
        type: "funding",
        signal: "Series B funding announced",
        confidence: 100,
        source: "Press Release",
        date: "2024-01-10",
        actionable: true
      }
    ],
    engagementScore: 92,
    referralPotential: 85,
    lastActivity: "2 hours ago",
    status: "hot",
    automationTriggers: [
      "send_welcome_email",
      "schedule_demo",
      "add_to_nurture"
    ]
  },
  {
    id: "lead-2",
    company: "GrowthLab Inc",
    name: "Marcus Rodriguez",
    title: "CEO",
    email: "marcus@growthlab.io",
    phone: "+1 (555) 987-6543",
    location: "Austin, TX",
    employees: "10-50",
    revenue: "$1M-$10M",
    industry: "Marketing",
    website: "growthlab.io",
    intentSignals: [
      {
        type: "expansion",
        signal: "Opened new office location",
        confidence: 90,
        source: "Company News",
        date: "2024-01-12",
        actionable: true
      },
      {
        type: "competitor",
        signal: "Evaluated competitor pricing pages",
        confidence: 78,
        source: "Intent Data",
        date: "2024-01-13",
        actionable: true
      }
    ],
    engagementScore: 76,
    referralPotential: 92,
    lastActivity: "1 day ago",
    status: "warm",
    automationTriggers: ["send_case_study", "schedule_call"]
  }
]

export function AdvancedLeadDiscovery() {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const handleSearch = async () => {
    setIsSearching(true)
    // Simulate AI-powered search
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSearching(false)
  }

  const handleAutomatedAction = async (leadId: string, action: string) => {
    console.log(`Executing automated action: ${action} for lead ${leadId}`)

    // Update lead status
    setLeads(prev =>
      prev.map(lead =>
        lead.id === leadId
          ? { ...lead, status: "contacted" as const, lastActivity: "Just now" }
          : lead
      )
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hot":
        return "bg-red-500"
      case "warm":
        return "bg-yellow-500"
      case "cold":
        return "bg-blue-500"
      case "contacted":
        return "bg-green-500"
      case "scheduled":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getIntentColor = (type: string) => {
    switch (type) {
      case "hiring":
        return "text-green-400 bg-green-500/20"
      case "funding":
        return "text-yellow-400 bg-yellow-500/20"
      case "expansion":
        return "text-blue-400 bg-blue-500/20"
      case "technology":
        return "text-purple-400 bg-purple-500/20"
      case "competitor":
        return "text-red-400 bg-red-500/20"
      case "event":
        return "text-orange-400 bg-orange-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Advanced Lead Discovery & Intent Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="Search for companies, people, or intent signals..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 bg-gray-800 border-gray-600"
            />
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Target className="h-4 w-4 mr-2" />
                  Find Leads
                </>
              )}
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              "Hiring Intent",
              "Funding Events",
              "Tech Stack Changes",
              "Expansion Signals",
              "Competitor Research"
            ].map(filter => (
              <Badge
                key={filter}
                variant="outline"
                className="cursor-pointer hover:bg-blue-500/20 text-blue-400 border-blue-400"
              >
                {filter}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Tabs defaultValue="leads" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
          <TabsTrigger
            value="leads"
            className="data-[state=active]:bg-blue-500/20"
          >
            <Users className="h-4 w-4 mr-2" />
            Hot Leads ({leads.filter(l => l.status === "hot").length})
          </TabsTrigger>
          <TabsTrigger
            value="intent"
            className="data-[state=active]:bg-purple-500/20"
          >
            <Eye className="h-4 w-4 mr-2" />
            Intent Signals
          </TabsTrigger>
          <TabsTrigger
            value="automation"
            className="data-[state=active]:bg-green-500/20"
          >
            <Zap className="h-4 w-4 mr-2" />
            Automation Queue
          </TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-4">
          {leads.map(lead => (
            <Card
              key={lead.id}
              className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {lead.name}
                        </h3>
                        <Badge
                          className={`${getStatusColor(lead.status)} text-white text-xs`}
                        >
                          {lead.status.toUpperCase()}
                        </Badge>
                        <div className="flex items-center text-yellow-400">
                          <Sparkles className="h-4 w-4 mr-1" />
                          <span className="text-sm font-semibold">
                            {lead.engagementScore}% Match
                          </span>
                        </div>
                      </div>

                      <div className="text-gray-300 mb-2">
                        <div className="font-medium">
                          {lead.title} at {lead.company}
                        </div>
                        <div className="text-sm text-gray-400 flex items-center space-x-4">
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {lead.location}
                          </span>
                          <span>{lead.employees} employees</span>
                          <span>{lead.revenue} revenue</span>
                        </div>
                      </div>

                      {/* Intent Signals */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {lead.intentSignals.map((signal, idx) => (
                          <Badge
                            key={idx}
                            className={`${getIntentColor(signal.type)} text-xs`}
                          >
                            {signal.type}: {signal.confidence}% confidence
                          </Badge>
                        ))}
                      </div>

                      {/* Contact Info */}
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {lead.email}
                        </span>
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {lead.phone}
                        </span>
                        <span className="flex items-center">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          {lead.website}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2">
                    <div className="text-right text-sm text-gray-400 mb-2">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {lead.lastActivity}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white"
                        onClick={() =>
                          handleAutomatedAction(lead.id, "send_email")
                        }
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        Auto Email
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                        onClick={() =>
                          handleAutomatedAction(lead.id, "schedule_call")
                        }
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        Schedule
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-500 text-purple-400"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </div>

                    {/* Referral Potential */}
                    <div className="text-center">
                      <div className="text-xs text-gray-400">
                        Referral Potential
                      </div>
                      <div className="text-sm font-semibold text-yellow-400">
                        {lead.referralPotential}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="intent" className="space-y-4">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-purple-400">
                Live Intent Signals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leads.flatMap(lead =>
                  lead.intentSignals.map((signal, idx) => (
                    <div
                      key={`${lead.id}-${idx}`}
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <Badge className={getIntentColor(signal.type)}>
                          {signal.type}
                        </Badge>
                        <div>
                          <div className="text-white font-medium">
                            {signal.signal}
                          </div>
                          <div className="text-sm text-gray-400">
                            {lead.company} • {signal.source} • {signal.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-center">
                          <div className="text-sm font-semibold text-green-400">
                            {signal.confidence}%
                          </div>
                          <div className="text-xs text-gray-400">
                            Confidence
                          </div>
                        </div>
                        {signal.actionable && (
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-purple-500 to-purple-600"
                          >
                            <Zap className="h-3 w-3 mr-1" />
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Automated Action Queue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leads.flatMap(lead =>
                  lead.automationTriggers.map((trigger, idx) => (
                    <div
                      key={`${lead.id}-${idx}`}
                      className="flex items-center justify-between p-3 bg-green-900/20 border border-green-500/20 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <div>
                          <div className="text-white font-medium">
                            {trigger
                              .replace(/_/g, " ")
                              .replace(/\b\w/g, l => l.toUpperCase())}
                          </div>
                          <div className="text-sm text-gray-400">
                            Target: {lead.name} at {lead.company}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-500 text-white">Ready</Badge>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-green-500 to-green-600"
                          onClick={() =>
                            handleAutomatedAction(lead.id, trigger)
                          }
                        >
                          Execute Now
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
