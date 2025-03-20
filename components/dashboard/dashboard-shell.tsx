import type React from "react"
import { cn } from "@/lib/utils"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({ children, className, ...props }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <DashboardNav />
        </aside>
        <main className="flex-1 overflow-auto pb-10">
          <div className={cn("", className)} {...props}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

