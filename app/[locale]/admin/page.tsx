"use client"

import { SaasAdminDashboard } from "@/components/admin/saas-admin-dashboard"
import { SaasAnalyticsDashboard } from "@/components/dashboard/saas-analytics-dashboard"
import { TenantUsageTracker } from "@/components/dashboard/tenant-usage-tracker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  BarChart3,
  Users,
  Settings,
  Crown,
  Sparkles
} from "lucide-react"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Admin Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                <Crown className="h-6 w-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  SaintSal™ Admin
                </h1>
                <p className="text-gray-400 text-sm">
                  Multi-Tenant SaaS Management
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-500 text-white">
                <Sparkles className="h-3 w-3 mr-1" />
                All Systems Operational
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

      {/* Admin Dashboard */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-yellow-500/20"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="tenants"
              className="data-[state=active]:bg-blue-500/20"
            >
              <Building2 className="h-4 w-4 mr-2" />
              Tenants
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-purple-500/20"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="usage"
              className="data-[state=active]:bg-green-500/20"
            >
              <Users className="h-4 w-4 mr-2" />
              Usage
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <SaasAdminDashboard />
          </TabsContent>

          <TabsContent value="tenants">
            <div className="space-y-6">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-blue-400" />
                    Tenant Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Manage all your SaaS tenants, monitor their usage, and
                    configure their settings.
                  </p>
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    View All Tenants
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <SaasAnalyticsDashboard />
          </TabsContent>

          <TabsContent value="usage">
            <TenantUsageTracker
              tenantId="demo-tenant"
              plan="pro"
              onUpgradeRequested={() => {
                console.log("Upgrade requested for tenant")
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
