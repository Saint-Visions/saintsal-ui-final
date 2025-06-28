"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Rocket,
  Target,
  Users,
  Building2,
  Calendar,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from "lucide-react"

interface LeadData {
  firstName: string
  lastName: string
  email: string
  company: string
  role: string
  industry: string
  urgency: string
  fundingStage: string
  teamSize: string
  useCase: string
  budget: string
  timeline: string
}

interface RoutingResult {
  score: number
  tier: "HOT" | "WARM" | "NURTURE"
  route: "instant-demo" | "sales-call" | "email-sequence" | "nurture-drip"
  priority: "HIGH" | "MEDIUM" | "LOW"
  autoActions: string[]
  suggestedFollowUp: string
}

export function SmartLeadRouter() {
  const [step, setStep] = useState(1)
  const [leadData, setLeadData] = useState<LeadData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    industry: "",
    urgency: "",
    fundingStage: "",
    teamSize: "",
    useCase: "",
    budget: "",
    timeline: ""
  })
  const [routing, setRouting] = useState<RoutingResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Smart scoring algorithm
  const calculateLeadScore = (data: LeadData): RoutingResult => {
    let score = 0
    const autoActions: string[] = []

    // Industry scoring
    const highValueIndustries = [
      "technology",
      "saas",
      "financial-services",
      "real-estate",
      "healthcare"
    ]
    if (highValueIndustries.includes(data.industry)) {
      score += 25
      autoActions.push("Industry: High-value vertical detected")
    }

    // Role scoring
    const decisionMakerRoles = [
      "ceo",
      "founder",
      "cto",
      "vp-sales",
      "head-of-growth",
      "director"
    ]
    if (decisionMakerRoles.includes(data.role)) {
      score += 30
      autoActions.push("Role: Decision maker identified")
    }

    // Urgency scoring
    switch (data.urgency) {
      case "immediate":
        score += 40
        autoActions.push("Urgency: Immediate need - trigger instant response")
        break
      case "this-month":
        score += 25
        autoActions.push("Urgency: Monthly timeline - schedule within 48hrs")
        break
      case "this-quarter":
        score += 15
        break
      default:
        score += 5
    }

    // Team size scoring
    const teamSizeScore = {
      "1-10": 10,
      "11-50": 20,
      "51-200": 30,
      "201-1000": 35,
      "1000+": 40
    }
    score += teamSizeScore[data.teamSize as keyof typeof teamSizeScore] || 0

    // Funding stage scoring
    const fundingScore = {
      bootstrapped: 15,
      seed: 20,
      "series-a": 30,
      "series-b": 35,
      "series-c+": 40,
      public: 25
    }
    score += fundingScore[data.fundingStage as keyof typeof fundingScore] || 0

    // Budget scoring
    if (data.budget.includes("50k+") || data.budget.includes("100k+")) {
      score += 25
      autoActions.push("Budget: Enterprise tier qualified")
    } else if (data.budget.includes("10k+")) {
      score += 15
      autoActions.push("Budget: Pro tier qualified")
    }

    // Determine tier and routing
    let tier: "HOT" | "WARM" | "NURTURE"
    let route: "instant-demo" | "sales-call" | "email-sequence" | "nurture-drip"
    let priority: "HIGH" | "MEDIUM" | "LOW"
    let suggestedFollowUp: string

    if (score >= 80) {
      tier = "HOT"
      route = "instant-demo"
      priority = "HIGH"
      suggestedFollowUp = "Book demo within 2 hours"
      autoActions.push("🔥 HOT LEAD: Trigger immediate response protocol")
    } else if (score >= 50) {
      tier = "WARM"
      route = "sales-call"
      priority = "MEDIUM"
      suggestedFollowUp = "Schedule call within 24 hours"
      autoActions.push("📞 WARM LEAD: Schedule discovery call")
    } else {
      tier = "NURTURE"
      route = "email-sequence"
      priority = "LOW"
      suggestedFollowUp = "Add to nurture sequence"
      autoActions.push("📧 NURTURE: Add to email automation")
    }

    return {
      score,
      tier,
      route,
      priority,
      autoActions,
      suggestedFollowUp
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Calculate routing
    const routingResult = calculateLeadScore(leadData)
    setRouting(routingResult)

    // Simulate API call to create lead and trigger automations
    try {
      const response = await fetch("/api/leads/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadData,
          routing: routingResult,
          source: "smart-intake-form",
          timestamp: Date.now()
        })
      })

      if (response.ok) {
        setStep(4) // Success step
      }
    } catch (error) {
      console.error("Failed to submit lead:", error)
    }

    setIsSubmitting(false)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                Tell Us About Yourself
              </h2>
              <p className="text-gray-400">
                Our AI will instantly route you to the right solution
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={leadData.firstName}
                  onChange={e =>
                    setLeadData({ ...leadData, firstName: e.target.value })
                  }
                  placeholder="John"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={leadData.lastName}
                  onChange={e =>
                    setLeadData({ ...leadData, lastName: e.target.value })
                  }
                  placeholder="Smith"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={leadData.email}
                  onChange={e =>
                    setLeadData({ ...leadData, email: e.target.value })
                  }
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={leadData.company}
                  onChange={e =>
                    setLeadData({ ...leadData, company: e.target.value })
                  }
                  placeholder="Acme Corp"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="role">Your Role</Label>
              <Select
                value={leadData.role}
                onValueChange={value =>
                  setLeadData({ ...leadData, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ceo">CEO</SelectItem>
                  <SelectItem value="founder">Founder</SelectItem>
                  <SelectItem value="cto">CTO</SelectItem>
                  <SelectItem value="vp-sales">VP Sales</SelectItem>
                  <SelectItem value="head-of-growth">Head of Growth</SelectItem>
                  <SelectItem value="director">Director</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="individual">
                    Individual Contributor
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                Company Details
              </h2>
              <p className="text-gray-400">
                Help us understand your business context
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={leadData.industry}
                  onValueChange={value =>
                    setLeadData({ ...leadData, industry: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="financial-services">
                      Financial Services
                    </SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="teamSize">Team Size</Label>
                <Select
                  value={leadData.teamSize}
                  onValueChange={value =>
                    setLeadData({ ...leadData, teamSize: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-1000">201-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="fundingStage">Funding Stage</Label>
                <Select
                  value={leadData.fundingStage}
                  onValueChange={value =>
                    setLeadData({ ...leadData, fundingStage: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Funding stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bootstrapped">Bootstrapped</SelectItem>
                    <SelectItem value="seed">Seed</SelectItem>
                    <SelectItem value="series-a">Series A</SelectItem>
                    <SelectItem value="series-b">Series B</SelectItem>
                    <SelectItem value="series-c+">Series C+</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="budget">Budget Range</Label>
                <Select
                  value={leadData.budget}
                  onValueChange={value =>
                    setLeadData({ ...leadData, budget: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Monthly budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1k">Under $1,000</SelectItem>
                    <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                    <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                    <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                    <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                    <SelectItem value="100k+">$100,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                Project Details
              </h2>
              <p className="text-gray-400">
                Tell us about your specific needs and timeline
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="urgency">Urgency</Label>
                <Select
                  value={leadData.urgency}
                  onValueChange={value =>
                    setLeadData({ ...leadData, urgency: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="When do you need this?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">
                      Immediate (this week)
                    </SelectItem>
                    <SelectItem value="this-month">This month</SelectItem>
                    <SelectItem value="this-quarter">This quarter</SelectItem>
                    <SelectItem value="next-quarter">Next quarter</SelectItem>
                    <SelectItem value="exploring">Just exploring</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="timeline">Timeline</Label>
                <Select
                  value={leadData.timeline}
                  onValueChange={value =>
                    setLeadData({ ...leadData, timeline: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Implementation timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-week">Within 1 week</SelectItem>
                    <SelectItem value="1-month">Within 1 month</SelectItem>
                    <SelectItem value="3-months">Within 3 months</SelectItem>
                    <SelectItem value="6-months">Within 6 months</SelectItem>
                    <SelectItem value="planning">Still planning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="useCase">Use Case</Label>
              <Textarea
                id="useCase"
                value={leadData.useCase}
                onChange={e =>
                  setLeadData({ ...leadData, useCase: e.target.value })
                }
                placeholder="Describe your specific use case or challenges..."
                rows={4}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                🎯 Smart Routing Complete!
              </h2>
              <p className="text-gray-400">
                Our AI has analyzed your profile and determined the best path
                forward
              </p>
            </div>

            {routing && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Badge
                        className={
                          routing.tier === "HOT"
                            ? "bg-red-500/20 text-red-400"
                            : routing.tier === "WARM"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-blue-500/20 text-blue-400"
                        }
                      >
                        {routing.tier} LEAD
                      </Badge>
                      <span className="text-white font-semibold">
                        Score: {routing.score}/100
                      </span>
                    </div>
                    <Badge
                      className={
                        routing.priority === "HIGH"
                          ? "bg-red-500/20 text-red-400"
                          : routing.priority === "MEDIUM"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                      }
                    >
                      {routing.priority} PRIORITY
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-semibold mb-2">
                        🤖 Auto Actions Triggered:
                      </h4>
                      <ul className="space-y-1">
                        {routing.autoActions.map((action, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-300 flex items-center"
                          >
                            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-700">
                      <h4 className="text-white font-semibold mb-2">
                        📅 Next Steps:
                      </h4>
                      <p className="text-green-400 font-medium">
                        {routing.suggestedFollowUp}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              {routing?.route === "instant-demo" && (
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Instant Demo (Available Now)
                </Button>
              )}

              {routing?.route === "sales-call" && (
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Schedule Discovery Call
                </Button>
              )}

              <Button
                variant="outline"
                size="lg"
                className="w-full border-green-500 text-green-400 hover:bg-green-500/10"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get Chrome Extension (Instant Access)
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-white">
              <Brain className="w-6 h-6 mr-2 text-blue-400" />
              Smart Lead Router
            </CardTitle>
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i <= step
                      ? "bg-blue-500"
                      : i === step + 1
                        ? "bg-blue-500/50"
                        : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {renderStep()}

          {step < 4 && (
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="border-gray-600 text-gray-300"
                >
                  Back
                </Button>
              )}

              <Button
                onClick={() => {
                  if (step === 3) {
                    handleSubmit()
                  } else {
                    setStep(step + 1)
                  }
                }}
                disabled={isSubmitting}
                className="ml-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isSubmitting ? (
                  "Processing..."
                ) : step === 3 ? (
                  "Analyze & Route"
                ) : (
                  <>
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
