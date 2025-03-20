"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export function SignUpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setPasswordError("")

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (data.success) {
        router.push("/login")
      } else {
        setError(data.message || "Failed to create account")
      }
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-200 via-cyan-100 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated water-like background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Water droplet animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 animate-droplet text-4xl">💧</div>
        <div className="absolute top-20 right-20 animate-droplet animation-delay-2000 text-4xl">💧</div>
        <div className="absolute bottom-10 left-1/2 animate-droplet animation-delay-4000 text-4xl">💧</div>
        <div className="absolute top-1/3 left-1/4 animate-droplet animation-delay-1000 text-3xl">💧</div>
        <div className="absolute top-1/2 right-1/3 animate-droplet animation-delay-3000 text-3xl">💧</div>
      </div>

      <Card className="w-full max-w-md shadow-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-t border-l border-white/50">
        <CardHeader className="space-y-4 pb-8">
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full blur-xl opacity-75 animate-pulse"></div>
              <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-blue-400 to-teal-400 flex items-center justify-center shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,#fff8)] animate-wave"></div>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fotor-2025022032529-tF5TXEMxj4mgjA4M1qVpyWr9fQ5BIV.png"
                  alt="HEEPL Logo"
                  className="h-12 w-12 transform hover:scale-110 transition-transform duration-300 relative z-10"
                />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <CardDescription className="text-center text-base text-blue-600">
              Join HEEPL Wastewater Treatment Solutions
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-700 dark:text-blue-400">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your full name"
                required
                disabled={isLoading}
                className="border-blue-200 focus:border-blue-400 dark:border-blue-900 dark:focus:border-blue-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-700 dark:text-blue-400">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                disabled={isLoading}
                className="border-blue-200 focus:border-blue-400 dark:border-blue-900 dark:focus:border-blue-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-700 dark:text-blue-400">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  required
                  disabled={isLoading}
                  className="border-blue-200 focus:border-blue-400 dark:border-blue-900 dark:focus:border-blue-700 dark:bg-gray-800 dark:text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-blue-700 dark:text-blue-400">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  required
                  disabled={isLoading}
                  className="border-blue-200 focus:border-blue-400 dark:border-blue-900 dark:focus:border-blue-700 dark:bg-gray-800 dark:text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            {passwordError && (
              <div className="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
                {passwordError}
              </div>
            )}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:from-blue-700 hover:to-teal-700" 
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            <div className="text-center text-sm text-blue-600 dark:text-blue-400">
              Already have an account?{" "}
              <Link href="/login" className="text-teal-600 dark:text-teal-400 hover:underline font-semibold">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}