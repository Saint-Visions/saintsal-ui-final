"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Brand } from "@/components/ui/brand"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function SetupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    role: "",
    businessGoals: "",
    aiExperience: "",
    preferredName: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete setup and redirect to chat
      router.push("/en/workspace1/chat")
    }
  }

  const handleSkip = () => {
    router.push("/en/workspace1/chat")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-2xl font-bold text-transparent">
                Welcome to the Saints, {formData.firstName || "Champion"}! 😇
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                Let's get your AI sanctuary configured
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  placeholder="What should we call you?"
                  value={formData.firstName}
                  onChange={e => handleInputChange("firstName", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Your family name"
                  value={formData.lastName}
                  onChange={e => handleInputChange("lastName", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="preferredName" className="text-sm font-medium">
                What should your AI call you? (Optional)
              </Label>
              <Input
                id="preferredName"
                placeholder="Boss, Chief, Your Majesty... 👑"
                value={formData.preferredName}
                onChange={e =>
                  handleInputChange("preferredName", e.target.value)
                }
                className="mt-1"
              />
              <p className="mt-1 text-xs text-gray-500">
                Your AI assistants will use this to address you personally
              </p>
            </div>

            <div>
              <Label htmlFor="company" className="text-sm font-medium">
                Company/Business Name
              </Label>
              <Input
                id="company"
                placeholder="What empire are you building?"
                value={formData.company}
                onChange={e => handleInputChange("company", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="role" className="text-sm font-medium">
                Your Role/Title
              </Label>
              <Input
                id="role"
                placeholder="CEO, Founder, Sales Director, etc."
                value={formData.role}
                onChange={e => handleInputChange("role", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                Tell Us About Your Goals 🎯
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                This helps us personalize your AI experience
              </p>
            </div>

            <div>
              <Label htmlFor="businessGoals" className="text-sm font-medium">
                What are your main business goals? (Optional)
              </Label>
              <Textarea
                id="businessGoals"
                placeholder="e.g., Generate more leads, improve sales process, scale operations, automate tasks..."
                value={formData.businessGoals}
                onChange={e =>
                  handleInputChange("businessGoals", e.target.value)
                }
                className="mt-1 min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="aiExperience" className="text-sm font-medium">
                Your AI Experience Level
              </Label>
              <select
                id="aiExperience"
                value={formData.aiExperience}
                onChange={e =>
                  handleInputChange("aiExperience", e.target.value)
                }
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm"
              >
                <option value="">Select your experience level</option>
                <option value="beginner">
                  🌱 New to AI - Show me everything!
                </option>
                <option value="intermediate">
                  ⚡ Some AI experience - Let's get advanced
                </option>
                <option value="expert">
                  🚀 AI Expert - I want full control
                </option>
              </select>
            </div>

            {/* AI Features Preview */}
            <div className="rounded-lg border border-blue-500/20 bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-4">
              <h3 className="mb-3 text-sm font-semibold text-blue-400">
                🔥 Your Dual AI Arsenal:
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded bg-blue-800/30 p-3">
                  <h4 className="text-sm font-medium text-blue-300">
                    🧠 Azure Cognitive
                  </h4>
                  <p className="text-xs text-gray-400">
                    Advanced reasoning, analysis, complex problem-solving
                  </p>
                </div>
                <div className="rounded bg-green-800/30 p-3">
                  <h4 className="text-sm font-medium text-green-300">
                    ⚡ OpenAI GPT-4o
                  </h4>
                  <p className="text-xs text-gray-400">
                    Creative writing, conversations, quick responses
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="bg-gradient-to-r from-green-400 to-yellow-600 bg-clip-text text-2xl font-bold text-transparent">
                🎉 You're All Set, Saint {formData.firstName}!
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                Your AI sanctuary is ready - let's start cooking!
              </p>
            </div>

            {/* Setup Summary */}
            <div className="rounded-lg border border-green-500/20 bg-gradient-to-r from-green-900/20 to-yellow-900/20 p-4">
              <h3 className="mb-3 text-sm font-semibold text-green-400">
                ✅ Your Saint Profile:
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-400">Name:</span>{" "}
                  <span className="text-white">
                    {formData.firstName} {formData.lastName}
                  </span>
                </p>
                {formData.preferredName && (
                  <p>
                    <span className="text-gray-400">AI will call you:</span>{" "}
                    <span className="text-yellow-400">
                      {formData.preferredName}
                    </span>
                  </p>
                )}
                {formData.company && (
                  <p>
                    <span className="text-gray-400">Company:</span>{" "}
                    <span className="text-white">{formData.company}</span>
                  </p>
                )}
                {formData.role && (
                  <p>
                    <span className="text-gray-400">Role:</span>{" "}
                    <span className="text-white">{formData.role}</span>
                  </p>
                )}
                <p>
                  <span className="text-gray-400">AI Experience:</span>{" "}
                  <span className="text-blue-400">
                    {formData.aiExperience || "Ready to learn!"}
                  </span>
                </p>
              </div>
            </div>

            {/* What's Next */}
            <div className="rounded-lg border border-purple-500/20 bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-4">
              <h3 className="mb-3 text-sm font-semibold text-purple-400">
                🚀 What happens now:
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  • Start with{" "}
                  <span className="text-green-400">FREE dual AI access</span>
                </li>
                <li>
                  • Try <span className="text-blue-400">smart search</span> and{" "}
                  <span className="text-purple-400">chat features</span>
                </li>
                <li>
                  • Explore your{" "}
                  <span className="text-yellow-400">AI companion</span>{" "}
                  capabilities
                </li>
                <li>
                  • Upgrade to{" "}
                  <span className="text-yellow-400">$27/month</span> when you're
                  ready for unlimited power
                </li>
              </ul>
            </div>

            {/* Quick Start Options */}
            <div className="grid gap-3 md:grid-cols-2">
              <Button
                onClick={() => router.push("/en/workspace1/chat")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white hover:from-blue-500 hover:to-purple-500"
              >
                💬 Start Chatting with AI
              </Button>
              <Button
                onClick={() => router.push("/en/workspace1/operations")}
                variant="outline"
                className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
              >
                📊 Explore Operations
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-2xl">
      <div className="animate-in text-foreground flex w-full flex-1 flex-col justify-center gap-2">
        <Brand />

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map(step => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex size-8 items-center justify-center rounded-full text-sm font-bold ${
                    step <= currentStep
                      ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`mx-2 h-1 w-12 ${
                      step < currentStep ? "bg-yellow-500" : "bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 text-center">
            <span className="text-sm text-gray-400">
              Step {currentStep} of 3
            </span>
          </div>
        </div>

        {/* Step Content */}
        {renderStep()}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-gray-400 hover:text-white"
          >
            Skip Setup
          </Button>

          <div className="flex gap-3">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="border-gray-600"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 font-bold text-black hover:from-yellow-400 hover:to-yellow-500"
            >
              {currentStep === 3 ? "🚀 Enter Your AI Sanctuary" : "Continue"}
            </Button>
          </div>
        </div>

        {/* Saint Status */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-lg border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 px-4 py-2">
            <span className="text-sm font-semibold text-yellow-400">
              ✨ Saint Status: Initializing
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            Dual AI Platform • Free Tier Active
          </p>
        </div>
      </div>
    </div>
  )
}
