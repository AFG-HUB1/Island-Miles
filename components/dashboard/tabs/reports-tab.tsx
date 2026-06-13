"use client"

import { FileText, Download, Calendar, TrendingUp } from "lucide-react"

const reports = [
  { 
    id: 1, 
    name: "Daily Delivery Summary", 
    type: "Operations", 
    lastGenerated: "Today, 6:00 AM", 
    frequency: "Daily",
    description: "Overview of all deliveries, including completed, pending, and failed"
  },
  { 
    id: 2, 
    name: "Weekly Driver Performance", 
    type: "Performance", 
    lastGenerated: "May 19, 2024", 
    frequency: "Weekly",
    description: "Driver efficiency, ratings, and delivery metrics"
  },
  { 
    id: 3, 
    name: "Monthly Revenue Report", 
    type: "Financial", 
    lastGenerated: "May 1, 2024", 
    frequency: "Monthly",
    description: "Revenue breakdown, COD collections, and financial summaries"
  },
  { 
    id: 4, 
    name: "Parish Coverage Analysis", 
    type: "Analytics", 
    lastGenerated: "May 15, 2024", 
    frequency: "Bi-weekly",
    description: "Delivery coverage and demand by parish"
  },
  { 
    id: 5, 
    name: "Fleet Maintenance Log", 
    type: "Operations", 
    lastGenerated: "May 20, 2024", 
    frequency: "Weekly",
    description: "Vehicle maintenance history and upcoming service schedules"
  },
  { 
    id: 6, 
    name: "Customer Satisfaction Report", 
    type: "Performance", 
    lastGenerated: "May 12, 2024", 
    frequency: "Monthly",
    description: "Customer feedback, ratings, and satisfaction trends"
  },
]

const reportTypes: Record<string, string> = {
  "Operations": "bg-blue-500/20 text-blue-400",
  "Performance": "bg-primary/20 text-primary",
  "Financial": "bg-amber-500/20 text-amber-400",
  "Analytics": "bg-purple-500/20 text-purple-400",
}

export function ReportsTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Generate and download operational reports</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Create Custom Report
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{reports.length}</p>
              <p className="text-xs text-muted-foreground">Available Reports</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">Generated This Month</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">4</p>
              <p className="text-xs text-muted-foreground">Scheduled Reports</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-medium text-foreground">Available Reports</h2>
        </div>
        <div className="divide-y divide-border">
          {reports.map((report) => (
            <div 
              key={report.id}
              className="p-4 hover:bg-white/[0.02] transition-colors flex items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-foreground">{report.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${reportTypes[report.type]}`}>
                      {report.type}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{report.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[10px] text-muted-foreground">Last: {report.lastGenerated}</span>
                    <span className="text-[10px] text-muted-foreground">Frequency: {report.frequency}</span>
                  </div>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-lg text-sm font-medium text-foreground transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
