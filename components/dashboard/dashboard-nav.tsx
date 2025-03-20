"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ActivitySquare,
  AlertTriangle,
  BarChart3,
  Bell,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Map,
  MessageSquare,
  Smartphone,
  Ticket,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  disabled?: boolean
}

const navItems: { section: string; items: NavItem[] }[] = [
  {
    section: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard className="h-4 w-4" />,
      },
      {
        title: "Devices",
        href: "/devices",
        icon: <Smartphone className="h-4 w-4" />,
      },
      {
        title: "Alerts",
        href: "/alerts",
        icon: <AlertTriangle className="h-4 w-4" />,
      },
      {
        title: "Map View",
        href: "/map",
        icon: <Map className="h-4 w-4" />,
      },
    ],
  },
  {
    section: "Analytics",
    items: [
      {
        title: "Reports",
        href: "/reports",
        icon: <FileText className="h-4 w-4" />,
      },
      {
        title: "Statistics",
        href: "/statistics",
        icon: <BarChart3 className="h-4 w-4" />,
      },
      {
        title: "Activity",
        href: "/activity",
        icon: <ActivitySquare className="h-4 w-4" />,
      },
    ],
  },
  {
    section: "Support",
    items: [
      {
        title: "Tickets",
        href: "/tickets",
        icon: <Ticket className="h-4 w-4" />,
      },
      {
        title: "Notifications",
        href: "/notifications",
        icon: <Bell className="h-4 w-4" />,
      },
      {
        title: "Help Center",
        href: "/help",
        icon: <HelpCircle className="h-4 w-4" />,
      },
    ],
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <ScrollArea className="h-full py-6">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">DeviceTrack</h2>
        <div className="space-y-1">
          {navItems.map((section, i) => (
            <div key={i} className="py-2">
              <h3 className="mb-1 px-4 text-xs font-medium text-muted-foreground">{section.section}</h3>
              {section.items.map((item, j) => (
                <Button
                  key={j}
                  asChild
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  disabled={item.disabled}
                >
                  <Link href={item.href}>
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                  </Link>
                </Button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto px-3 py-2">
        <div className="mt-6 rounded-lg border bg-card p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Need help?</p>
              <p className="text-xs text-muted-foreground">Our support team is a click away</p>
            </div>
          </div>
          <Button className="mt-4 w-full text-xs" size="sm">
            Contact Support
          </Button>
        </div>
      </div>
    </ScrollArea>
  )
}

