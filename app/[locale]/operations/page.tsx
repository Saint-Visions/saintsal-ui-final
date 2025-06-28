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
  Zap
} from "lucide-react"

export default function OperationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Operations Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600">
                <Activity className="size-6 text-black" />
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-2xl font-bold text-transparent">
                  SaintSal™ Operations
                </h1>
                <p className="text-sm text-gray-400">
                  AI-Powered Business Intelligence
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-500 text-white">
                <Sparkles className="mr-1 size-3" />
                All Systems Active
              </Badge>
              <Button
                variant="outline"
                className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
              >
                <Settings className="mr-2 size-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Operations Dashboard */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800/50">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-yellow-500/20"
            >
              <Activity className="mr-2 size-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-purple-500/20"
            >
              <BarChart3 className="mr-2 size-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="ai"
              className="data-[state=active]:bg-blue-500/20"
            >
              <Brain className="mr-2 size-4" />
              AI Insights
            </TabsTrigger>
            <TabsTrigger
              value="usage"
              className="data-[state=active]:bg-green-500/20"
            >
              <Zap className="mr-2 size-4" />
              Usage
            </TabsTrigger>
            <TabsTrigger
              value="saas"
              className="data-[state=active]:bg-orange-500/20"
            >
              <Building2 className="mr-2 size-4" />
              SaaS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <SaintSalOperationsDashboard />
          </TabsContent>

          <TabsContent value="analytics">
            <SaasAnalyticsDashboard />
          </TabsContent>

          <TabsContent value="ai">
            <div className="space-y-6">
              <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/50 to-blue-800/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-400">
                    <Brain className="mr-2 size-5" />
                    AI Performance Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="text-center">
                      <div className="mb-2 text-3xl font-bold text-blue-400">
                        94.7%
                      </div>
                      <div className="text-gray-300">AI Accuracy Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="mb-2 text-3xl font-bold text-green-400">
                        1.2s
                      </div>
                      <div className="text-gray-300">Avg Response Time</div>
                    </div>
                    <div className="text-center">
                      <div className="mb-2 text-3xl font-bold text-purple-400">
                        2.4K
                      </div>
                      <div className="text-gray-300">Queries Today</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="usage">
            <TenantUsageTracker
              tenantId="current-user"
              plan="pro"
              onUpgradeRequested={() => {
                window.location.href = "/en/pricing"
              }}
            />
          </TabsContent>

          <TabsContent value="saas">
            <div className="space-y-6">
              <Card className="border-orange-500/20 bg-gradient-to-br from-orange-900/50 to-orange-800/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-400">
                    <Building2 className="mr-2 size-5" />
                    SaaS Platform Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-3 font-semibold text-white">
                        Multi-Tenant Features
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center">
                          <Crown className="mr-2 size-4 text-yellow-400" />
                          Custom branded workspaces
                        </li>
                        <li className="flex items-center">
                          <Zap className="mr-2 size-4 text-blue-400" />
                          Subdomain routing
                        </li>
                        <li className="flex items-center">
                          <Activity className="mr-2 size-4 text-green-400" />
                          Usage tracking & limits
                        </li>
                        <li className="flex items-center">
                          <BarChart3 className="mr-2 size-4 text-purple-400" />
                          Advanced analytics
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-3 font-semibold text-white">
                        Quick Actions
                      </h4>
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full justify-start border-orange-400 text-orange-400"
                          onClick={() =>
                            (window.location.href = "/en/onboarding")
                          }
                        >
                          <Building2 className="mr-2 size-4" />
                          Create New Tenant
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start border-orange-400 text-orange-400"
                          onClick={() => (window.location.href = "/en/admin")}
                        >
                          <Settings className="mr-2 size-4" />
                          Admin Dashboard
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
