"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Crown, Rocket, Brain, Bot } from "lucide-react"

interface PricingPlan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  icon: React.ReactNode
  popular?: boolean
  cta: string
  ctaLink: string
  gradient: string
  borderColor: string
}

const plans: PricingPlan[] = [
  {
    name: "Free Access",
    price: "$0",
    period: "/month",
    description: "Try your GOTTA GUY™ with limited AI access",
    icon: <Zap className="size-6" />,
    features: [
      "GPT-4 Turbo (limited daily usage)",
      "Auto fallback to GPT-3.5",
      "Basic prompts & responses",
      "No memory or personalization",
      "Upgrade prompts on overuse",
      "Basic search capabilities"
    ],
    cta: "Start Free",
    ctaLink: "/en/setup",
    gradient: "from-gray-500 to-gray-700",
    borderColor: "border-gray-500/20"
  },
  {
    name: "Companion Cognitive Awareness",
    price: "$27",
    period: "/month",
    description: "Unlock your full GOTTA GUY™ AI companion",
    icon: <Brain className="size-6" />,
    popular: true,
    features: [
      "GPT-4 Turbo (unlimited access)",
      "Azure Cognitive Services integration",
      "Smart Search Engine access",
      "Personalized Daily Insights",
      "Action prompting + summaries",
      "Memory & learning capabilities",
      "Dual AI assistant technology",
      "Basic automation workflows"
    ],
    cta: "Get Your GOTTA GUY™",
    ctaLink: "/en/setup",
    gradient: "from-yellow-500 to-yellow-700",
    borderColor: "border-yellow-500/20"
  },
  {
    name: "Command Your Future (Pro)",
    price: "$97",
    period: "/month",
    description: "Full business command center with voice & CRM",
    icon: <Crown className="size-6" />,
    features: [
      "Everything in Companion tier",
      "Full CRM Dashboard",
      "Voice Chat (Twilio-enabled)",
      "Client/Lead Manager",
      "Smart Assistant Workflows",
      "Advanced AI automations",
      "Mobile app export capabilities",
      "Priority email support"
    ],
    cta: "Command Your Future",
    ctaLink: "/en/setup",
    gradient: "from-blue-500 to-blue-700",
    borderColor: "border-blue-500/20"
  },
  {
    name: "Strategic Command Center",
    price: "$297",
    period: "/month",
    description: "Team leadership with AI insights (5 seats included)",
    icon: <Rocket className="size-6" />,
    features: [
      "Everything in Pro tier",
      "5 Seats Included",
      "Leadership Dashboard",
      "AI Lead Insights",
      "Team Collaboration Tools",
      "Advanced reporting & analytics",
      "Priority support",
      "Custom integrations"
    ],
    cta: "Lead Your Team",
    ctaLink: "/en/setup",
    gradient: "from-purple-500 to-purple-700",
    borderColor: "border-purple-500/20"
  },
  {
    name: "White Label Elite",
    price: "$497",
    period: "/month",
    description: "Your brand, our GOTTA GUY™ technology (10 users)",
    icon: <Bot className="size-6" />,
    features: [
      "Everything in Strategic tier",
      "Custom Branding & White-label",
      "Subaccount Control",
      "Up to 10 Users Included",
      "Private CRM + API Support",
      "White-label mobile apps",
      "Dedicated account manager",
      "Custom domain support"
    ],
    cta: "Go White Label",
    ctaLink: "/en/setup",
    gradient: "from-green-500 to-green-700",
    borderColor: "border-green-500/20"
  },
  {
    name: "Enterprise Solutions",
    price: "Custom",
    period: "pricing",
    description: "Dedicated infrastructure & strategic AI architecture",
    icon: <Rocket className="size-6" />,
    features: [
      "Dedicated Infrastructure",
      "Onboarding + Account Executive",
      "Usage-Based Scaling",
      "Strategic AI Architecture",
      "Custom integrations & APIs",
      "Enterprise security & compliance",
      "24/7 dedicated support",
      "On-premise deployment options"
    ],
    cta: "Contact Sales",
    ctaLink: "/en/setup",
    gradient: "from-red-500 to-red-700",
    borderColor: "border-red-500/20"
  }
]

export function PricingCards() {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan, index) => (
        <Card
          key={plan.name}
          className={`relative border bg-gradient-to-br from-gray-900/50 to-gray-800/30 ${plan.borderColor} transition-all duration-300 hover:scale-105 hover:shadow-2xl ${plan.popular ? "shadow-yellow-500/25 ring-2 ring-yellow-500/50" : ""}`}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-4 py-1 font-semibold text-black">
                🔥 MOST POPULAR
              </Badge>
            </div>
          )}

          <CardHeader className="pb-4 text-center">
            <div
              className={`inline-flex size-12 items-center justify-center rounded-full bg-gradient-to-r ${plan.gradient} mx-auto mb-4 text-white`}
            >
              {plan.icon}
            </div>
            <CardTitle className="mb-2 text-2xl font-bold text-white">
              {plan.name}
            </CardTitle>
            <div className="mb-4 flex items-baseline justify-center">
              <span className="text-4xl font-bold text-white">
                {plan.price}
              </span>
              <span className="ml-2 text-gray-400">{plan.period}</span>
            </div>
            <p className="text-sm text-gray-300">{plan.description}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <ul className="space-y-3">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <Check className="mr-3 mt-0.5 size-5 shrink-0 text-green-400" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              className={`w-full bg-gradient-to-r ${plan.gradient} py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg ${plan.popular ? "shadow-yellow-500/25" : ""}`}
            >
              <a href={plan.ctaLink}>{plan.cta}</a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
