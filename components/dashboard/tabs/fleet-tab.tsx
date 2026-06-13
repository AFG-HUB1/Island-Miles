"use client"

import { StatCard } from "@/components/dashboard/stat-card"
import { StatusPill } from "@/components/dashboard/status-pill"
import { Truck, Wrench, Fuel, AlertTriangle } from "lucide-react"

const vehicles = [
  { id: "VEH-001", type: "Motorcycle", plate: "JM-1234", status: "active" as const, driver: "Marcus Brown", fuel: 85, nextService: "3 days" },
  { id: "VEH-002", type: "Van", plate: "JM-5678", status: "active" as const, driver: "Keisha Williams", fuel: 62, nextService: "1 week" },
  { id: "VEH-003", type: "Motorcycle", plate: "JM-9012", status: "idle" as const, driver: "Devon Campbell", fuel: 45, nextService: "2 days" },
  { id: "VEH-004", type: "Van", plate: "JM-3456", status: "active" as const, driver: "Shanique Reid", fuel: 78, nextService: "2 weeks" },
  { id: "VEH-005", type: "Motorcycle", plate: "JM-7890", status: "offline" as const, driver: "—", fuel: 0, nextService: "Maintenance" },
  { id: "VEH-006", type: "Truck", plate: "JM-2345", status: "active" as const, driver: "Damian Clarke", fuel: 55, nextService: "5 days" },
  { id: "VEH-007", type: "Motorcycle", plate: "JM-6789", status: "active" as const, driver: "Crystal Morgan", fuel: 90, nextService: "3 weeks" },
  { id: "VEH-008", type: "Van", plate: "JM-0123", status: "idle" as const, driver: "Natasha Gordon", fuel: 30, nextService: "1 day" },
]

export function FleetTab() {
  const activeVehicles = vehicles.filter(v => v.status === "active").length
  const needsService = vehicles.filter(v => v.nextService.includes("day") && !v.nextService.includes("week")).length
  const lowFuel = vehicles.filter(v => v.fuel < 40 && v.fuel > 0).length

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Vehicles" 
          value={vehicles.length} 
          trend={{ value: 0, isPositive: true }}
          icon={<Truck className="w-5 h-5" />}
        />
        <StatCard 
          title="Active Now" 
          value={activeVehicles} 
          trend={{ value: 12, isPositive: true }}
          icon={<Truck className="w-5 h-5" />}
        />
        <StatCard 
          title="Service Due" 
          value={needsService} 
          trend={{ value: 2, isPositive: false }}
          icon={<Wrench className="w-5 h-5" />}
        />
        <StatCard 
          title="Low Fuel" 
          value={lowFuel} 
          trend={{ value: 1, isPositive: false }}
          icon={<Fuel className="w-5 h-5" />}
        />
      </div>

      {/* Fleet Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-foreground">Fleet Inventory</h2>
            <p className="text-xs text-muted-foreground mt-1">Manage your delivery vehicles</p>
          </div>
          <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            Add Vehicle
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Vehicle ID</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Plate</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Assigned Driver</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Fuel</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Next Service</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-primary">{vehicle.id}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{vehicle.type}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{vehicle.plate}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={vehicle.status} />
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{vehicle.driver}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${vehicle.fuel > 50 ? "bg-primary" : vehicle.fuel > 25 ? "bg-amber-500" : "bg-destructive"}`}
                          style={{ width: `${vehicle.fuel}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{vehicle.fuel}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm ${vehicle.nextService.includes("day") && !vehicle.nextService.includes("week") ? "text-amber-500" : vehicle.nextService === "Maintenance" ? "text-destructive" : "text-muted-foreground"}`}>
                      {vehicle.nextService}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
