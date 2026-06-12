"use client"

import { useState } from "react"
import { StatCard } from "@/components/dashboard/stat-card"
import { Users, Package, CheckCircle, XCircle, Calendar, Filter, ChevronDown } from "lucide-react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Cell, 
  PieChart, 
  Pie,
  LineChart,
  Line,
  Tooltip
} from "recharts"

const weeklyData = [
  { day: "Mon", deliveries: 145, scheduled: 32 },
  { day: "Tue", deliveries: 168, scheduled: 28 },
  { day: "Wed", deliveries: 132, scheduled: 45 },
  { day: "Thu", deliveries: 189, scheduled: 38 },
  { day: "Fri", deliveries: 201, scheduled: 52 },
  { day: "Sat", deliveries: 156, scheduled: 41 },
  { day: "Sun", deliveries: 88, scheduled: 18 },
]

const parishData = [
  { name: "Kingston", deliveries: 342, scheduled: 45 },
  { name: "St. Andrew", deliveries: 298, scheduled: 38 },
  { name: "St. Catherine", deliveries: 187, scheduled: 29 },
  { name: "St. James", deliveries: 156, scheduled: 22 },
  { name: "Clarendon", deliveries: 98, scheduled: 15 },
  { name: "St. Elizabeth", deliveries: 67, scheduled: 11 },
]

const statusData = [
  { name: "Delivered", value: 82, color: "#00C27C" },
  { name: "Pending", value: 13, color: "#F59E0B" },
  { name: "Failed", value: 5, color: "#EF4444" },
]

const scheduledStatusData = [
  { name: "Confirmed", value: 65, color: "#00C27C" },
  { name: "Pending Confirmation", value: 25, color: "#F59E0B" },
  { name: "Cancelled", value: 10, color: "#EF4444" },
]

const topDrivers = [
  { name: "Marcus Brown", deliveries: 45, scheduled: 8 },
  { name: "Keisha Williams", deliveries: 42, scheduled: 12 },
  { name: "Shanique Reid", deliveries: 38, scheduled: 6 },
  { name: "Devon Campbell", deliveries: 35, scheduled: 9 },
  { name: "Andre Thompson", deliveries: 31, scheduled: 5 },
]

const scheduledByTimeSlot = [
  { slot: "8-10 AM", count: 28 },
  { slot: "10-12 PM", count: 45 },
  { slot: "12-2 PM", count: 32 },
  { slot: "2-4 PM", count: 52 },
  { slot: "4-6 PM", count: 38 },
  { slot: "6-8 PM", count: 22 },
]

const upcomingScheduled = [
  { date: "Today", count: 24 },
  { date: "Tomorrow", count: 38 },
  { date: "In 2 days", count: 31 },
  { date: "In 3 days", count: 27 },
  { date: "In 4 days", count: 19 },
  { date: "In 5 days", count: 15 },
  { date: "In 6 days", count: 12 },
]

type TimeFilter = "today" | "week" | "month" | "year"
type ParishFilter = "all" | string

const parishes = ["All Parishes", "Kingston", "St. Andrew", "St. Catherine", "St. James", "Clarendon", "St. Elizabeth", "Manchester", "Westmoreland", "Hanover", "St. Ann", "Trelawny", "St. Mary", "Portland", "St. Thomas"]

