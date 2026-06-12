"use client"

import { useState } from "react"
import { StatCard } from "@/components/dashboard/stat-card"
import { StatusPill } from "@/components/dashboard/status-pill"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Wifi, DollarSign, Star, Plus, X, Phone, Mail, MapPin, Car, MoreHorizontal, Eye, Edit2, Trash2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Driver {
  id: number
  name: string
  email: string
  phone: string
  address: string
  parish: string
  licenseNumber: string
  vehicleType: string
  vehiclePlate: string
  status: "active" | "idle" | "offline"
  todayJobs: number
  maxJobs: number
  rating: number
  codHeld: number
  emergencyContact: string
  emergencyPhone: string
  notes: string
}

const initialDrivers: Driver[] = [
  { id: 1, name: "Marcus Brown", email: "marcus@afg.com", phone: "876-555-0101", address: "12 Hope Road", parish: "Kingston", licenseNumber: "JM-2024-001234", vehicleType: "Motorcycle", vehiclePlate: "MC 1234", status: "active", todayJobs: 8, maxJobs: 12, rating: 4.9, codHeld: 15200, emergencyContact: "Sarah Brown", emergencyPhone: "876-555-0102", notes: "Experienced rider, reliable" },
  { id: 2, name: "Keisha Williams", email: "keisha@afg.com", phone: "876-555-0103", address: "45 Red Hills Road", parish: "St. Andrew", licenseNumber: "JM-2023-005678", vehicleType: "Car", vehiclePlate: "CD 5678", status: "active", todayJobs: 6, maxJobs: 10, rating: 4.8, codHeld: 8900, emergencyContact: "John Williams", emergencyPhone: "876-555-0104", notes: "" },
  { id: 3, name: "Devon Campbell", email: "devon@afg.com", phone: "876-555-0105", address: "78 Spanish Town Road", parish: "St. Catherine", licenseNumber: "JM-2022-009012", vehicleType: "Van", vehiclePlate: "VN 9012", status: "idle", todayJobs: 4, maxJobs: 10, rating: 4.7, codHeld: 5400, emergencyContact: "Marie Campbell", emergencyPhone: "876-555-0106", notes: "Can handle large deliveries" },
  { id: 4, name: "Shanique Reid", email: "shanique@afg.com", phone: "876-555-0107", address: "23 Constant Spring Road", parish: "St. Andrew", licenseNumber: "JM-2024-003456", vehicleType: "Motorcycle", vehiclePlate: "MC 3456", status: "active", todayJobs: 7, maxJobs: 10, rating: 4.9, codHeld: 12300, emergencyContact: "Paul Reid", emergencyPhone: "876-555-0108", notes: "Top performer" },
  { id: 5, name: "Andre Thompson", email: "andre@afg.com", phone: "876-555-0109", address: "56 Barbican Road", parish: "St. Andrew", licenseNumber: "JM-2023-007890", vehicleType: "Car", vehiclePlate: "CD 7890", status: "offline", todayJobs: 0, maxJobs: 10, rating: 4.5, codHeld: 0, emergencyContact: "Lisa Thompson", emergencyPhone: "876-555-0110", notes: "On leave until next week" },
  { id: 6, name: "Crystal Morgan", email: "crystal@afg.com", phone: "876-555-0111", address: "89 Molynes Road", parish: "Kingston", licenseNumber: "JM-2024-002345", vehicleType: "Motorcycle", vehiclePlate: "MC 2345", status: "active", todayJobs: 5, maxJobs: 8, rating: 4.6, codHeld: 7800, emergencyContact: "David Morgan", emergencyPhone: "876-555-0112", notes: "" },
  { id: 7, name: "Damian Clarke", email: "damian@afg.com", phone: "876-555-0113", address: "34 Portmore Pines", parish: "St. Catherine", licenseNumber: "JM-2022-006789", vehicleType: "Van", vehiclePlate: "VN 6789", status: "active", todayJobs: 9, maxJobs: 12, rating: 4.8, codHeld: 18500, emergencyContact: "Angela Clarke", emergencyPhone: "876-555-0114", notes: "Fleet lead for Portmore area" },
  { id: 8, name: "Natasha Gordon", email: "natasha@afg.com", phone: "876-555-0115", address: "67 Half Way Tree Road", parish: "St. Andrew", licenseNumber: "JM-2023-001234", vehicleType: "Car", vehiclePlate: "CD 1234", status: "idle", todayJobs: 3, maxJobs: 8, rating: 4.7, codHeld: 3200, emergencyContact: "Michael Gordon", emergencyPhone: "876-555-0116", notes: "" },
]

const parishes = [
  "Kingston", "St. Andrew", "St. Thomas", "Portland", "St. Mary",
  "St. Ann", "Trelawny", "St. James", "Hanover", "Westmoreland",
  "St. Elizabeth", "Manchester", "Clarendon", "St. Catherine"
]

