import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { Device } from "@/types/device"

interface DeviceOverviewProps {
  devices: Device[]
  selectedDeviceId?: string
  onDeviceSelect: (device: Device) => void
}

export function DeviceOverview({ devices, selectedDeviceId, onDeviceSelect }: DeviceOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {devices.map((device) => (
        <Card
          key={device.id}
          className={cn(
            "cursor-pointer transition-all hover:shadow-md",
            selectedDeviceId === device.id ? "border-primary" : "",
          )}
          onClick={() => onDeviceSelect(device)}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{device.name}</CardTitle>
            <DeviceStatusBadge status={device.status} />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between space-y-0">
              <CardDescription className="text-xs">
                ID: {device.id} | SN: {device.serialNumber}
              </CardDescription>
            </div>
            <div className="flex items-baseline justify-between mt-3">
              <div className="text-2xl font-bold">
                {device.value} <span className="text-sm font-normal">{device.unit}</span>
              </div>
              <DeviceTrend current={device.value} previous={device.previousValue} />
            </div>
            <Progress
              value={getValuePercentage(device)}
              className="mt-3"
              indicatorClassName={
                device.status === "critical" ? "bg-destructive" : device.status === "warning" ? "bg-warning" : undefined
              }
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>{device.minThreshold}</span>
              <span>{device.maxThreshold}</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center">
                <div className={cn("h-2 w-2 rounded-full mr-1", device.online ? "bg-green-500" : "bg-red-500")} />
                <span className="text-xs text-muted-foreground">{device.online ? "Online" : "Offline"}</span>
              </div>
              <span className="text-xs text-muted-foreground">Updated: {formatTime(device.lastUpdated)}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function DeviceStatusBadge({ status }: { status: string }) {
  if (status === "normal") {
    return (
      <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-600">
        Normal
      </Badge>
    )
  }

  if (status === "warning") {
    return (
      <Badge
        variant="outline"
        className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 hover:text-yellow-600"
      >
        Warning
      </Badge>
    )
  }

  if (status === "critical") {
    return (
      <Badge variant="outline" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-600">
        Critical
      </Badge>
    )
  }

  return <Badge variant="outline">{status}</Badge>
}

function DeviceTrend({ current, previous }: { current: number; previous: number }) {
  const diff = current - previous
  const percentage = previous ? Math.abs(Math.round((diff / previous) * 100)) : 0

  if (Math.abs(diff) < 0.01) {
    return null
  }

  if (diff > 0) {
    return (
      <div className="flex items-center text-green-500">
        <ArrowUp className="h-3 w-3 mr-1" />
        <span className="text-xs">{percentage}%</span>
      </div>
    )
  }

  return (
    <div className="flex items-center text-red-500">
      <ArrowDown className="h-3 w-3 mr-1" />
      <span className="text-xs">{percentage}%</span>
    </div>
  )
}

function getValuePercentage(device: Device) {
  const range = device.maxThreshold - device.minThreshold
  const valueInRange = device.value - device.minThreshold
  return Math.min(100, Math.max(0, (valueInRange / range) * 100))
}

function formatTime(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

