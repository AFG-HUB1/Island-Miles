"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { LiveMapTab } from "@/components/dashboard/tabs/live-map-tab"
import { AnalyticsTab } from "@/components/dashboard/tabs/analytics-tab"
import { DeliveriesTab } from "@/components/dashboard/tabs/deliveries-tab"
import { DriversTab } from "@/components/dashboard/tabs/drivers-tab"
import { CustomersTab } from "@/components/dashboard/tabs/customers-tab"
import { MessagesTab } from "@/components/dashboard/tabs/messages-tab"
import { SettingsTab } from "@/components/dashboard/tabs/settings-tab"
import { FleetTab } from "@/components/dashboard/tabs/fleet-tab"
import { ReportsTab } from "@/components/dashboard/tabs/reports-tab"
import { SupportTab } from "@/components/dashboard/tabs/support-tab"

export type NavItem = 
  | "live-map" 
  | "deliveries" 
  | "analytics" 
  | "drivers" 
  | "customers" 
  | "messages" 
  | "settings"
  | "fleet"
  | "reports"
  | "support"

export default function Dashboard() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [activeNav, setActiveNav] = useState<NavItem>("live-map")
  const [unreadMessages] = useState(5)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const renderContent = () => {
    switch (activeNav) {
      case "live-map":
        return <LiveMapTab />
      case "deliveries":
        return <DeliveriesTab />
      case "analytics":
        return <AnalyticsTab />
      case "drivers":
        return <DriversTab />
      case "customers":
        return <CustomersTab />
      case "messages":
        return <MessagesTab />
      case "settings":
        return <SettingsTab />
      case "fleet":
        return <FleetTab />
      case "reports":
        return <ReportsTab />
      case "support":
        return <SupportTab />
      default:
        return <LiveMapTab />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar 
        activeNav={activeNav} 
        setActiveNav={setActiveNav} 
        unreadMessages={unreadMessages}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