export function AnalyticsTab() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("week")
  const [parishFilter, setParishFilter] = useState<ParishFilter>("all")
  const [showTimeDropdown, setShowTimeDropdown] = useState(false)
  const [showParishDropdown, setShowParishDropdown] = useState(false)
  
  const today = new Date().getDay()
  const dayIndex = today === 0 ? 6 : today - 1

  const timeFilterLabels: Record<TimeFilter, string> = {
    today: "Today",
    week: "This Week",
    month: "This Month",
    year: "This Year"
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span>Filters:</span>
        </div>
        
        {/* Time Filter */}
        <div className="relative">
          <button
            onClick={() => {
              setShowTimeDropdown(!showTimeDropdown)
              setShowParishDropdown(false)
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-lg text-sm text-foreground hover:bg-card/80 transition-colors"
          >
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{timeFilterLabels[timeFilter]}</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
          {showTimeDropdown && (
            <div className="absolute top-full left-0 mt-1 w-40 bg-card border border-border rounded-lg shadow-lg z-10">
              {(Object.keys(timeFilterLabels) as TimeFilter[]).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setTimeFilter(key)
                    setShowTimeDropdown(false)
                  }}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-white/5 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    timeFilter === key ? "text-primary bg-primary/10" : "text-foreground"
                  }`}
                >
                  {timeFilterLabels[key]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Parish Filter */}
        <div className="relative">
          <button
            onClick={() => {
              setShowParishDropdown(!showParishDropdown)
              setShowTimeDropdown(false)
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-lg text-sm text-foreground hover:bg-card/80 transition-colors"
          >
            <span>{parishFilter === "all" ? "All Parishes" : parishFilter}</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
          {showParishDropdown && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
              {parishes.map((parish) => (
                <button
                  key={parish}
                  onClick={() => {
                    setParishFilter(parish === "All Parishes" ? "all" : parish)
                    setShowParishDropdown(false)
                  }}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-white/5 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    (parish === "All Parishes" && parishFilter === "all") || parish === parishFilter
                      ? "text-primary bg-primary/10"
                      : "text-foreground"
                  }`}
                >
                  {parish}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Clear Filters */}
        {(timeFilter !== "week" || parishFilter !== "all") && (
          <button
            onClick={() => {
              setTimeFilter("week")
              setParishFilter("all")
            }}
            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
          title="Scheduled" 
          value={254} 
          trend={{ value: 18, isPositive: true }}
          icon={<Calendar className="w-5 h-5" />}
        />
        <StatCard 
          title="Failed Deliveries" 
          value={8} 
          trend={{ value: 3, isPositive: false }}
          icon={<XCircle className="w-5 h-5" />}
        />
      </div>

      {/* Scheduled Deliveries Section */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h3 className="text-sm font-medium text-foreground mb-4">Scheduled Deliveries Overview</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Schedule Line Chart */}
          <div className="lg:col-span-2">
            <p className="text-xs text-muted-foreground mb-3">Upcoming 7 Days</p>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={upcomingScheduled}>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: "#8B96B0", fontSize: 10 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: "#8B96B0", fontSize: 10 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#1E2535", 
                      border: "1px solid #2A3441",
                      borderRadius: "8px",
                      color: "#fff"
                    }}
                    labelStyle={{ color: "#8B96B0" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#00C27C" 
                    strokeWidth={2}
                    dot={{ fill: "#00C27C", strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: "#00C27C" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Scheduled Status Pie */}
          <div>
            <p className="text-xs text-muted-foreground mb-3">Schedule Status</p>
            <div className="flex items-center gap-4">
              <div className="relative h-[120px] w-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={scheduledStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={50}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {scheduledStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-foreground">254</p>
                    <p className="text-[8px] text-muted-foreground uppercase">Total</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {scheduledStatusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] text-muted-foreground">{item.name}</span>
                    <span className="text-[10px] text-foreground font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Slot Distribution */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h3 className="text-sm font-medium text-foreground mb-4">Scheduled Deliveries by Time Slot</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scheduledByTimeSlot} layout="vertical">
              <XAxis 
                type="number"
                axisLine={false} 
                tickLine={false}
                tick={{ fill: "#8B96B0", fontSize: 10 }}
              />
              <YAxis 
                type="category"
                dataKey="slot"
                axisLine={false} 
                tickLine={false}
                tick={{ fill: "#8B96B0", fontSize: 10 }}
                width={70}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1E2535", 
                  border: "1px solid #2A3441",
                  borderRadius: "8px",
                  color: "#fff"
                }}
                labelStyle={{ color: "#8B96B0" }}
              />
              <Bar dataKey="count" fill="#00C27C" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Deliveries */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h3 className="text-sm font-medium text-foreground mb-4">Weekly Deliveries vs Scheduled</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: "#8B96B0", fontSize: 10 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: "#8B96B0", fontSize: 10 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#1E2535", 
                    border: "1px solid #2A3441",
                    borderRadius: "8px",
                    color: "#fff"
                  }}
                  labelStyle={{ color: "#8B96B0" }}
                />
                <Bar dataKey="deliveries" name="Completed" radius={[4, 4, 0, 0]}>
                  {weeklyData.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === dayIndex ? "#00C27C" : "#1E2535"} 
                    />
                  ))}
                </Bar>
                <Bar dataKey="scheduled" name="Scheduled" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#1E2535]" />
              <span className="text-xs text-muted-foreground">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#3B82F6]" />
              <span className="text-xs text-muted-foreground">Scheduled</span>
            </div>
          </div>
        </div>

        {/* Deliveries by Parish */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h3 className="text-sm font-medium text-foreground mb-4">Deliveries by Parish</h3>
          <div className="space-y-3">
            {parishData.map((parish) => (
              <div key={parish.name} className="flex items-center gap-3">
                <span className="w-24 text-xs text-muted-foreground truncate">{parish.name}</span>
                <div className="flex-1 h-5 bg-secondary rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-primary transition-all"
                    style={{ width: `${(parish.deliveries / parishData[0].deliveries) * 100}%` }}
                  />
                  <div 
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${(parish.scheduled / parishData[0].deliveries) * 100}%` }}
                  />
                </div>
                <span className="w-16 text-xs text-foreground text-right">{parish.deliveries} / {parish.scheduled}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-primary" />
              <span className="text-xs text-muted-foreground">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-500" />
              <span className="text-xs text-muted-foreground">Scheduled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delivery Status */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h3 className="text-sm font-medium text-foreground mb-4">Delivery Status Breakdown</h3>
          <div className="flex items-center gap-6">
            <div className="relative h-[160px] w-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-foreground">1,148</p>
                  <p className="text-[10px] text-muted-foreground uppercase">Total</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                  <span className="text-xs text-foreground font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Drivers */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h3 className="text-sm font-medium text-foreground mb-4">Top Driver Performance</h3>
          <div className="space-y-3">
            {topDrivers.map((driver, index) => (
              <div key={driver.name} className="flex items-center gap-3">
                <span className="w-4 text-xs text-muted-foreground">{index + 1}</span>
                <span className="w-32 text-xs text-foreground truncate">{driver.name}</span>
                <div className="flex-1 h-5 bg-secondary rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${(driver.deliveries / topDrivers[0].deliveries) * 100}%` }}
                  />
                  <div 
                    className="h-full bg-primary transition-all"
                    style={{ width: `${(driver.scheduled / topDrivers[0].deliveries) * 100}%` }}
                  />
                </div>
                <span className="w-12 text-xs text-foreground text-right">{driver.deliveries} / {driver.scheduled}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-500" />
              <span className="text-xs text-muted-foreground">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-primary" />
              <span className="text-xs text-muted-foreground">Scheduled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
