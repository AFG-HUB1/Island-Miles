"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Package, Eye, EyeOff, ArrowRight, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const router = useRouter()
  const { login, loginWithDemo } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const success = await login(email, password)
    
    if (success) {
      router.push("/")
    } else {
      setError("Invalid email or password. Please try again.")
    }
    
    setIsLoading(false)
  }

  const handleDemoLogin = () => {
    loginWithDemo()
    router.push("/")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/20 via-background to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Package className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-3xl font-bold text-foreground">AFG</span>
          </div>
          
          <h1 className="text-4xl xl:text-5xl font-bold text-foreground mb-6 leading-tight">
            Last Mile Delivery<br />
            <span className="text-primary">Tracking Platform</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            Real-time tracking, route optimization, and fleet management for Jamaica and the Caribbean.
          </p>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <span>Track deliveries in real-time</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <span>Manage your entire fleet</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">AFG</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back</h2>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          {/* Demo Account Button */}
          <button
            onClick={handleDemoLogin}
            className="w-full mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="font-semibold text-foreground">Try Demo Account</p>
                <p className="text-sm text-muted-foreground">demo@afg.com / demo123</p>
              </div>
              <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">or sign in with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-card border-border"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-card border-border pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border bg-card text-primary focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <Link href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
