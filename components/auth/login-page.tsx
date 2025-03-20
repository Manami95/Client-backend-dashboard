"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
<<<<<<< HEAD
=======
import { signIn } from "next-auth/react"
>>>>>>> 53fdfb42e21bb902f8308ca68c3b9abf095e991d
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
<<<<<<< HEAD
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
=======

>>>>>>> 53fdfb42e21bb902f8308ca68c3b9abf095e991d

export function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
<<<<<<< HEAD
  const [showPassword, setShowPassword] = useState(false)
=======
>>>>>>> 53fdfb42e21bb902f8308ca68c3b9abf095e991d

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

<<<<<<< HEAD
    try {
      // First, check if the server is running
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          email: email.trim(),
          password: password.trim() 
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Login response:', data)

      if (data.success) {
        // Store user data and token
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('isLoggedIn', 'true')
        
        console.log('Login successful, redirecting...')
        router.push("/dashboard")
      } else {
        setError(data.message || "Invalid credentials")
      }
    } catch (err: any) {
      console.error('Login error:', err)
      if (err.message.includes('Failed to fetch')) {
        setError("Cannot connect to server. Please check if the backend is running.")
      } else {
        setError(err.message || "Login failed. Please try again.")
      }
=======
    // Hardcoded admin credentials (in a real app, this would be in a secure backend)
    const ADMIN_EMAIL = "admin@heepl.com"
    const ADMIN_PASSWORD = "admin123"

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      try {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        })
        
        if (result?.error) {
          setError("Invalid credentials")
        } else {
          router.push("/dashboard")
        }
      } catch (err) {
        setError("Something went wrong")
      }
    } else {
      setError("Invalid email or password")
    }
    
    setIsLoading(false)
  }
  
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      setError("")
      const result = await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: false,
      })
      
      if (result?.error) {
        setError(result.error)
      } else if (result?.url) {
        router.push(result.url)
      }
    } catch (err) {
      console.error("Sign in error:", err)
      setError("Failed to initialize Google Sign-In")
>>>>>>> 53fdfb42e21bb902f8308ca68c3b9abf095e991d
    } finally {
      setIsLoading(false)
    }
  }
<<<<<<< HEAD

=======
  
>>>>>>> 53fdfb42e21bb902f8308ca68c3b9abf095e991d
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

<<<<<<< HEAD
      <Card className="w-full max-w-md shadow-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-t border-l border-white/50">
=======
      <Card className="w-full max-w-md shadow-2xl bg-white/90 backdrop-blur-sm border-t border-l border-white/50">
>>>>>>> 53fdfb42e21bb902f8308ca68c3b9abf095e991d
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
              Welcome to HEEPL
            </CardTitle>
            <CardDescription className="text-center text-base text-blue-600">
              Wastewater Treatment Solutions
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
<<<<<<< HEAD
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-700 dark:text-blue-400">Email</Label>
=======
          <Button
            variant="outline"
            type="button"
            className="w-full h-10"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-t-2 border-blue-600 rounded-full animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </div>
            )}
          </Button>
  
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
>>>>>>> 53fdfb42e21bb902f8308ca68c3b9abf095e991d
              <Input
                id="email"
                name="email"
                type="email"
<<<<<<< HEAD
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
                  placeholder="Enter your password"
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
=======
                placeholder="admin@heepl.com"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                disabled={isLoading}
              />
>>>>>>> 53fdfb42e21bb902f8308ca68c3b9abf095e991d
            </div>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
<<<<<<< HEAD
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:from-blue-700 hover:to-teal-700" 
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <div className="text-center text-sm text-blue-600">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-teal-600 hover:underline font-semibold">
                Sign up
              </Link>
            </div>
=======
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
>>>>>>> 53fdfb42e21bb902f8308ca68c3b9abf095e991d
          </form>
        </CardContent>
      </Card>
    </div>
  )
}