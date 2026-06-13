"use client"

import { useState } from "react"
import { Search, Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TrackingStep {
  label: string
  location: string
  time: string
  done: boolean
  current?: boolean
}

interface TrackingResult {
  trackingNumber: string
  status: string
  estimate: string
  steps: TrackingStep[]
}

function buildMockResult(trackingNumber: string): TrackingResult {
  return {
    trackingNumber,
    status: "Out for Delivery",
    estimate: "Today, by 5:00 PM",
    steps: [
      { label: "Order Received", location: "Kingston Hub", time: "Mon 9:14 AM", done: true },
      { label: "Processed at Facility", location: "Kingston Hub", time: "Mon 2:40 PM", done: true },
      { label: "In Transit", location: "Spanish Town", time: "Tue 7:05 AM", done: true },
      { label: "Out for Delivery", location: "Portmore", time: "Tue 11:30 AM", done: false, current: true },
      { label: "Delivered", location: "Destination", time: "Pending", done: false },
    ],
  }
}

export function TrackShipment() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [result, setResult] = useState<TrackingResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackingNumber.trim()) return
    setIsLoading(true)
    setResult(null)
    setTimeout(() => {
      setResult(buildMockResult(trackingNumber.trim().toUpperCase()))
      setIsLoading(false)
    }, 700)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter your tracking number (e.g. PKG-001)"
            className="h-14 pl-12 bg-card border-border text-base"
            aria-label="Tracking number"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold"
        >
          <Search className="w-5 h-5 mr-2" />
          {isLoading ? "Tracking..." : "Track"}
        </Button>
      </form>

      {result && (
        <div className="mt-8 text-left bg-card border border-border rounded-2xl p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
            <div>
              <p className="text-sm text-muted-foreground">Tracking Number</p>
              <p className="text-lg font-semibold text-foreground font-mono">{result.trackingNumber}</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Truck className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{result.status}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 py-5 text-foreground">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm">
              Estimated delivery: <span className="font-semibold">{result.estimate}</span>
            </span>
          </div>

          <ol className="relative">
            {result.steps.map((step, i) => {
              const isLast = i === result.steps.length - 1
              return (
                <li key={step.label} className="flex gap-4 pb-6 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-full shrink-0 ${
                        step.done
                          ? "bg-primary text-primary-foreground"
                          : step.current
                            ? "bg-primary/15 text-primary border-2 border-primary"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.done ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : step.current ? (
                        <Truck className="w-4 h-4" />
                      ) : (
                        <MapPin className="w-4 h-4" />
                      )}
                    </div>
                    {!isLast && (
                      <div className={`w-0.5 flex-1 mt-1 ${step.done ? "bg-primary" : "bg-border"}`} />
                    )}
                  </div>
                  <div className="pt-1">
                    <p className={`text-sm font-medium ${step.current ? "text-primary" : "text-foreground"}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {step.location} · {step.time}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      )}
    </div>
  )
}
