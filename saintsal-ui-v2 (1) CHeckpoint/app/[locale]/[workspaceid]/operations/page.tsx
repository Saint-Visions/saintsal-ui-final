import { Metadata } from "next"

export const metadata: Metadata = {
  title: "SaintSal™ Operations",
  description: "AI-powered business operations dashboard"
}

export default function OperationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-8">
          🔥 SaintSal™ Operations Dashboard - TEST
        </h1>
        <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            ✅ Basic Page Loading Successfully!
          </h2>
          <p className="text-gray-300">
            The development server is working! This is a simplified version to
            test if the app is running.
          </p>
        </div>
      </div>
    </div>
  )
}
