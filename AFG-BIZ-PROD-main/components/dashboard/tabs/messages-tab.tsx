"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

const messages = [
  { 
    id: 1, 
    sender: "Marcus Brown", 
    preview: "Just completed the delivery at Hope Road. Customer was satisfied!", 
    timestamp: "2 min ago",
    unread: true 
  },
  { 
    id: 2, 
    sender: "Keisha Williams", 
    preview: "Having trouble finding the address at 45 Waterloo. Can you confirm?", 
    timestamp: "15 min ago",
    unread: true 
  },
  { 
    id: 3, 
    sender: "Devon Campbell", 
    preview: "Taking a 30 minute break. Will be back online soon.", 
    timestamp: "45 min ago",
    unread: false 
  },
  { 
    id: 4, 
    sender: "Shanique Reid", 
    preview: "Customer at Main St requested a rescheduled delivery for tomorrow.", 
    timestamp: "1 hr ago",
    unread: true 
  },
  { 
    id: 5, 
    sender: "Andre Thompson", 
    preview: "Vehicle maintenance complete. Ready for duty tomorrow.", 
    timestamp: "2 hrs ago",
    unread: false 
  },
  { 
    id: 6, 
    sender: "Crystal Morgan", 
    preview: "Collected COD payment of $4,500 from the last three deliveries.", 
    timestamp: "3 hrs ago",
    unread: true 
  },
  { 
    id: 7, 
    sender: "Damian Clarke", 
    preview: "Traffic heavy on the highway. ETA delayed by 20 minutes.", 
    timestamp: "4 hrs ago",
    unread: false 
  },
  { 
    id: 8, 
    sender: "Natasha Gordon", 
    preview: "Package damaged during transit. Need to file a report.", 
    timestamp: "5 hrs ago",
    unread: true 
  },
]

export function MessagesTab() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMessages = messages.filter(message => 
    message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.preview.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Message List */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-medium text-foreground">Message Threads</h2>
          <p className="text-xs text-muted-foreground mt-1">{messages.filter(m => m.unread).length} unread messages</p>
        </div>
        <div className="divide-y divide-border">
          {filteredMessages.map((message) => (
            <button
              key={message.id}
              className={cn(
                "w-full flex items-start gap-3 p-4 text-left transition-colors hover:bg-white/[0.02]",
                message.unread && "bg-primary/[0.03]"
              )}
            >
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {message.sender.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className={cn(
                    "text-sm truncate",
                    message.unread ? "font-medium text-foreground" : "text-muted-foreground"
                  )}>
                    {message.sender}
                  </span>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0">
                    {message.timestamp}
                  </span>
                </div>
                <p className={cn(
                  "text-xs mt-1 line-clamp-2",
                  message.unread ? "text-foreground" : "text-muted-foreground"
                )}>
                  {message.preview}
                </p>
              </div>
              {message.unread && (
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
