"use client"

import { useRouter } from "next/navigation"
import { NavItem } from "@/app/page"
import { useAuth } from "@/lib/auth-context"
import { 
  MapPin, 
  Package, 
  BarChart3, 
  Users, 
  UserCircle, 
  MessageSquare, 
  Settings,
  Truck,
  FileText,
  HeadphonesIcon,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeNav: NavItem
  setActiveNav: (nav: NavItem) => void
  unreadMessages: number
}

const navSections = [
  {
    label: "OVERVIEW",
    items: [
      { id: "live-map" as NavItem, label: "Live Map", icon: MapPin },
      { id: "deliveries" as NavItem, label: "Deliveries", icon: Package },
      { id: "analytics" as NavItem, label: "Analytics", icon: BarChart3 },
    ]
  },
  {
    label: "PEOPLE",
    items: [
      { id: "drivers" as NavItem, label: "Drivers", icon: Users },
      { id: "customers" as NavItem, label: "Customers", icon: UserCircle },
      { id: "messages" as NavItem, label: "Messages", icon: MessageSquare, badge: true },
    ]
  },
  {
    label: "OPERATIONS",
    items: [
      { id: "fleet" as NavItem, label: "Fleet Management", icon: Truck },
      { id: "reports" as NavItem, label: "Reports", icon: FileText },
    ]
  },
  {
    label: "SYSTEM",
    items: [
      { id: "support" as NavItem, label: "Support", icon: HeadphonesIcon },
      { id: "settings" as NavItem, label: "Settings", icon: Settings },
    ]
  }
]

export function Sidebar({ activeNav, setActiveNav, unreadMessages }: SidebarProps) {
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <aside className="w-[220px] h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="h-14 flex items-center px-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">AFG</span>
          </div>
          <span className="font-semibold text-foreground">AFG</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {navSections.map((section) => (
          <div key={section.label} className="mb-6">
            <span className="px-3 text-[10px] font-medium text-muted-foreground tracking-wider uppercase">
              {section.label}
            </span>
            <ul className="mt-2 space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = activeNav === item.id
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveNav(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive 
                          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && unreadMessages > 0 && (
                        <span className="min-w-[20px] h-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                          {unreadMessages}
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary text-sm font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email || ""}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  )
}
