"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Copy,
  Users,
  TrendingUp,
  Gift,
  Plus,
  ExternalLink,
  DollarSign,
  AlertCircle
} from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface ReferralPartner {
  id: string
  referral_code: string
  partner_name: string
  partner_email: string
  commission_rate: number
  status: string
  created_at: string
}

interface Referral {
  id: string
  referral_code: string
  lead_name: string
  lead_email: string
  status: string
  created_at: string
  partner_id?: string
}

export function ReferralNetwork() {
  const [partners, setPartners] = useState<ReferralPartner[]>([])
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newPartner, setNewPartner] = useState({
    partner_name: "",
    partner_email: "",
    commission_rate: 10
  })
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const initializeData = async () => {
      setInitialLoading(true)
      try {
        // Check authentication by making a simple request
        const authCheck = await fetch("/api/referrals/generate", {
          method: "GET",
          credentials: "include"
        })

        if (authCheck.status === 401) {
          setIsAuthenticated(false)
          toast.error("Please log in to access referral network")
          router.push("/en/login")
          return
        }

        setIsAuthenticated(true)
        await Promise.all([fetchPartners(), fetchReferrals()])
      } catch (error) {
        console.error("Initialization error:", error)
        setIsAuthenticated(false)
      } finally {
        setInitialLoading(false)
      }
    }

    initializeData()
  }, [])

  const fetchPartners = async () => {
    try {
      const response = await fetch("/api/referrals/generate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Please log in to view referral partners")
          return
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (data.success) {
        setPartners(data.data || [])
      } else {
        console.error("Failed to fetch partners:", data.error)
        toast.error(data.error || "Failed to fetch partners")
      }
    } catch (error) {
      console.error("Failed to fetch partners:", error)
      toast.error("Failed to fetch partners")
    }
  }

  const fetchReferrals = async () => {
    try {
      const response = await fetch("/api/referrals/track", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Please log in to view referrals")
          return
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (data.success) {
        setReferrals(data.data || [])
      } else {
        console.error("Failed to fetch referrals:", data.error)
        toast.error(data.error || "Failed to fetch referrals")
      }
    } catch (error) {
      console.error("Failed to fetch referrals:", error)
      toast.error("Failed to fetch referrals")
    }
  }

  const createPartner = async () => {
    if (!newPartner.partner_name || !newPartner.partner_email) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/referrals/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(newPartner)
      })

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Authentication required. Please log in again.")
          router.push("/en/login")
          return
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (data.success) {
        toast.success(data.message || "Partner created successfully!")
        setIsCreateDialogOpen(false)
        setNewPartner({
          partner_name: "",
          partner_email: "",
          commission_rate: 10
        })
        await fetchPartners()
      } else {
        toast.error(data.error || "Failed to create partner")
      }
    } catch (error) {
      console.error("Create partner error:", error)
      toast.error("Failed to create partner")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard!`)
  }

  const generateReferralLink = (code: string, type: string = "landing") => {
    const baseUrl = window.location.origin
    const links = {
      landing: `${baseUrl}?ref=${code}`,
      signup: `${baseUrl}/setup?ref=${code}`,
      demo: `${baseUrl}/demo?ref=${code}`
    }
    return links[type as keyof typeof links] || links.landing
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "tracked":
        return "bg-blue-500"
      case "converted":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const totalReferrals = referrals.length
  const convertedReferrals = referrals.filter(
    r => r.status === "converted"
  ).length
  const conversionRate =
    totalReferrals > 0 ? (convertedReferrals / totalReferrals) * 100 : 0

  // Show loading state
  if (initialLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 size-8 animate-spin rounded-full border-b-2 border-yellow-400"></div>
          <p className="text-gray-400">Loading referral network...</p>
        </div>
      </div>
    )
  }

  // Show authentication error
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mb-4 size-12 text-red-400" />
          <p className="text-gray-400">
            Please log in to access referral network
          </p>
          <Button
            onClick={() => router.push("/en/login")}
            className="mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black"
          >
            Go to Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-yellow-400">
            🤝 SaintSal™ Referral Network
          </h2>
          <p className="text-gray-400">
            Leverage your network to accelerate growth
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 font-semibold text-black">
              <Plus className="mr-2 size-4" />
              Add Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="border-yellow-500/20 bg-gray-900">
            <DialogHeader>
              <DialogTitle className="text-yellow-400">
                Create Referral Partner
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300">
                  Partner Name
                </label>
                <Input
                  placeholder="John Smith"
                  value={newPartner.partner_name}
                  onChange={e =>
                    setNewPartner({
                      ...newPartner,
                      partner_name: e.target.value
                    })
                  }
                  className="border-yellow-500/50 bg-black"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">
                  Partner Email
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={newPartner.partner_email}
                  onChange={e =>
                    setNewPartner({
                      ...newPartner,
                      partner_email: e.target.value
                    })
                  }
                  className="border-yellow-500/50 bg-black"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">
                  Commission Rate (%)
                </label>
                <Input
                  type="number"
                  value={newPartner.commission_rate}
                  onChange={e =>
                    setNewPartner({
                      ...newPartner,
                      commission_rate: parseInt(e.target.value) || 10
                    })
                  }
                  className="border-yellow-500/50 bg-black"
                />
              </div>
              <Button
                onClick={createPartner}
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black"
              >
                Create Partner
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="border-yellow-500/20 bg-gradient-to-br from-gray-900 to-black">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Partners</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {partners.filter(p => p.status === "active").length}
                </p>
              </div>
              <Users className="size-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-gradient-to-br from-gray-900 to-black">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Referrals</p>
                <p className="text-2xl font-bold text-green-400">
                  {totalReferrals}
                </p>
              </div>
              <TrendingUp className="size-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-gradient-to-br from-gray-900 to-black">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Conversion Rate</p>
                <p className="text-2xl font-bold text-purple-400">
                  {conversionRate.toFixed(1)}%
                </p>
              </div>
              <Gift className="size-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-gradient-to-br from-gray-900 to-black">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Est. Commissions</p>
                <p className="text-2xl font-bold text-blue-400">
                  $
                  {(
                    ((convertedReferrals *
                      partners.reduce((acc, p) => acc + p.commission_rate, 0)) /
                      partners.length) *
                    100
                  ).toFixed(0)}
                </p>
              </div>
              <DollarSign className="size-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="partners">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
        </TabsList>

        <TabsContent value="partners" className="space-y-4">
          {partners.length === 0 ? (
            <Card className="border-gray-500/20 bg-gradient-to-br from-gray-900 to-black">
              <CardContent className="flex min-h-[200px] items-center justify-center p-8">
                <div className="text-center">
                  <Users className="mb-4 size-12 text-gray-400" />
                  <h3 className="mb-2 text-lg font-semibold text-gray-300">
                    No referral partners yet
                  </h3>
                  <p className="mb-4 text-sm text-gray-400">
                    Create your first referral partner to start growing your
                    network
                  </p>
                  <Button
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black"
                  >
                    <Plus className="mr-2 size-4" />
                    Add Your First Partner
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            partners.map(partner => (
              <Card
                key={partner.id}
                className="border-yellow-500/20 bg-gradient-to-br from-gray-900 to-black"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-yellow-400">
                      {partner.partner_name}
                    </CardTitle>
                    <Badge
                      className={`${getStatusColor(partner.status)} text-white`}
                    >
                      {partner.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Referral Code:</span>
                      <div className="flex items-center gap-2">
                        <code className="rounded bg-black px-2 py-1 text-yellow-400">
                          {partner.referral_code}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(
                              partner.referral_code,
                              "Referral code"
                            )
                          }
                        >
                          <Copy className="size-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Commission Rate:</span>
                      <span className="font-semibold text-green-400">
                        {partner.commission_rate}%
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-gray-400">Referral Links:</span>
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                        {["landing", "signup", "demo"].map(type => (
                          <Button
                            key={type}
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                generateReferralLink(
                                  partner.referral_code,
                                  type
                                ),
                                `${type} link`
                              )
                            }
                            className="text-xs"
                          >
                            <ExternalLink className="mr-1 size-3" />
                            {type}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="referrals" className="space-y-4">
          {referrals.length === 0 ? (
            <Card className="border-gray-500/20 bg-gradient-to-br from-gray-900 to-black">
              <CardContent className="flex min-h-[200px] items-center justify-center p-8">
                <div className="text-center">
                  <TrendingUp className="mb-4 size-12 text-gray-400" />
                  <h3 className="mb-2 text-lg font-semibold text-gray-300">
                    No referrals tracked yet
                  </h3>
                  <p className="mb-4 text-sm text-gray-400">
                    Share your referral links to start tracking leads
                  </p>
                  <Button
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black"
                  >
                    <Plus className="mr-2 size-4" />
                    Create Referral Partner
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            referrals.map(referral => (
              <Card
                key={referral.id}
                className="border-green-500/20 bg-gradient-to-br from-gray-900 to-black"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-green-400">
                        {referral.lead_name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {referral.lead_email}
                      </p>
                      <p className="text-xs text-gray-500">
                        Code: {referral.referral_code}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`${getStatusColor(referral.status)} text-white`}
                      >
                        {referral.status}
                      </Badge>
                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(referral.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
