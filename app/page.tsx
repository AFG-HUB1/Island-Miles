"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Package, Truck, MapPin, Clock, ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TrackShipment } from "@/components/landing/track-shipment"

export default function LandingPage() {
  const router = useRouter()
  const { loginWithDemo } = useAuth()

  const handleSeeDemo = () => {
    loginWithDemo()
    router.push("/dashboard")
  }

  const features = [
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description: "Follow your package every step of the way with live location updates.",
    },
    {
      icon: Truck,
      title: "Island-Wide Coverage",
      description: "Fast, reliable last-mile delivery across Jamaica and the Caribbean.",
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description: "Accurate delivery estimates so you always know when to expect your order.",
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top navigation - above the hero */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Island Miles</span>
          </Link>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleSeeDemo}
              className="border-border bg-transparent hover:bg-card"
            >
              <Play className="w-4 h-4 mr-2" />
              See Demo
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero with tracking */}
      <section className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-delivery.png"
            alt=""
            fill
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/90 to-background" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Truck className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Last-mile delivery, done right</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
            Track your delivery <span className="text-primary">in real time</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
            Enter your tracking number below to see exactly where your package is across Jamaica and the Caribbean.
          </p>

          <div className="mt-10">
            <TrackShipment />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-card/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="bg-card border border-border rounded-2xl p-6">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-balance">
            Run your own delivery operation?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-md">
            Manage your fleet, optimize routes, and keep customers updated with the Island Miles dashboard.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={handleSeeDemo}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              See Demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button asChild variant="outline" className="border-border bg-transparent hover:bg-card">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">Island Miles</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Island Miles. Last-mile delivery for the Caribbean.
          </p>
        </div>
      </footer>
    </div>
  )
}
