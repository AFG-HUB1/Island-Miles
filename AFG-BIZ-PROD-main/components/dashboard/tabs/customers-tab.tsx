"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreVertical, Edit, Trash2, Package, Scale } from "lucide-react"

interface Customer {
  id: number
  name: string
  phone: string
  email: string
  address: string
  location: string
  packageNumber: string
  weight: number
  deliveries: number
  codBalance: number
  notes: string
}

const initialCustomers: Customer[] = [
  { id: 1, name: "John Smith", phone: "876-555-0123", email: "john@email.com", address: "12 Hope Road", location: "Kingston", packageNumber: "PKG-001", weight: 5.2, deliveries: 45, codBalance: 2500, notes: "" },
  { id: 2, name: "Sarah Johnson", phone: "876-555-0456", email: "sarah@email.com", address: "45 Main Street", location: "St. Andrew", packageNumber: "PKG-002", weight: 3.8, deliveries: 32, codBalance: -1200, notes: "Prefers morning delivery" },
  { id: 3, name: "Michael Brown", phone: "876-555-0789", email: "michael@email.com", address: "78 Beach Blvd", location: "Montego Bay", packageNumber: "PKG-003", weight: 12.5, deliveries: 67, codBalance: 4800, notes: "" },
  { id: 4, name: "Lisa Williams", phone: "876-555-0321", email: "lisa@email.com", address: "23 Hilltop Drive", location: "Mandeville", packageNumber: "PKG-004", weight: 2.1, deliveries: 23, codBalance: 850, notes: "Gate code: 4521" },
  { id: 5, name: "David Thompson", phone: "876-555-0654", email: "david@email.com", address: "56 Central Ave", location: "Spanish Town", packageNumber: "PKG-005", weight: 8.7, deliveries: 89, codBalance: -350, notes: "" },
]

const parishes = [
  "Kingston", "St. Andrew", "St. Thomas", "Portland", "St. Mary",
  "St. Ann", "Trelawny", "St. James", "Hanover", "Westmoreland",
  "St. Elizabeth", "Manchester", "Clarendon", "St. Catherine"
]

export function CustomersTab() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    location: "",
    packageNumber: "",
    weight: "",
    notes: "",
  })

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  )

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      location: "",
      packageNumber: "",
      weight: "",
      notes: "",
    })
  }

  const handleAddCustomer = () => {
    const newCustomer: Customer = {
      id: Math.max(...customers.map(c => c.id)) + 1,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      location: formData.location,
      packageNumber: formData.packageNumber || `PKG-${String(customers.length + 1).padStart(3, '0')}`,
      weight: parseFloat(formData.weight) || 0,
      deliveries: 0,
      codBalance: 0,
      notes: formData.notes,
    }
    setCustomers([newCustomer, ...customers])
    resetForm()
    setIsAddDialogOpen(false)
  }

  const handleEditCustomer = () => {
    if (!selectedCustomer) return
    setCustomers(customers.map(c => 
      c.id === selectedCustomer.id 
        ? {
            ...c,
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            location: formData.location,
            packageNumber: formData.packageNumber,
            weight: parseFloat(formData.weight) || 0,
            notes: formData.notes,
          }
        : c
    ))
    resetForm()
    setIsEditDialogOpen(false)
    setSelectedCustomer(null)
  }

  const handleDeleteCustomer = (id: number) => {
    setCustomers(customers.filter(c => c.id !== id))
  }

  const openEditDialog = (customer: Customer) => {
    setSelectedCustomer(customer)
    setFormData({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      location: customer.location,
      packageNumber: customer.packageNumber,
      weight: String(customer.weight),
      notes: customer.notes,
    })
    setIsEditDialogOpen(true)
  }

  const CustomerForm = ({ onSubmit, submitLabel }: { onSubmit: () => void, submitLabel: string }) => (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="Enter customer name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="customer@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-[#1E2535] border-border"
        />
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
        <Label htmlFor="location">Parish *</Label>
        <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
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
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Delivery instructions, gate codes, special requests..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="bg-[#1E2535] border-border min-h-[80px]"
        />
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <Button
          variant="outline"
          onClick={() => {
            resetForm()
            setIsAddDialogOpen(false)
            setIsEditDialogOpen(false)
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!formData.name || !formData.phone || !formData.address || !formData.location || !formData.weight}
          className="bg-primary hover:bg-primary/90"
        >
          {submitLabel}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Customers</h2>
          <p className="text-sm text-muted-foreground">{customers.length} total customers</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Enter customer details below. Fields marked with * are required.
              </DialogDescription>
            </DialogHeader>
            <CustomerForm onSubmit={handleAddCustomer} submitLabel="Add Customer" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search customers by name, location, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Customer Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-medium text-foreground">Customer Directory</h2>
          <p className="text-xs text-muted-foreground mt-1">{filteredCustomers.length} customers found</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Package</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">COD Balance</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-blue-500/10 text-blue-500 text-xs">
                          {customer.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="text-sm text-foreground block">{customer.name}</span>
                        <span className="text-xs text-muted-foreground">{customer.address}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-foreground">{customer.phone}</div>
                    <div className="text-xs text-muted-foreground">{customer.email}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{customer.location}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Package className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm text-foreground">{customer.packageNumber}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Scale className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{customer.weight} kg</span>
                    </div>
                  </td>
                  <td className={`px-4 py-3 text-sm font-medium ${customer.codBalance >= 0 ? "text-primary" : "text-destructive"}`}>
                    {customer.codBalance >= 0 ? "+" : ""}${customer.codBalance.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem onClick={() => openEditDialog(customer)} className="cursor-pointer">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteCustomer(customer.id)} className="cursor-pointer text-destructive">
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
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Update customer details below.
            </DialogDescription>
          </DialogHeader>
          <CustomerForm onSubmit={handleEditCustomer} submitLabel="Save Changes" />
        </DialogContent>
      </Dialog>
    </div>
  )
}
