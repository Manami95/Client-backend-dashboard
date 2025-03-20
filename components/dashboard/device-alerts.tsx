"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, CheckCircle2, Clock, Download, Filter, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Device } from "@/types/device"
import { generateAlerts } from "@/lib/data-utils"

interface DeviceAlertsProps {
  device: Device
}

export function DeviceAlerts({ device }: DeviceAlertsProps) {
  const [alertsEnabled, setAlertsEnabled] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [alerts, setAlerts] = useState<any[]>([])

  useEffect(() => {
    // Generate alerts when the component mounts or when the device changes
    setAlerts(generateAlerts(device.type, 10) || [])
  }, [device])

  if (!alerts || alerts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Alert Management</CardTitle>
          <CardDescription>No alerts available for {device.name}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-0.5">
          <CardTitle className="text-xl">Alert Management</CardTitle>
          <CardDescription>Configure and view alerts for {device.name}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="history">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="history">Alert History</TabsTrigger>
            <TabsTrigger value="settings">Alert Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="history" className="space-y-6 pt-4">
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <Card key={index} className="overflow-hidden">
                  <div
                    className={`flex items-center gap-4 p-4 ${
                      alert.severity === "critical"
                        ? "bg-red-500/10"
                        : alert.severity === "warning"
                          ? "bg-yellow-500/10"
                          : "bg-green-500/10"
                    }`}
                  >
                    {alert.severity === "critical" ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : alert.severity === "warning" ? (
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                    <div>
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                    </div>
                    <div className="ml-auto flex flex-col items-end">
                      <Badge
                        variant={
                          alert.severity === "critical"
                            ? "destructive"
                            : alert.severity === "warning"
                              ? "warning"
                              : "outline"
                        }
                      >
                        {alert.severity}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {alert.timestamp}
                      </div>
                    </div>
                  </div>
                  <CardContent className="grid gap-2 p-4 pt-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Value:</span>
                      <span className="font-medium">
                        {alert.value} {device.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Threshold:</span>
                      <span className="font-medium">
                        {alert.threshold} {device.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{alert.duration}</span>
                    </div>
                    {alert.actions && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Actions Taken:</span>
                        <span className="font-medium">{alert.actions}</span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 border-t p-4">
                    <Button variant="outline" size="sm">
                      Acknowledge
                    </Button>
                    <Button size="sm">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="settings" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notification Settings</CardTitle>
                <CardDescription>Configure how you receive alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="alerts-enabled" className="flex flex-col space-y-1">
                    <span>Enable Alerts</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Show alerts for out-of-range values
                    </span>
                  </Label>
                  <Switch id="alerts-enabled" checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="sms-notifications" className="flex flex-col space-y-1">
                    <span>SMS Notifications</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Receive text messages for critical alerts
                    </span>
                  </Label>
                  <Switch
                    id="sms-notifications"
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                    disabled={!alertsEnabled}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                    <span>Email Notifications</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Receive email alerts for all notifications
                    </span>
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                    disabled={!alertsEnabled}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Threshold Settings</CardTitle>
                <CardDescription>Configure alert thresholds for {device.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="min-threshold">Minimum Threshold ({device.unit})</Label>
                  <Input id="min-threshold" type="number" defaultValue={device.minThreshold} step="0.1" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="max-threshold">Maximum Threshold ({device.unit})</Label>
                  <Input id="max-threshold" type="number" defaultValue={device.maxThreshold} step="0.1" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="warning-delay">Warning Delay (seconds)</Label>
                  <Input id="warning-delay" type="number" defaultValue="30" />
                  <p className="text-xs text-muted-foreground">Time to wait before triggering a warning alert</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="critical-delay">Critical Delay (seconds)</Label>
                  <Input id="critical-delay" type="number" defaultValue="10" />
                  <p className="text-xs text-muted-foreground">Time to wait before triggering a critical alert</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t p-4">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Contact Information</CardTitle>
                <CardDescription>Who should receive alert notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="primary-contact">Primary Contact</Label>
                  <Input id="primary-contact" defaultValue="John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone-number">Phone Number</Label>
                  <Input id="phone-number" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="alert-priority">Alert Priority</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Alerts</SelectItem>
                      <SelectItem value="critical">Critical Only</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t p-4">
                <Button>Save Contact</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

