"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, RefreshCw, Home, Users, Calendar } from "lucide-react";

export default function CRMPage() {
  const [iframeKey, setIframeKey] = useState(0);
  const [currentUrl, setCurrentUrl] = useState(
    process.env.NEXT_PUBLIC_GHL_EMBED_URL || "https://app.gohighlevel.com",
  );

  const refreshIframe = () => {
    setIframeKey((prev) => prev + 1);
  };

  const navigateToSection = (section: string) => {
    const baseUrl =
      process.env.NEXT_PUBLIC_GHL_EMBED_URL || "https://app.gohighlevel.com";
    const sectionUrls = {
      home: baseUrl,
      leads: `${baseUrl}/contacts`,
      calendar: `${baseUrl}/calendar`,
      conversations: `${baseUrl}/conversations`,
    };

    const newUrl = sectionUrls[section as keyof typeof sectionUrls] || baseUrl;
    setCurrentUrl(newUrl);
    setIframeKey((prev) => prev + 1);
  };

  const openInNewTab = () => {
    window.open(currentUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header with Navigation Controls */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-yellow-400">
              🔥 SaintSal™ CRM
            </h1>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">GoHighLevel Integration</span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Navigation Buttons */}
            <Button
              onClick={() => navigateToSection("home")}
              variant="outline"
              size="sm"
              className="text-gray-300 border-gray-600 hover:bg-gray-700"
            >
              <Home className="w-4 h-4 mr-1" />
              Dashboard
            </Button>

            <Button
              onClick={() => navigateToSection("leads")}
              variant="outline"
              size="sm"
              className="text-gray-300 border-gray-600 hover:bg-gray-700"
            >
              <Users className="w-4 h-4 mr-1" />
              Leads
            </Button>

            <Button
              onClick={() => navigateToSection("calendar")}
              variant="outline"
              size="sm"
              className="text-gray-300 border-gray-600 hover:bg-gray-700"
            >
              <Calendar className="w-4 h-4 mr-1" />
              Calendar
            </Button>

            {/* Control Buttons */}
            <Button
              onClick={refreshIframe}
              variant="outline"
              size="sm"
              className="text-gray-300 border-gray-600 hover:bg-gray-700"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>

            <Button
              onClick={openInNewTab}
              variant="outline"
              size="sm"
              className="text-gray-300 border-gray-600 hover:bg-gray-700"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Open External
            </Button>
          </div>
        </div>
      </div>

      {/* CRM Iframe */}
      <div className="flex-1 relative">
        <iframe
          key={iframeKey}
          src={currentUrl}
          className="w-full h-full border-0"
          allow="fullscreen"
          loading="lazy"
          title="GoHighLevel CRM"
          onError={(e) => {
            console.error("❌ CRM Iframe Error:", e);
          }}
          onLoad={() => {
            console.log("✅ CRM Iframe Loaded:", currentUrl);
          }}
        />

        {/* Loading Overlay */}
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading CRM...</p>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800 border-t border-gray-700 px-4 py-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-green-400">✅ CRM Connected</span>
          <span className="text-gray-400">
            Current:{" "}
            {currentUrl.includes("contacts")
              ? "Leads"
              : currentUrl.includes("calendar")
                ? "Calendar"
                : currentUrl.includes("conversations")
                  ? "Conversations"
                  : "Dashboard"}
          </span>
        </div>
      </div>
    </div>
  );
}
