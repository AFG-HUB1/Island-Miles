"use client"

import { useEffect, useRef } from "react"
import { StatCard } from "@/components/dashboard/stat-card"
import { StatusPill } from "@/components/dashboard/status-pill"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Package, CheckCircle, XCircle } from "lucide-react"

const drivers = [
  { id: 1, name: "Marcus Brown", status: "active" as const, jobs: 8, eta: "12 min", x: 0.35, y: 0.45 },
  { id: 2, name: "Keisha Williams", status: "active" as const, jobs: 6, eta: "25 min", x: 0.55, y: 0.35 },
  { id: 3, name: "Devon Campbell", status: "idle" as const, jobs: 4, eta: "—", x: 0.25, y: 0.55 },
  { id: 4, name: "Shanique Reid", status: "active" as const, jobs: 7, eta: "18 min", x: 0.75, y: 0.4 },
  { id: 5, name: "Andre Thompson", status: "offline" as const, jobs: 0, eta: "—", x: 0.45, y: 0.65 },
]

const parishes = [
  { name: "Kingston", x: 0.55, y: 0.48 },
  { name: "St. Andrew", x: 0.52, y: 0.42 },
  { name: "St. Catherine", x: 0.42, y: 0.45 },
  { name: "St. James", x: 0.2, y: 0.35 },
  { name: "Clarendon", x: 0.35, y: 0.5 },
  { name: "St. Elizabeth", x: 0.28, y: 0.58 },
]

export function LiveMapTab() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Sea background
    ctx.fillStyle = "#0F1117"
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Simplified Jamaica shape
    ctx.beginPath()
    ctx.moveTo(rect.width * 0.1, rect.height * 0.45)
    ctx.bezierCurveTo(
      rect.width * 0.15, rect.height * 0.3,
      rect.width * 0.35, rect.height * 0.25,
      rect.width * 0.55, rect.height * 0.28
    )
    ctx.bezierCurveTo(
      rect.width * 0.75, rect.height * 0.3,
      rect.width * 0.9, rect.height * 0.38,
      rect.width * 0.92, rect.height * 0.48
    )
    ctx.bezierCurveTo(
      rect.width * 0.9, rect.height * 0.6,
      rect.width * 0.7, rect.height * 0.72,
      rect.width * 0.5, rect.height * 0.7
    )
    ctx.bezierCurveTo(
      rect.width * 0.3, rect.height * 0.72,
      rect.width * 0.12, rect.height * 0.6,
      rect.width * 0.1, rect.height * 0.45
    )
    ctx.closePath()
    ctx.fillStyle = "#1E3A2F"
    ctx.fill()
    ctx.strokeStyle = "rgba(0, 194, 124, 0.3)"
    ctx.lineWidth = 1
    ctx.stroke()

    // Delivery zone circles
    const zones = [
      { x: 0.55, y: 0.45, r: 0.12 },
      { x: 0.35, y: 0.5, r: 0.1 },
      { x: 0.2, y: 0.4, r: 0.08 },
    ]
    
    zones.forEach(zone => {
      ctx.beginPath()
      ctx.arc(rect.width * zone.x, rect.height * zone.y, rect.width * zone.r, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(59, 130, 246, 0.4)"
      ctx.setLineDash([5, 5])
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.setLineDash([])
    })

    // Parish labels
    ctx.font = "10px DM Sans"
    ctx.fillStyle = "#8B96B0"
    ctx.textAlign = "center"
    parishes.forEach(parish => {
      ctx.fillText(parish.name, rect.width * parish.x, rect.height * parish.y)
    })

    // Driver pins
    drivers.forEach(driver => {
      const x = rect.width * driver.x
      const y = rect.height * driver.y

      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fillStyle = driver.status === "active" ? "#00C27C" : driver.status === "idle" ? "#F59E0B" : "#6B7280"
      ctx.fill()

      // Name label
      ctx.font = "9px DM Sans"
      ctx.fillStyle = "#F0F4FF"
      ctx.textAlign = "center"
      ctx.fillText(driver.name.split(" ")[0], x, y - 12)
    })

    // Legend
    const legendX = 20
    const legendY = rect.height - 60
    
    ctx.font = "10px DM Sans"
    ctx.fillStyle = "#8B96B0"
    ctx.textAlign = "left"
    ctx.fillText("LEGEND", legendX, legendY)

    const legendItems = [
      { color: "#00C27C", label: "Active" },
      { color: "#F59E0B", label: "Idle" },
      { color: "#6B7280", label: "Offline" },
    ]

    legendItems.forEach((item, i) => {
      const y = legendY + 15 + i * 16
      ctx.beginPath()
      ctx.arc(legendX + 5, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = item.color
      ctx.fill()
      ctx.fillStyle = "#8B96B0"
      ctx.fillText(item.label, legendX + 16, y + 3)
    })
  }, [])

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Active Drivers" 
          value={12} 
          trend={{ value: 8, isPositive: true }}
          icon={<Users className="w-5 h-5" />}
        />
        <StatCard 
          title="In Transit" 
          value={34} 
          trend={{ value: 12, isPositive: true }}
          icon={<Package className="w-5 h-5" />}
        />
        <StatCard 
          title="Completed Today" 
          value={156} 
          trend={{ value: 5, isPositive: true }}
          icon={<CheckCircle className="w-5 h-5" />}
        />
        <StatCard 
          title="Failed Deliveries" 
          value={8} 
          trend={{ value: 3, isPositive: false }}
          icon={<XCircle className="w-5 h-5" />}
        />
      </div>

      {/* Map */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-medium text-foreground">Jamaica Live Map</h2>
          <p className="text-xs text-muted-foreground mt-1">Real-time driver locations</p>
        </div>
        <div className="relative h-[400px]">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      {/* Driver List */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-medium text-foreground">Active Drivers</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Driver</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Jobs</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">ETA</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {driver.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-foreground">{driver.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill status={driver.status} />
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{driver.jobs}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{driver.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
