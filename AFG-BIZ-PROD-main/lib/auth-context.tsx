"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  loginWithDemo: () => void
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo account credentials
const DEMO_USER: User = {
  id: "demo-001",
  name: "Demo User",
  email: "demo@afg.com",
  role: "Admin",
  avatar: undefined
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const storedUser = localStorage.getItem("afg_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Demo credentials check
    if (email === "demo@afg.com" && password === "demo123") {
      setUser(DEMO_USER)
      localStorage.setItem("afg_user", JSON.stringify(DEMO_USER))
      return true
    }
    
    // For demo purposes, accept any valid-looking credentials
    if (email && password.length >= 6) {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: email.split("@")[0],
        email,
        role: "User"
      }
      setUser(newUser)
      localStorage.setItem("afg_user", JSON.stringify(newUser))
      return true
    }
    
    return false
  }

  const loginWithDemo = () => {
    setUser(DEMO_USER)
    localStorage.setItem("afg_user", JSON.stringify(DEMO_USER))
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (name && email && password.length >= 6) {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: "User"
      }
      setUser(newUser)
      localStorage.setItem("afg_user", JSON.stringify(newUser))
      return true
    }
    
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("afg_user")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithDemo, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
