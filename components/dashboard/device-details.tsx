import { ArrowDown, ArrowUp, Battery, Calendar, Clock, Cpu, Signal, Thermometer, Wifi } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Device } from "@/types/device"
import { DeviceChart } from "@/components/dashboard/device-chart"

interface DeviceDetailsProps {
  device: Device
}

export function DeviceDetails({ device }: DeviceDetailsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-0.5">
          <CardTitle className="text-xl">{device.name}</CardTitle>
          <CardDescription>Real-time monitoring and device information</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            Configure
          </Button>
          <Button size="sm">View History</Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div className="grid gap-3">
              <h3 className="text-sm font-medium">Device Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Device ID</p>
                  <p className="text-sm font-medium">{device.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Serial Number</p>
                  <p className="text-sm font-medium">{device.serialNumber}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="text-sm font-medium capitalize">{device.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Firmware</p>
                  <p className="text-sm font-medium">v{device.firmware || "1.2.5"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Installation Date</p>
                  <p className="text-sm font-medium">{device.installDate || "2023-01-15"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Last Calibration</p>
                  <p className="text-sm font-medium">{device.lastCalibration || "2023-10-05"}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <h3 className="text-sm font-medium">Current Status</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Signal className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <p className="text-xs text-muted-foreground">Signal</p>
                    <p className="text-sm font-medium">{device.signal || "Excellent"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Battery className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <p className="text-xs text-muted-foreground">Battery</p>
                    <p className="text-sm font-medium">{device.battery || "92%"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <p className="text-xs text-muted-foreground">Connection</p>
                    <p className="text-sm font-medium">{device.online ? "Online" : "Offline"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <p className="text-xs text-muted-foreground">Temperature</p>
                    <p className="text-sm font-medium">{device.temperature || "24.5°C"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <p className="text-xs text-muted-foreground">CPU Usage</p>
                    <p className="text-sm font-medium">{device.cpuUsage || "12%"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <p className="text-xs text-muted-foreground">Uptime</p>
                    <p className="text-sm font-medium">{device.uptime || "5d 12h"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <h3 className="text-sm font-medium">Thresholds</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Minimum</p>
                  <p className="text-sm font-medium">
                    {device.minThreshold} {device.unit}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Maximum</p>
                  <p className="text-sm font-medium">
                    {device.maxThreshold} {device.unit}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Warning Level</p>
                  <p className="text-sm font-medium">
                    {device.warningLevel || `${device.minThreshold + 5} ${device.unit}`}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Critical Level</p>
                  <p className="text-sm font-medium">
                    {device.criticalLevel || `${device.maxThreshold - 5} ${device.unit}`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Current Reading</h3>
                <Badge
                  variant={
                    device.status === "normal" ? "outline" : device.status === "warning" ? "warning" : "destructive"
                  }
                >
                  {device.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold">{device.value}</p>
                  <p className="text-sm text-muted-foreground">{device.unit}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center">
                    {device.value > device.previousValue ? (
                      <>
                        <ArrowUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-500">
                          {(((device.value - device.previousValue) / device.previousValue) * 100).toFixed(1)}%
                        </span>
                      </>
                    ) : (
                      <>
                        <ArrowDown className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-red-500">
                          {(((device.previousValue - device.value) / device.previousValue) * 100).toFixed(1)}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">vs previous reading</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <h3 className="text-sm font-medium">Real-time Chart</h3>
              <Tabs defaultValue="6h">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="1h">1h</TabsTrigger>
                  <TabsTrigger value="6h">6h</TabsTrigger>
                  <TabsTrigger value="24h">24h</TabsTrigger>
                  <TabsTrigger value="7d">7d</TabsTrigger>
                </TabsList>
                <TabsContent value="1h" className="space-y-4">
                  <DeviceChart device={device} timeRange="1h" />
                </TabsContent>
                <TabsContent value="6h" className="space-y-4">
                  <DeviceChart device={device} timeRange="6h" />
                </TabsContent>
                <TabsContent value="24h" className="space-y-4">
                  <DeviceChart device={device} timeRange="24h" />
                </TabsContent>
                <TabsContent value="7d" className="space-y-4">
                  <DeviceChart device={device} timeRange="7d" />
                </TabsContent>
              </Tabs>
            </div>

            <div className="grid gap-3">
              <h3 className="text-sm font-medium">Last Maintenance</h3>
              <div className="flex items-center gap-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{device.lastMaintenance?.date || "2023-11-10"}</p>
                  <p className="text-xs text-muted-foreground">{device.lastMaintenance?.type || "Routine check"}</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

