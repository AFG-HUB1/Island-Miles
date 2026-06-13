"use client"

import { useState } from "react"
import { MessageCircle, Phone, Mail, FileQuestion, ChevronRight, Search } from "lucide-react"
import { cn } from "@/lib/utils"

const supportChannels = [
  { 
    id: "chat", 
    title: "Live Chat", 
    description: "Chat with our support team in real-time", 
    icon: MessageCircle,
    availability: "Available 24/7",
    action: "Start Chat"
  },
  { 
    id: "phone", 
    title: "Phone Support", 
    description: "Call us for immediate assistance", 
    icon: Phone,
    availability: "Mon-Fri, 8AM-6PM",
    action: "Call Now"
  },
  { 
    id: "email", 
    title: "Email Support", 
    description: "Send us a detailed message", 
    icon: Mail,
    availability: "Response within 24hrs",
    action: "Send Email"
  },
]

const faqs = [
  { 
    id: 1, 
    question: "How do I add a new driver to the system?", 
    answer: "Navigate to the Drivers tab and click 'Add Driver'. Fill in the required information and submit." 
  },
  { 
    id: 2, 
    question: "How do I track a delivery in real-time?", 
    answer: "Go to the Live Map tab to see all active deliveries and driver locations on the map." 
  },
  { 
    id: 3, 
    question: "How do I process COD collections?", 
    answer: "COD amounts are automatically tracked. View pending collections in the Drivers tab under 'COD Held'." 
  },
  { 
    id: 4, 
    question: "How do I generate reports?", 
    answer: "Visit the Reports tab to access pre-built reports or create custom reports based on your needs." 
  },
  { 
    id: 5, 
    question: "How do I schedule vehicle maintenance?", 
    answer: "Go to Fleet Management and click on the vehicle. You can schedule maintenance from the vehicle details." 
  },
]

const tickets = [
  { id: "TKT-001", subject: "Unable to assign driver to route", status: "open", created: "2 hours ago" },
  { id: "TKT-002", subject: "COD report discrepancy", status: "in-progress", created: "1 day ago" },
  { id: "TKT-003", subject: "Map not loading properly", status: "resolved", created: "3 days ago" },
]

const ticketStatusColors: Record<string, string> = {
  "open": "bg-amber-500/20 text-amber-400",
  "in-progress": "bg-blue-500/20 text-blue-400",
  "resolved": "bg-primary/20 text-primary",
}

export function SupportTab() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Support Center</h1>
        <p className="text-sm text-muted-foreground mt-1">Get help with any issues or questions</p>
      </div>

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {supportChannels.map((channel) => {
          const Icon = channel.icon
          return (
            <div 
              key={channel.id}
              className="bg-card rounded-xl border border-border p-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-foreground">{channel.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{channel.description}</p>
                  <p className="text-[10px] text-primary mt-2">{channel.availability}</p>
                </div>
              </div>
              <button className="w-full mt-4 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                {channel.action}
              </button>
            </div>
          )
        })}
      </div>

      {/* FAQ Section */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileQuestion className="w-5 h-5 text-primary" />
              <h2 className="text-sm font-medium text-foreground">Frequently Asked Questions</h2>
            </div>
          </div>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <div className="divide-y divide-border">
          {filteredFaqs.map((faq) => (
            <button
              key={faq.id}
              onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
              className="w-full p-4 text-left hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-foreground">{faq.question}</span>
                <ChevronRight className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform flex-shrink-0",
                  expandedFaq === faq.id && "rotate-90"
                )} />
              </div>
              {expandedFaq === faq.id && (
                <p className="text-xs text-muted-foreground mt-2 pr-8">{faq.answer}</p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-medium text-foreground">Your Support Tickets</h2>
          <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            New Ticket
          </button>
        </div>
        <div className="divide-y divide-border">
          {tickets.map((ticket) => (
            <div 
              key={ticket.id}
              className="p-4 hover:bg-white/[0.02] transition-colors flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-primary">{ticket.id}</span>
                <span className="text-sm text-foreground">{ticket.subject}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{ticket.created}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${ticketStatusColors[ticket.status]}`}>
                  {ticket.status.replace("-", " ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
