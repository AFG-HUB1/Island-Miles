"use client"

import { Bell, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function TopBar() {
  return (
    <header className="h-14 w-full bg-secondary border-b border-border flex items-center justify-between px-6">
      {/* Left - Breadcrumb/Title area */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Dashboard</span>
        <span className="text-muted-foreground">/</span>
        <span className="text-sm font-medium text-foreground">Overview</span>
      </div>

      {/* Right - Notifications & User */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
        </button>
        
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary/20 text-primary text-xs font-medium">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}
