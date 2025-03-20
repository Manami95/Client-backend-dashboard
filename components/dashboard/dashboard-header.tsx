"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Bell, HelpCircle, Menu, Moon, Search, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserNav } from "@/components/dashboard/user-nav"
import { AddDeviceDialog } from "@/components/dashboard/add-device-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { signOut } from "next-auth/react"

export function DashboardHeader() {
  const { theme, setTheme } = useTheme()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fotor-2025022032529-tF5TXEMxj4mgjA4M1qVpyWr9fQ5BIV.png"
              alt="HEEPL Logo"
              className="h-8 w-8"
            />
            <span className="hidden font-bold sm:inline-block">HEEPL</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground">
              Dashboard
            </Link>
            <Link href="/devices" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Devices
            </Link>
            <Link href="/analytics" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Analytics
            </Link>
            <Link href="/reports" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Reports
            </Link>
          </nav>
        </div>
        <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNav />
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-background pl-8 md:w-[240px] lg:w-[300px]"
              />
            </form>
          </div>
          <div className="flex items-center gap-2">
            <AddDeviceDialog
              onAddDevice={(device) => {
                console.log("New device:", device)
                // Here you would typically add the device to your state/database
              }}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-[10px]">3</Badge>
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[340px]">
                <div className="flex items-center justify-between p-2">
                  <h2 className="font-medium">Notifications</h2>
                  <Button variant="ghost" size="sm" className="h-auto p-1 text-xs">
                    Mark all as read
                  </Button>
                </div>
                <div className="max-h-[calc(var(--radix-dropdown-menu-content-available-height)-60px)] overflow-auto">
                  {[1, 2, 3].map((i) => (
                    <DropdownMenuItem key={i} className="flex flex-col items-start p-3">
                      <div className="flex w-full justify-between">
                        <span className="font-medium">Alert: pH Meter</span>
                        <span className="text-xs text-muted-foreground">2h ago</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Value 9.2 pH exceeded maximum threshold</span>
                    </DropdownMenuItem>
                  ))}
                </div>
                <div className="border-t p-2">
                  <Button variant="outline" size="sm" className="w-full">
                    View all notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="ghost" size="icon" className="ml-2">
              <HelpCircle className="h-4 w-4" />
              <span className="sr-only">Help</span>
            </Button>
            <UserNav onSignOut={() => signOut({ callbackUrl: "/login" })} />
            
          </div>
        </div>
      </div>
    </header>
  )
}

function MobileNav() {
  return (
    <div className="flex h-full flex-col overflow-auto py-4">
      <Link href="/" className="mb-4 flex items-center space-x-2 px-4">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fotor-2025022032529-tF5TXEMxj4mgjA4M1qVpyWr9fQ5BIV.png"
          alt="HEEPL Logo"
          className="h-6 w-6"
        />
        <span className="font-bold">HEEPL</span>
      </Link>
      <div className="space-y-1 px-2">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/devices">Devices</Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/analytics">Analytics</Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/reports">Reports</Link>
        </Button>
      </div>
    </div>
  )
}

