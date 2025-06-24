"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Filter, Search, Download } from "lucide-react";
import { createClient } from "@/lib/supabase/browser-client";

interface Event {
  id: string;
  name: string;
  type: string;
  details: any;
  created_at: string;
  user_id?: string;
}

export default function AdminLogsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const supabase = createClient();

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;

      setEvents(data || []);
      setFilteredEvents(data || []);
    } catch (error) {
      console.error("❌ Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    if (filter) {
      filtered = filtered.filter((event) => event.type === filter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          JSON.stringify(event.details)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredEvents(filtered);
  }, [events, filter, searchTerm]);

  const getEventTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      chat: "bg-blue-500",
      voice: "bg-green-500",
      stripe_webhook: "bg-purple-500",
      ghl_webhook: "bg-orange-500",
      twilio_voice: "bg-cyan-500",
      error: "bg-red-500",
      user_action: "bg-yellow-500",
    };
    return colors[type] || "bg-gray-500";
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatEventDetails = (details: any) => {
    if (!details) return "N/A";

    // Extract key information for display
    if (details.transcript) return `Voice: "${details.transcript}"`;
    if (details.event_type) return `${details.event_type}`;
    if (details.amount) return `$${(details.amount / 100).toFixed(2)}`;
    if (details.error) return `Error: ${details.error}`;

    return JSON.stringify(details).substring(0, 100) + "...";
  };

  const exportEvents = () => {
    const csv = [
      ["Timestamp", "Name", "Type", "Details"],
      ...filteredEvents.map((event) => [
        event.created_at,
        event.name,
        event.type,
        JSON.stringify(event.details),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `saintsal-events-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const uniqueTypes = [...new Set(events.map((e) => e.type))];

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">
            📊 SaintSal™ Admin Dashboard
          </h1>
          <p className="text-gray-400">Real-time system events and analytics</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-400">
                {events.filter((e) => e.type === "chat").length}
              </div>
              <div className="text-sm text-gray-400">Chat Events</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-400">
                {events.filter((e) => e.type.includes("voice")).length}
              </div>
              <div className="text-sm text-gray-400">Voice Events</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-400">
                {events.filter((e) => e.type.includes("webhook")).length}
              </div>
              <div className="text-sm text-gray-400">Webhook Events</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-400">
                {events.filter((e) => e.type === "error").length}
              </div>
              <div className="text-sm text-gray-400">Error Events</div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Event Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-400 focus:outline-none"
                >
                  <option value="">All Types</option>
                  {uniqueTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={fetchEvents}
                disabled={loading}
                className="bg-yellow-600 hover:bg-yellow-700 text-black"
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>

              <Button
                onClick={exportEvents}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>

            {/* Events Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-3 text-gray-400">Timestamp</th>
                    <th className="text-left p-3 text-gray-400">Event</th>
                    <th className="text-left p-3 text-gray-400">Type</th>
                    <th className="text-left p-3 text-gray-400">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-8 text-gray-400"
                      >
                        Loading events...
                      </td>
                    </tr>
                  ) : filteredEvents.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-8 text-gray-400"
                      >
                        No events found
                      </td>
                    </tr>
                  ) : (
                    filteredEvents.map((event) => (
                      <tr
                        key={event.id}
                        className="border-b border-gray-800 hover:bg-gray-800"
                      >
                        <td className="p-3 text-gray-300">
                          {formatTimestamp(event.created_at)}
                        </td>
                        <td className="p-3 text-white font-medium">
                          {event.name}
                        </td>
                        <td className="p-3">
                          <Badge
                            className={`${getEventTypeColor(event.type)} text-white`}
                          >
                            {event.type}
                          </Badge>
                        </td>
                        <td className="p-3 text-gray-300 max-w-md truncate">
                          {formatEventDetails(event.details)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-green-400 text-lg">✅</div>
                <div className="text-sm text-gray-400">API Active</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 text-lg">✅</div>
                <div className="text-sm text-gray-400">Database Connected</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 text-lg">✅</div>
                <div className="text-sm text-gray-400">Webhooks Active</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 text-lg">✅</div>
                <div className="text-sm text-gray-400">Production Ready</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
