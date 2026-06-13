"use client"

import { useState } from "react"
import { StatCard } from "@/components/dashboard/stat-card"
import { StatusPill } from "@/components/dashboard/status-pill"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Clock, Package, CheckCircle, XCircle, Plus, MapPin, Phone, User, Calendar, Truck, Scale, X, Edit, UserCheck } from "lucide-react"

interface Delivery {
  id: string
  customer: string
  phone: string
  address: string
  parish: string
  status: "pending" | "in-transit" | "delivered" | "failed"
  cod: number
  packageNumber: string
  weight: number
  scheduledDate: string
  scheduledTime: string
  driver: string | null
  notes: string
  createdAt: string
}

const drivers = [
  { id: "D001", name: "Omar Williams", vehicle: "Honda CRV", available: true },
  { id: "D002", name: "Damian Clarke", vehicle: "Toyota Hiace", available: true },
  { id: "D003", name: "Andre Mitchell", vehicle: "Suzuki Swift", available: false },
  { id: "D004", name: "Marcus Thompson", vehicle: "Nissan NV200", available: true },
  { id: "D005", name: "Kevin Brown", vehicle: "Honda Fit", available: true },
]

const parishes = [
  "Kingston", "St. Andrew", "St. Thomas", "Portland", "St. Mary",
  "St. Ann", "Trelawny", "St. James", "Hanover", "Westmoreland",
  "St. Elizabeth", "Manchester", "Clarendon", "St. Catherine"
]

const initialDeliveries: Delivery[] = [
  { id: "DEL-001", customer: "John Smith", phone: "876-555-0123", address: "12 Hope Road", parish: "Kingston", status: "in-transit", cod: 2500, packageNumber: "PKG-001", weight: 5.2, scheduledDate: "2024-12-15", scheduledTime: "10:00", driver: "Omar Williams", notes: "", createdAt: "2024-12-14" },
  { id: "DEL-002", customer: "Sarah Johnson", phone: "876-555-0456", address: "45 Waterloo Rd", parish: "St. Andrew", status: "pending", cod: 1800, packageNumber: "PKG-002", weight: 3.8, scheduledDate: "2024-12-15", scheduledTime: "14:00", driver: null, notes: "Call before delivery", createdAt: "2024-12-14" },
  { id: "DEL-003", customer: "Michael Brown", phone: "876-555-0789", address: "78 Main St", parish: "St. James", status: "delivered", cod: 3200, packageNumber: "PKG-003", weight: 12.5, scheduledDate: "2024-12-14", scheduledTime: "09:00", driver: "Damian Clarke", notes: "", createdAt: "2024-12-13" },
  { id: "DEL-004", customer: "Lisa Williams", phone: "876-555-0321", address: "23 Church St", parish: "Manchester", status: "failed", cod: 950, packageNumber: "PKG-004", weight: 2.1, scheduledDate: "2024-12-14", scheduledTime: "16:00", driver: "Andre Mitchell", notes: "Customer not available", createdAt: "2024-12-13" },
  { id: "DEL-005", customer: "David Thompson", phone: "876-555-0654", address: "56 Orange St", parish: "Kingston", status: "in-transit", cod: 4100, packageNumber: "PKG-005", weight: 8.7, scheduledDate: "2024-12-15", scheduledTime: "11:30", driver: "Marcus Thompson", notes: "", createdAt: "2024-12-14" },
  { id: "DEL-006", customer: "Amanda Clarke", phone: "876-555-0987", address: "89 Duke St", parish: "Portland", status: "delivered", cod: 2750, packageNumber: "PKG-006", weight: 4.3, scheduledDate: "2024-12-14", scheduledTime: "13:00", driver: "Kevin Brown", notes: "", createdAt: "2024-12-13" },
  { id: "DEL-007", customer: "Kevin Martin", phone: "876-555-1234", address: "34 King St", parish: "St. Catherine", status: "pending", cod: 1650, packageNumber: "PKG-007", weight: 6.8, scheduledDate: "2024-12-16", scheduledTime: "10:30", driver: null, notes: "Fragile items", createdAt: "2024-12-14" },
  { id: "DEL-008", customer: "Michelle Davis", phone: "876-555-5678", address: "67 Queen St", parish: "St. Ann", status: "in-transit", cod: 3800, packageNumber: "PKG-008", weight: 9.2, scheduledDate: "2024-12-15", scheduledTime: "15:00", driver: "Omar Williams", notes: "", createdAt: "2024-12-14" },
]

