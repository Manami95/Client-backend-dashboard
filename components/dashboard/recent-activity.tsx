import { Activity, AlertTriangle, CheckCircle2, Clock, Settings, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "alert",
      severity: "critical",
      device: "pH Meter",
      message: "Value exceeded maximum threshold",
      time: "10 minutes ago",
    },
    {
      id: 2,
      type: "maintenance",
      device: "Flow Meter 1",
      message: "Scheduled maintenance completed",
      time: "2 hours ago",
    },
    {
      id: 3,
      type: "alert",
      severity: "warning",
      device: "BOD Sensor",
      message: "Value approaching warning threshold",
      time: "3 hours ago",
    },
    {
      id: 4,
      type: "system",
      device: "COD Sensor",
      message: "Firmware updated to v2.1.5",
      time: "Yesterday",
    },
    {
      id: 5,
      type: "alert",
      severity: "normal",
      device: "pH Meter",
      message: "Value returned to normal range",
      time: "Yesterday",
    },
  ]

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-0.5">
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest events and notifications</CardDescription>
        </div>
        <Button variant="outline" size="icon" className="ml-auto">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id}>
              <div className="flex gap-4">
                <div className="relative mt-0.5">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      activity.type === "alert"
                        ? activity.severity === "critical"
                          ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                          : activity.severity === "warning"
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                            : "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                        : activity.type === "maintenance"
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {activity.type === "alert" ? (
                      activity.severity === "critical" ? (
                        <XCircle className="h-4 w-4" />
                      ) : activity.severity === "warning" ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4" />
                      )
                    ) : activity.type === "maintenance" ? (
                      <Settings className="h-4 w-4" />
                    ) : (
                      <Activity className="h-4 w-4" />
                    )}
                  </div>
                  {index < activities.length - 1 && (
                    <div className="absolute bottom-0 left-1/2 top-8 w-px -translate-x-1/2 bg-border" />
                  )}
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{activity.device}</p>
                    {activity.type === "alert" && (
                      <Badge
                        variant={
                          activity.severity === "critical"
                            ? "destructive"
                            : activity.severity === "warning"
                              ? "warning"
                              : "outline"
                        }
                      >
                        {activity.severity}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.message}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
              {index < activities.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

