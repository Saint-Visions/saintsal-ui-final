"use client"

import { SaintSalOperationsDashboard } from "@/components/operations/sainsal-operations-dashboard"
import { SaasAnalyticsDashboard } from "@/components/dashboard/saas-analytics-dashboard"
import { TenantUsageTracker } from "@/components/dashboard/tenant-usage-tracker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  BarChart3,
  Brain,
  Building2,
  Crown,
  Settings,
  Sparkles,
  Zap,
  Rocket,
  Target,
  Users,
  TrendingUp,
  Shield,
  Globe
} from "lucide-react"

export default function OperationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Operations Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                <Rocket className="size-6 text-white" />
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                  PartnerTech.ai Operations
                </h1>
                <p className="text-sm text-gray-400">
                  Patent #10,290,222 Protected Platform
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-500 text-white">
                <Sparkles className="mr-1 size-3" />
                All Systems LIVE
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                <Crown className="mr-1 size-3" />
                Enterprise Ready
              </Badge>
              <Button
                variant="outline"
                className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
              >
                <Settings className="mr-2 size-4" />
                Configure
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Operations Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800/50">
            <TabsTrigger value="dashboard" className="text-blue-400">
              <Activity className="mr-2 size-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-green-400">
              <BarChart3 className="mr-2 size-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="ai-insights" className="text-purple-400">
              <Brain className="mr-2 size-4" />
              AI Insights
            </TabsTrigger>
            <TabsTrigger value="automation" className="text-yellow-400">
              <Zap className="mr-2 size-4" />
              Automation
            </TabsTrigger>
            <TabsTrigger value="saas" className="text-orange-400">
              <Building2 className="mr-2 size-4" />
              SaaS Platform
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Platform Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/30 to-blue-800/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-blue-400">
                    <Target className="mr-2 size-5" />
                    Intent Signals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 text-3xl font-bold text-blue-400">
                    1,247
                  </div>
                  <p className="text-sm text-gray-400">
                    Active signals detected
                  </p>
                  <div className="mt-3 flex items-center text-xs text-green-400">
                    <TrendingUp className="mr-1 size-3" />
                    +23% this week
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-500/20 bg-gradient-to-br from-green-900/30 to-green-800/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-green-400">
                    <Zap className="mr-2 size-5" />
                    Automations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 text-3xl font-bold text-green-400">
                    89
                  </div>
                  <p className="text-sm text-gray-400">Active workflows</p>
                  <div className="mt-3 flex items-center text-xs text-green-400">
                    <Activity className="mr-1 size-3" />
                    Running 24/7
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/30 to-purple-800/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-purple-400">
                    <Users className="mr-2 size-5" />
                    Active Tenants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 text-3xl font-bold text-purple-400">
                    156
                  </div>
                  <p className="text-sm text-gray-400">
                    Multi-tenant workspaces
                  </p>
                  <div className="mt-3 flex items-center text-xs text-green-400">
                    <TrendingUp className="mr-1 size-3" />
                    +12 this month
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-900/30 to-yellow-800/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-yellow-400">
                    <Crown className="mr-2 size-5" />
                    Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 text-3xl font-bold text-yellow-400">
                    $94.2K
                  </div>
                  <p className="text-sm text-gray-400">Monthly recurring</p>
                  <div className="mt-3 flex items-center text-xs text-green-400">
                    <TrendingUp className="mr-1 size-3" />
                    +31% growth
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/50 to-blue-800/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-400">
                    <Brain className="mr-2 size-5" />
                    AI Intelligence Hub
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Patent-protected AI systems powering real-time business
                    intelligence
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="text-white font-semibold">
                          Dual Assistant System
                        </div>
                        <div className="text-xs text-gray-400">
                          Saint (Strategic) + Sal (Operational)
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">
                        ACTIVE
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="text-white font-semibold">
                          Intent Signal Processing
                        </div>
                        <div className="text-xs text-gray-400">
                          Real-time hiring, funding, expansion detection
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">
                        LIVE
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="text-white font-semibold">
                          Sticky AI Companion
                        </div>
                        <div className="text-xs text-gray-400">
                          Cross-platform floating assistant
                        </div>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400">
                        DEPLOYED
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-500/20 bg-gradient-to-br from-orange-900/50 to-orange-800/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-400">
                    <Rocket className="mr-2 size-5" />
                    SaaS Platform Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Enterprise-grade multi-tenant infrastructure with complete
                    automation
                  </p>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <h4 className="mb-3 font-semibold text-white">
                        🚀 Platform Capabilities
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center">
                          <Shield className="mr-2 size-4 text-green-400" />
                          Multi-tenant isolation & security
                        </li>
                        <li className="flex items-center">
                          <Globe className="mr-2 size-4 text-blue-400" />
                          Custom domain + subdomain routing
                        </li>
                        <li className="flex items-center">
                          <Activity className="mr-2 size-4 text-purple-400" />
                          Stripe billing automation (3 tiers)
                        </li>
                        <li className="flex items-center">
                          <BarChart3 className="mr-2 size-4 text-yellow-400" />
                          Real-time analytics & usage tracking
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-3 font-semibold text-white">
                        ⚡ Competitive Edge
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">vs Seamless.ai</span>
                          <Badge className="bg-green-500/20 text-green-400">
                            ACTION-ORIENTED
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">
                            Patent Protection
                          </span>
                          <Badge className="bg-blue-500/20 text-blue-400">
                            #10,290,222
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">
                            Chrome Extension
                          </span>
                          <Badge className="bg-purple-500/20 text-purple-400">
                            DEPLOYED
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Legacy Operations Dashboard */}
            <Card className="border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Legacy Operations Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SaintSalOperationsDashboard />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <SaasAnalyticsDashboard />
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="ai-insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/30 to-purple-800/20">
                <CardHeader>
                  <CardTitle className="text-purple-400">
                    AI Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">
                        Intent Detection Accuracy
                      </span>
                      <span className="text-green-400 font-bold">94.7%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">
                        Automation Success Rate
                      </span>
                      <span className="text-green-400 font-bold">89.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">
                        Lead Conversion Rate
                      </span>
                      <span className="text-green-400 font-bold">31.4%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/30 to-blue-800/20">
                <CardHeader>
                  <CardTitle className="text-blue-400">
                    Chrome Extension Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">
                        Active Installations
                      </span>
                      <span className="text-blue-400 font-bold">2,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Daily Active Users</span>
                      <span className="text-blue-400 font-bold">1,923</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">
                        Actions Triggered Today
                      </span>
                      <span className="text-green-400 font-bold">8,234</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Automation Tab */}
          <TabsContent value="automation" className="space-y-6">
            <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-900/30 to-yellow-800/20">
              <CardHeader>
                <CardTitle className="text-yellow-400">
                  Active Automation Workflows
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">
                        Email Sequences
                      </span>
                      <Badge className="bg-green-500/20 text-green-400">
                        RUNNING
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">47 active campaigns</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">
                        LinkedIn Outreach
                      </span>
                      <Badge className="bg-green-500/20 text-green-400">
                        LIVE
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">
                      23 connection requests
                    </p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">
                        Follow-up Calls
                      </span>
                      <Badge className="bg-blue-500/20 text-blue-400">
                        SCHEDULED
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">12 calls today</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SaaS Tab */}
          <TabsContent value="saas" className="space-y-6">
            <TenantUsageTracker />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