const statusColors: Record<string, string> = {
  "in-transit": "text-primary",
  "pending": "text-amber-500",
  "delivered": "text-green-500",
  "failed": "text-destructive",
}

export function DeliveriesTab() {
  const [deliveries, setDeliveries] = useState<Delivery[]>(initialDeliveries)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null)
  const [formData, setFormData] = useState({
    customer: "",
    phone: "",
    address: "",
    parish: "",
    packageNumber: "",
    weight: "",
    cod: "",
    scheduledDate: "",
    scheduledTime: "",
    driver: "",
    notes: "",
  })

  const filteredDeliveries = deliveries.filter(delivery =>
    delivery.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    delivery.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    delivery.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    pending: deliveries.filter(d => d.status === "pending").length,
    inTransit: deliveries.filter(d => d.status === "in-transit").length,
    delivered: deliveries.filter(d => d.status === "delivered").length,
    failed: deliveries.filter(d => d.status === "failed").length,
  }

  const resetForm = () => {
    setFormData({
      customer: "",
      phone: "",
      address: "",
      parish: "",
      packageNumber: "",
      weight: "",
      cod: "",
      scheduledDate: "",
      scheduledTime: "",
      driver: "",
      notes: "",
    })
  }

  const handleAddDelivery = () => {
    const newDelivery: Delivery = {
      id: `DEL-${String(deliveries.length + 1).padStart(3, '0')}`,
      customer: formData.customer,
      phone: formData.phone,
      address: formData.address,
      parish: formData.parish,
      status: "pending",
      cod: parseFloat(formData.cod) || 0,
      packageNumber: formData.packageNumber || `PKG-${String(deliveries.length + 1).padStart(3, '0')}`,
      weight: parseFloat(formData.weight) || 0,
      scheduledDate: formData.scheduledDate,
      scheduledTime: formData.scheduledTime,
      driver: formData.driver || null,
      notes: formData.notes,
      createdAt: new Date().toISOString().split('T')[0],
    }
    setDeliveries([newDelivery, ...deliveries])
    resetForm()
    setIsAddDialogOpen(false)
  }

  const handleAssignDriver = (driverName: string) => {
    if (!selectedDelivery) return
    setDeliveries(deliveries.map(d =>
      d.id === selectedDelivery.id
        ? { ...d, driver: driverName, status: d.status === "pending" ? "in-transit" : d.status }
        : d
    ))
    setIsAssignDialogOpen(false)
    setSelectedDelivery(null)
  }

  const openDetailDialog = (delivery: Delivery) => {
    setSelectedDelivery(delivery)
    setIsDetailDialogOpen(true)
  }

  const openAssignDialog = (delivery: Delivery) => {
    setSelectedDelivery(delivery)
    setIsAssignDialogOpen(true)
  }

  const updateDeliveryStatus = (status: Delivery["status"]) => {
    if (!selectedDelivery) return
    setDeliveries(deliveries.map(d =>
      d.id === selectedDelivery.id ? { ...d, status } : d
    ))
    setSelectedDelivery({ ...selectedDelivery, status })
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Pending" 
          value={stats.pending} 
          trend={{ value: 5, isPositive: false }}
          icon={<Clock className="w-5 h-5" />}
        />
        <StatCard 
          title="In Transit" 
          value={stats.inTransit} 
          trend={{ value: 12, isPositive: true }}
          icon={<Package className="w-5 h-5" />}
        />
        <StatCard 
          title="Delivered" 
          value={stats.delivered} 
          trend={{ value: 8, isPositive: true }}
          icon={<CheckCircle className="w-5 h-5" />}
        />
        <StatCard 
          title="Failed" 
          value={stats.failed} 
          trend={{ value: 3, isPositive: false }}
          icon={<XCircle className="w-5 h-5" />}
        />
      </div>

      {/* Deliveries Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-medium text-foreground">{"Today's Deliveries"}</h2>
            <p className="text-xs text-muted-foreground mt-1">All delivery orders for today</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search deliveries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Delivery
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Delivery</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Schedule a new delivery. Fields marked with * are required.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customer">Customer Name *</Label>
                      <Input
                        id="customer"
                        placeholder="Enter customer name"
                        value={formData.customer}
                        onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                        className="bg-[#1E2535] border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="876-555-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-[#1E2535] border-border"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address *</Label>
                    <Input
                      id="address"
                      placeholder="Street address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="bg-[#1E2535] border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parish">Parish *</Label>
                    <Select value={formData.parish} onValueChange={(value) => setFormData({ ...formData, parish: value })}>
                      <SelectTrigger className="bg-[#1E2535] border-border">
                        <SelectValue placeholder="Select parish" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {parishes.map((parish) => (
                          <SelectItem key={parish} value={parish}>
                            {parish}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="packageNumber">Package # *</Label>
                      <Input
                        id="packageNumber"
                        placeholder="PKG-001"
                        value={formData.packageNumber}
                        onChange={(e) => setFormData({ ...formData, packageNumber: e.target.value })}
                        className="bg-[#1E2535] border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg) *</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        placeholder="0.0"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        className="bg-[#1E2535] border-border"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cod">COD Amount ($)</Label>
                    <Input
                      id="cod"
                      type="number"
                      placeholder="0.00"
                      value={formData.cod}
                      onChange={(e) => setFormData({ ...formData, cod: e.target.value })}
                      className="bg-[#1E2535] border-border"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="scheduledDate">Scheduled Date *</Label>
                      <Input
                        id="scheduledDate"
                        type="date"
                        value={formData.scheduledDate}
                        onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                        className="bg-[#1E2535] border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scheduledTime">Scheduled Time *</Label>
                      <Input
                        id="scheduledTime"
                        type="time"
                        value={formData.scheduledTime}
                        onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                        className="bg-[#1E2535] border-border"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driver">Assign Driver (Optional)</Label>
                    <Select value={formData.driver} onValueChange={(value) => setFormData({ ...formData, driver: value })}>
                      <SelectTrigger className="bg-[#1E2535] border-border">
                        <SelectValue placeholder="Select driver" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {drivers.filter(d => d.available).map((driver) => (
                          <SelectItem key={driver.id} value={driver.name}>
                            {driver.name} - {driver.vehicle}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Delivery instructions, special requests..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="bg-[#1E2535] border-border min-h-[80px]"
                    />
                  </div>
                  <div className="flex justify-end gap-3 mt-4">
                    <Button variant="outline" onClick={() => { resetForm(); setIsAddDialogOpen(false); }}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddDelivery}
                      disabled={!formData.customer || !formData.phone || !formData.address || !formData.parish || !formData.weight || !formData.scheduledDate || !formData.scheduledTime}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Schedule Delivery
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Address</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Scheduled</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Driver</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">COD</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeliveries.map((delivery) => (
                <tr 
                  key={delivery.id} 
                  className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors cursor-pointer"
                  onClick={() => openDetailDialog(delivery)}
                >
                  <td className={`px-4 py-3 text-sm font-medium ${statusColors[delivery.status]}`}>
                    {delivery.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{delivery.customer}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{delivery.address}, {delivery.parish}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {delivery.scheduledDate} at {delivery.scheduledTime}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {delivery.driver ? (
                      <span className="text-foreground">{delivery.driver}</span>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7"
                        onClick={(e) => { e.stopPropagation(); openAssignDialog(delivery); }}
                      >
                        <UserCheck className="w-3 h-3 mr-1" />
                        Assign
                      </Button>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill status={delivery.status} />
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground font-medium">
                    ${delivery.cod.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs h-7"
                      onClick={(e) => { e.stopPropagation(); openDetailDialog(delivery); }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delivery Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Delivery Details
              </DialogTitle>
            </div>
            <DialogDescription className="text-muted-foreground">
              {selectedDelivery?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedDelivery && (
            <div className="space-y-6 py-4">
              {/* Status */}
              <div className="flex items-center justify-between">
                <StatusPill status={selectedDelivery.status} />
                <Select
                  value={selectedDelivery.status}
                  onValueChange={(value) => updateDeliveryStatus(value as Delivery["status"])}
                >
                  <SelectTrigger className="w-[140px] h-8 text-xs bg-[#1E2535] border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Customer Info */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Customer Information</h4>
                <div className="grid gap-2">
                  <div className="flex items-center gap-3 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{selectedDelivery.customer}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{selectedDelivery.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{selectedDelivery.address}, {selectedDelivery.parish}</span>
                  </div>
                </div>
              </div>

              {/* Package Info */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Package Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1E2535] rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Package className="w-3.5 h-3.5" />
                      Package #
                    </div>
                    <p className="text-sm font-medium text-foreground">{selectedDelivery.packageNumber}</p>
                  </div>
                  <div className="bg-[#1E2535] rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Scale className="w-3.5 h-3.5" />
                      Weight
                    </div>
                    <p className="text-sm font-medium text-foreground">{selectedDelivery.weight} kg</p>
                  </div>
                </div>
              </div>

              {/* Schedule Info */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Schedule</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1E2535] rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Date
                    </div>
                    <p className="text-sm font-medium text-foreground">{selectedDelivery.scheduledDate}</p>
                  </div>
                  <div className="bg-[#1E2535] rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Clock className="w-3.5 h-3.5" />
                      Time
                    </div>
                    <p className="text-sm font-medium text-foreground">{selectedDelivery.scheduledTime}</p>
                  </div>
                </div>
              </div>

              {/* Driver Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground">Assigned Driver</h4>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-7"
                    onClick={() => { setIsDetailDialogOpen(false); openAssignDialog(selectedDelivery); }}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    {selectedDelivery.driver ? "Change" : "Assign"}
                  </Button>
                </div>
                {selectedDelivery.driver ? (
                  <div className="flex items-center gap-3 bg-[#1E2535] rounded-lg p-3">
                    <Truck className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">{selectedDelivery.driver}</span>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No driver assigned</p>
                )}
              </div>

              {/* COD */}
              <div className="flex items-center justify-between bg-primary/10 rounded-lg p-4">
                <span className="text-sm text-muted-foreground">COD Amount</span>
                <span className="text-lg font-semibold text-primary">${selectedDelivery.cod.toLocaleString()}</span>
              </div>

              {/* Notes */}
              {selectedDelivery.notes && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Notes</h4>
                  <p className="text-sm text-muted-foreground bg-[#1E2535] rounded-lg p-3">{selectedDelivery.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Assign Driver Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Driver</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Select a driver for delivery {selectedDelivery?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {drivers.map((driver) => (
              <button
                key={driver.id}
                disabled={!driver.available}
                onClick={() => handleAssignDriver(driver.name)}
                className={`w-full flex items-center justify-between p-4 rounded-lg border transition-colors ${
                  driver.available 
                    ? "bg-[#1E2535] border-border hover:border-primary cursor-pointer" 
                    : "bg-[#1E2535]/50 border-border/50 cursor-not-allowed opacity-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${driver.available ? "bg-primary/10" : "bg-gray-500/10"}`}>
                    <User className={`w-5 h-5 ${driver.available ? "text-primary" : "text-gray-500"}`} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">{driver.name}</p>
                    <p className="text-xs text-muted-foreground">{driver.vehicle}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  driver.available 
                    ? "bg-green-500/10 text-green-500" 
                    : "bg-gray-500/10 text-gray-500"
                }`}>
                  {driver.available ? "Available" : "Busy"}
                </span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
