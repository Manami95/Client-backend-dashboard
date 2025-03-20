import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ActivitySquare } from "lucide-react"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="flex items-center space-x-2 text-lg font-medium">
        <ActivitySquare className="h-5 w-5 text-primary" />
        <span>DeviceTrack</span>
      </Link>
      <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
        Dashboard
      </Link>
      <Link href="/devices" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Devices
      </Link>
      <Link
        href="/analytics"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Analytics
      </Link>
      <Link href="/reports" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Reports
      </Link>
    </nav>
  )
}

