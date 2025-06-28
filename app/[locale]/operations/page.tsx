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
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  SaintSal™ Operations
                </h1>
                <p className="text-gray-400 text-sm">
                  AI-Powered Business Intelligence
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-500 text-white">
                <Sparkles className="h-3 w-3 mr-1" />
                All Systems Active
              </Badge>
              <Button
                variant="outline"
                className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Operations Dashboard */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800/50">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-yellow-500/20"
            >
              <Activity className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-purple-500/20"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="ai"
              className="data-[state=active]:bg-blue-500/20"
            >
              <Brain className="h-4 w-4 mr-2" />
              AI Insights
            </TabsTrigger>
            <TabsTrigger
              value="usage"
              className="data-[state=active]:bg-green-500/20"
            >
              <Zap className="h-4 w-4 mr-2" />
              Usage
            </TabsTrigger>
            <TabsTrigger
              value="saas"
              className="data-[state=active]:bg-orange-500/20"
            >
              <Building2 className="h-4 w-4 mr-2" />
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
              <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    AI Performance Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">
                        94.7%
                      </div>
                      <div className="text-gray-300">AI Accuracy Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">
                        1.2s
                      </div>
                      <div className="text-gray-300">Avg Response Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-2">
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
              <Card className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 border-orange-500/20">
                <CardHeader>
                  <CardTitle className="text-orange-400 flex items-center">
                    <Building2 className="h-5 w-5 mr-2" />
                    SaaS Platform Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-semibold mb-3">
                        Multi-Tenant Features
                      </h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-center">
                          <Crown className="h-4 w-4 text-yellow-400 mr-2" />
                          Custom branded workspaces
                        </li>
                        <li className="flex items-center">
                          <Zap className="h-4 w-4 text-blue-400 mr-2" />
                          Subdomain routing
                        </li>
                        <li className="flex items-center">
                          <Activity className="h-4 w-4 text-green-400 mr-2" />
                          Usage tracking & limits
                        </li>
                        <li className="flex items-center">
                          <BarChart3 className="h-4 w-4 text-purple-400 mr-2" />
                          Advanced analytics
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-3">
                        Quick Actions
                      </h4>
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full justify-start text-orange-400 border-orange-400"
                          onClick={() =>
                            (window.location.href = "/en/onboarding")
                          }
                        >
                          <Building2 className="h-4 w-4 mr-2" />
                          Create New Tenant
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-orange-400 border-orange-400"
                          onClick={() => (window.location.href = "/en/admin")}
                        >
                          <Settings className="h-4 w-4 mr-2" />
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