const vehicleTypes = ["Motorcycle", "Car", "Van", "Truck"]

export function DriversTab() {
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    parish: "",
    licenseNumber: "",
    vehicleType: "",
    vehiclePlate: "",
    maxJobs: "10",
    emergencyContact: "",
    emergencyPhone: "",
    notes: ""
  })

  const activeDrivers = drivers.filter(d => d.status === "active").length
  const onlineDrivers = drivers.filter(d => d.status !== "offline").length
  const totalCOD = drivers.reduce((sum, d) => sum + d.codHeld, 0)
  const avgRating = (drivers.reduce((sum, d) => sum + d.rating, 0) / drivers.length).toFixed(1)

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          driver.phone.includes(searchQuery) ||
                          driver.parish.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || driver.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      parish: "",
      licenseNumber: "",
      vehicleType: "",
      vehiclePlate: "",
      maxJobs: "10",
      emergencyContact: "",
      emergencyPhone: "",
      notes: ""
    })
    setIsEditing(false)
    setSelectedDriver(null)
  }

  const handleAddDriver = () => {
    if (!formData.name || !formData.phone || !formData.licenseNumber) return

    const newDriver: Driver = {
      id: Math.max(...drivers.map(d => d.id)) + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      parish: formData.parish,
      licenseNumber: formData.licenseNumber,
      vehicleType: formData.vehicleType,
      vehiclePlate: formData.vehiclePlate,
      status: "offline",
      todayJobs: 0,
      maxJobs: parseInt(formData.maxJobs) || 10,
      rating: 5.0,
      codHeld: 0,
      emergencyContact: formData.emergencyContact,
      emergencyPhone: formData.emergencyPhone,
      notes: formData.notes
    }

    setDrivers([...drivers, newDriver])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditDriver = () => {
    if (!selectedDriver || !formData.name || !formData.phone) return

    setDrivers(drivers.map(d => 
      d.id === selectedDriver.id 
        ? {
            ...d,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            parish: formData.parish,
            licenseNumber: formData.licenseNumber,
            vehicleType: formData.vehicleType,
            vehiclePlate: formData.vehiclePlate,
            maxJobs: parseInt(formData.maxJobs) || 10,
            emergencyContact: formData.emergencyContact,
            emergencyPhone: formData.emergencyPhone,
            notes: formData.notes
          }
        : d
    ))
    setShowAddModal(false)
    resetForm()
  }

  const handleDeleteDriver = (driverId: number) => {
    setDrivers(drivers.filter(d => d.id !== driverId))
  }

  const openEditModal = (driver: Driver) => {
    setSelectedDriver(driver)
    setFormData({
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      address: driver.address,
      parish: driver.parish,
      licenseNumber: driver.licenseNumber,
      vehicleType: driver.vehicleType,
      vehiclePlate: driver.vehiclePlate,
      maxJobs: driver.maxJobs.toString(),
      emergencyContact: driver.emergencyContact,
      emergencyPhone: driver.emergencyPhone,
      notes: driver.notes
    })
    setIsEditing(true)
    setShowAddModal(true)
  }

  const openViewModal = (driver: Driver) => {
    setSelectedDriver(driver)
    setShowViewModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Drivers" 
          value={drivers.length} 
          trend={{ value: 2, isPositive: true }}
          icon={<Users className="w-5 h-5" />}
        />
        <StatCard 
          title="Online Now" 
          value={onlineDrivers} 
          trend={{ value: 15, isPositive: true }}
          icon={<Wifi className="w-5 h-5" />}
        />
        <StatCard 
          title="COD to Collect" 
          value={`$${(totalCOD / 1000).toFixed(1)}K`} 
          trend={{ value: 8, isPositive: true }}
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StatCard 
          title="Average Rating" 
          value={avgRating} 
          trend={{ value: 0.2, isPositive: true }}
          icon={<Star className="w-5 h-5" />}
        />
      </div>

      {/* Driver Roster */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-medium text-foreground">Driver Roster</h2>
              <p className="text-xs text-muted-foreground mt-1">Manage your delivery team</p>
            </div>
            <button 
              onClick={() => { resetForm(); setShowAddModal(true); }}
              className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Driver
            </button>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <input
              type="text"
              placeholder="Search by name, phone, or parish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40 bg-input border-border">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="idle">Idle</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Driver</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Vehicle</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{"Today's Jobs"}</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Rating</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">COD Held</th>
                <th className="px-4 py-3 text-right text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((driver) => (
                <tr 
                  key={driver.id} 
                  className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors cursor-pointer"
                  onClick={() => openViewModal(driver)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {driver.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="text-sm text-foreground block">{driver.name}</span>
                        <span className="text-xs text-muted-foreground">{driver.parish}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-muted-foreground">{driver.phone}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{driver.vehicleType}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill status={driver.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={(driver.todayJobs / driver.maxJobs) * 100} 
                        className="w-16 h-2"
                      />
                      <span className="text-xs text-muted-foreground">
                        {driver.todayJobs}/{driver.maxJobs}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="text-sm text-foreground">{driver.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground font-medium">
                    ${driver.codHeld.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 hover:bg-white/10 rounded transition-colors">
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={() => openViewModal(driver)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditModal(driver)}>
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteDriver(driver.id)}
                          className="text-red-500 focus:text-red-500"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredDrivers.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No drivers found matching your search.
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Driver Modal */}
      <Dialog open={showAddModal} onOpenChange={(open) => { setShowAddModal(open); if (!open) resetForm(); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Driver" : "Add New Driver"}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Personal Information */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter driver's full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="driver@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="876-555-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parish">Parish *</Label>
                  <Select value={formData.parish} onValueChange={(value) => setFormData({ ...formData, parish: value })}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select parish" />
                    </SelectTrigger>
                    <SelectContent>
                      {parishes.map((parish) => (
                        <SelectItem key={parish} value={parish}>{parish}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Home Address</Label>
                  <input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Street address"
                  />
                </div>
              </div>
            </div>

            {/* Vehicle & License Information */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <Car className="w-4 h-4 text-primary" />
                Vehicle & License Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">Driver License Number *</Label>
                  <input
                    id="licenseNumber"
                    type="text"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="JM-2024-000000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Vehicle Type *</Label>
                  <Select value={formData.vehicleType} onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehiclePlate">Vehicle Plate Number</Label>
                  <input
                    id="vehiclePlate"
                    type="text"
                    value={formData.vehiclePlate}
                    onChange={(e) => setFormData({ ...formData, vehiclePlate: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="MC 1234"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxJobs">Max Daily Jobs</Label>
                  <input
                    id="maxJobs"
                    type="number"
                    min="1"
                    max="50"
                    value={formData.maxJobs}
                    onChange={(e) => setFormData({ ...formData, maxJobs: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Emergency Contact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Contact Name</Label>
                  <input
                    id="emergencyContact"
                    type="text"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Emergency contact name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Contact Phone</Label>
                  <input
                    id="emergencyPhone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="876-555-0000"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="bg-input border-border min-h-[80px]"
                placeholder="Any additional information about this driver..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <button
                onClick={() => { setShowAddModal(false); resetForm(); }}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={isEditing ? handleEditDriver : handleAddDriver}
                disabled={!formData.name || !formData.phone || !formData.licenseNumber}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEditing ? "Save Changes" : "Add Driver"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Driver Details Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Driver Details</DialogTitle>
          </DialogHeader>
          
          {selectedDriver && (
            <div className="space-y-6 py-4">
              {/* Header */}
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {selectedDriver.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{selectedDriver.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedDriver.parish}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <StatusPill status={selectedDriver.status} />
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm text-foreground">{selectedDriver.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-card-hover rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-foreground">{selectedDriver.todayJobs}</p>
                  <p className="text-xs text-muted-foreground">{"Today's Jobs"}</p>
                </div>
                <div className="bg-card-hover rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-foreground">{selectedDriver.maxJobs}</p>
                  <p className="text-xs text-muted-foreground">Max Daily</p>
                </div>
                <div className="bg-card-hover rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-primary">${selectedDriver.codHeld.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">COD Held</p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Contact Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{selectedDriver.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{selectedDriver.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm sm:col-span-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{selectedDriver.address}, {selectedDriver.parish}</span>
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Vehicle Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-card-hover rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Vehicle Type</p>
                    <p className="text-sm font-medium text-foreground">{selectedDriver.vehicleType}</p>
                  </div>
                  <div className="bg-card-hover rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Plate Number</p>
                    <p className="text-sm font-medium text-foreground">{selectedDriver.vehiclePlate}</p>
                  </div>
                  <div className="bg-card-hover rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">License</p>
                    <p className="text-sm font-medium text-foreground">{selectedDriver.licenseNumber}</p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              {selectedDriver.emergencyContact && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Emergency Contact</h4>
                  <div className="bg-card-hover rounded-lg p-3">
                    <p className="text-sm font-medium text-foreground">{selectedDriver.emergencyContact}</p>
                    <p className="text-sm text-muted-foreground">{selectedDriver.emergencyPhone}</p>
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedDriver.notes && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Notes</h4>
                  <p className="text-sm text-muted-foreground bg-card-hover rounded-lg p-3">{selectedDriver.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => { setShowViewModal(false); openEditModal(selectedDriver); }}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Edit Driver
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
