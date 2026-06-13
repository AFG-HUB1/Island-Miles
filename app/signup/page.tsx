"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Package, Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle2, Building2, MapPin, Phone, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignupPage() {
  const router = useRouter()
  const { signup, loginWithDemo } = useAuth()
  const [step, setStep] = useState(1)
  
  // Step 1: Business Details
  const [companyName, setCompanyName] = useState("")
  const [businessAddress, setBusinessAddress] = useState("")
  const [parish, setParish] = useState("")
  const [businessPhone, setBusinessPhone] = useState("")
  const [website, setWebsite] = useState("")
  const [businessType, setBusinessType] = useState("")
  
  // Step 2: Account Details
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const parishes = [
    "Kingston",
    "St. Andrew",
    "St. Thomas",
    "Portland",
    "St. Mary",
    "St. Ann",
    "Trelawny",
    "St. James",
    "Hanover",
    "Westmoreland",
    "St. Elizabeth",
    "Manchester",
    "Clarendon",
    "St. Catherine"
  ]

  const businessTypes = [
    "E-commerce / Online Store",
    "Retail Store",
    "Restaurant / Food Service",
    "Pharmacy",
    "Grocery / Supermarket",
    "Courier Service",
    "Wholesale / Distribution",
    "Other"
  ]

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!companyName || !businessAddress || !parish || !businessPhone) {
      setError("Please fill in all required fields")
      return
    }
    
    setStep(2)
  }

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)

    const success = await signup(name, email, password)
    
    if (success) {
      router.push("/dashboard")
    } else {
      setError("Failed to create account. Please try again.")
    }
    
    setIsLoading(false)
  }

  const handleDemoLogin = () => {
    loginWithDemo()
    router.push("/dashboard")
  }

  const features = [
    "Real-time delivery tracking",
    "Fleet management tools",
    "Driver performance analytics",
    "Customer notification system",
    "Route optimization"
  ]

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
            Start Managing<br />
            <span className="text-primary">Your Deliveries</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            Join AFG and get access to powerful delivery management tools for your business.
          </p>
          
          <div className="flex flex-col gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">AFG</span>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              1
            </div>
            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              2
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {step === 1 ? "Business Details" : "Account Details"}
            </h2>
            <p className="text-muted-foreground">
              {step === 1 ? "Tell us about your business" : "Create your login credentials"}
            </p>
          </div>

          {/* Demo Account Button */}
          <button
            onClick={handleDemoLogin}
            className="w-full mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="font-semibold text-foreground">Try Demo Account</p>
                <p className="text-sm text-muted-foreground">Skip signup and explore the dashboard</p>
              </div>
              <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">or create an account</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Business Details */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-foreground mb-2">
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Company Name <span className="text-destructive">*</span>
                  </span>
                </label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Enter your company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className="bg-card border-border"
                />
              </div>

              <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-foreground mb-2">
                  Business Type
                </label>
                <select
                  id="businessType"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select business type</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="businessAddress" className="block text-sm font-medium text-foreground mb-2">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Business Address <span className="text-destructive">*</span>
                  </span>
                </label>
                <Input
                  id="businessAddress"
                  type="text"
                  placeholder="Enter your business address"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  required
                  className="bg-card border-border"
                />
              </div>

              <div>
                <label htmlFor="parish" className="block text-sm font-medium text-foreground mb-2">
                  Parish <span className="text-destructive">*</span>
                </label>
                <select
                  id="parish"
                  value={parish}
                  onChange={(e) => setParish(e.target.value)}
                  required
                  className="w-full h-10 px-3 rounded-md bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select parish</option>
                  {parishes.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="businessPhone" className="block text-sm font-medium text-foreground mb-2">
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Business Phone <span className="text-destructive">*</span>
                  </span>
                </label>
                <Input
                  id="businessPhone"
                  type="tel"
                  placeholder="e.g. 876-555-1234"
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  required
                  className="bg-card border-border"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-foreground mb-2">
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Website <span className="text-muted-foreground text-xs">(optional)</span>
                  </span>
                </label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://www.example.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="bg-card border-border"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}

          {/* Step 2: Account Details */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-card border-border"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email <span className="text-destructive">*</span>
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
                  Password <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
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
                <p className="mt-1 text-xs text-muted-foreground">Must be at least 6 characters</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                  Confirm Password <span className="text-destructive">*</span>
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-card border-border"
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="w-4 h-4 mt-0.5 rounded border-border bg-card text-primary focus:ring-primary"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <Link href="#" className="text-primary hover:underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
                </label>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isLoading ? "Creating..." : "Create Account"}
                </Button>
              </div>
            </form>
          )}

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
