"use client"

import { User, Bell, Shield, CreditCard, Globe, Palette } from "lucide-react"
import { cn } from "@/lib/utils"

const settingsSections = [
  {
    title: "Account",
    icon: User,
    description: "Manage your account details and preferences",
    items: ["Profile Information", "Email & Password", "Two-Factor Authentication"]
  },
  {
    title: "Notifications",
    icon: Bell,
    description: "Configure how you receive alerts and updates",
    items: ["Push Notifications", "Email Alerts", "SMS Notifications"]
  },
  {
    title: "Security",
    icon: Shield,
    description: "Protect your account and data",
    items: ["Login History", "Active Sessions", "API Keys"]
  },
  {
    title: "Billing",
    icon: CreditCard,
    description: "Manage your subscription and payments",
    items: ["Payment Methods", "Billing History", "Subscription Plan"]
  },
  {
    title: "Localization",
    icon: Globe,
    description: "Set your language and regional preferences",
    items: ["Language", "Time Zone", "Currency"]
  },
  {
    title: "Appearance",
    icon: Palette,
    description: "Customize the look and feel of your dashboard",
    items: ["Theme", "Density", "Sidebar Position"]
  },
]

export function SettingsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {settingsSections.map((section) => {
          const Icon = section.icon
          return (
            <div 
              key={section.title}
              className="bg-card rounded-xl border border-border p-4 hover:border-primary/30 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground">{section.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{section.description}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
