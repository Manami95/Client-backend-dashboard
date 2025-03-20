"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Bell, Download, Home, LineChart, Menu, MessageSquare, Moon, Settings, Sun, Ticket } from "lucide-react"
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"

// Mock data for devices
const devices = [
  {
    id: "DEV-001",
    serialNumber: "SN-12345",
    name: "Flow Meter 1",
    type: "flowmeter",
    value: 75.2,
    unit: "L/min",
    status: "normal",
    minThreshold: 50,
    maxThreshold: 100,
    lastUpdated: "2023-05-15T10:30:00",
  },
  {
    id: "DEV-002",
    serialNumber: "SN-67890",
    name: "BOD Sensor",
    type: "bod",
    value: 35.8,
    unit: "mg/L",
    status: "warning",
    minThreshold: 0,
    maxThreshold: 30,
    lastUpdated: "2023-05-15T10:32:00",
  },
  {
    id: "DEV-003",
    serialNumber: "SN-24680",
    name: "COD Sensor",
    type: "cod",
    value: 120.5,
    unit: "mg/L",
    status: "normal",
    minThreshold: 0,
    maxThreshold: 150,
    lastUpdated: "2023-05-15T10:29:00",
  },
  {
    id: "DEV-004",
    serialNumber: "SN-13579",
    name: "pH Meter",
    type: "ph",
    value: 8.7,
    unit: "pH",
    status: "critical",
    minThreshold: 6.5,
    maxThreshold: 8.5,
    lastUpdated: "2023-05-15T10:31:00",
  },
]

// Mock historical data for charts
const generateHistoricalData = (deviceType, days = 7) => {
  const data = []
  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    let value
    switch (deviceType) {
      case "flowmeter":
        value = 60 + Math.random() * 40
        break
      case "bod":
        value = 20 + Math.random() * 20
        break
      case "cod":
        value = 100 + Math.random() * 50
        break
      case "ph":
        value = 6.5 + Math.random() * 2.5
        break
      default:
        value = Math.random() * 100
    }

    data.push({
      date: date.toISOString().split("T")[0],
      value: Number.parseFloat(value.toFixed(2)),
    })
  }

  return data
}

export default function Dashboard() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState(devices[0])
  const [historicalData, setHistoricalData] = useState([])
  const [alertsEnabled, setAlertsEnabled] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [timeRange, setTimeRange] = useState("7d")

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedDevices = devices.map((device) => {
        // Add some random fluctuation to the values
        let newValue
        switch (device.type) {
          case "flowmeter":
            newValue = device.value + (Math.random() * 6 - 3)
            break
          case "bod":
            newValue = device.value + (Math.random() * 4 - 2)
            break
          case "cod":
            newValue = device.value + (Math.random() * 10 - 5)
            break
          case "ph":
            newValue = device.value + (Math.random() * 0.4 - 0.2)
            break
          default:
            newValue = device.value
        }

        // Ensure value stays within reasonable bounds
        newValue = Math.max(0, newValue)
        if (device.type === "ph") {
          newValue = Math.min(14, Math.max(0, newValue))
        }

        // Check if the new value exceeds thresholds
        let status = "normal"
        if (newValue > device.maxThreshold) {
          status = "critical"
          if (alertsEnabled && device.status !== "critical") {
            showAlert(device.name, newValue, device.unit, "exceeded maximum threshold")
          }
        } else if (newValue < device.minThreshold) {
          status = "warning"
          if (alertsEnabled && device.status !== "warning" && device.status !== "critical") {
            showAlert(device.name, newValue, device.unit, "below minimum threshold")
          }
        }

        return {
          ...device,
          value: Number.parseFloat(newValue.toFixed(2)),
          status,
          lastUpdated: new Date().toISOString(),
        }
      })

      // Update the selected device if it's in the updated list
      const updatedSelectedDevice = updatedDevices.find((d) => d.id === selectedDevice.id)
      if (updatedSelectedDevice) {
        setSelectedDevice(updatedSelectedDevice)
      }
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [selectedDevice, alertsEnabled])

  // Load historical data when selected device changes
  useEffect(() => {
    if (selectedDevice) {
      const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
      setHistoricalData(generateHistoricalData(selectedDevice.type, days))
    }
  }, [selectedDevice, timeRange])

  const showAlert = (deviceName, value, unit, message) => {
    toast({
      variant: "destructive",
      title: `Alert: ${deviceName}`,
      description: `Value ${value} ${unit} ${message}`,
      action: smsNotifications ? <ToastAction altText="SMS Sent">SMS Sent</ToastAction> : null,
    })
  }

  const handleDeviceSelect = (deviceId) => {
    const device = devices.find((d) => d.id === deviceId)
    if (device) {
      setSelectedDevice(device)
    }
  }

  const downloadReport = () => {
    // In a real application, this would generate and download a CSV or PDF
    toast({
      title: "Report Downloaded",
      description: `Data for ${selectedDevice.name} has been downloaded.`,
    })
  }

  const submitTicket = (e) => {
    e.preventDefault()
    // In a real application, this would submit the ticket to a backend
    toast({
      title: "Ticket Submitted",
      description: "Your support ticket has been submitted. We'll respond shortly.",
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "normal":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getValuePercentage = (device) => {
    const range = device.maxThreshold - device.minThreshold
    const valueInRange = device.value - device.minThreshold
    return Math.min(100, Math.max(0, (valueInRange / range) * 100))
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-2 text-lg font-medium">
              <Button variant="ghost" className="justify-start gap-2">
                <Home className="h-5 w-5" />
                Dashboard
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <LineChart className="h-5 w-5" />
                Analytics
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <Ticket className="h-5 w-5" />
                Support
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <LineChart className="h-6 w-6" />
          <span className="text-lg font-semibold">DeviceTrack</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar (desktop) */}
        <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
          <nav className="grid gap-2 p-4 text-sm">
            <Button variant="default" className="justify-start gap-2">
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <LineChart className="h-4 w-4" />
              Analytics
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Ticket className="h-4 w-4" />
              Support
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </nav>
          <div className="flex-1"></div>
          <div className="border-t p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-2">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Need help?</p>
                <p className="text-xs text-muted-foreground">Contact support</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Monitor your devices and track real-time data.</p>
            </div>

            {/* Device overview cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {devices.map((device) => (
                <Card
                  key={device.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedDevice.id === device.id ? "border-primary" : ""
                  }`}
                  onClick={() => handleDeviceSelect(device.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{device.name}</CardTitle>
                      <div className={`h-3 w-3 rounded-full ${getStatusColor(device.status)}`} />
                    </div>
                    <CardDescription className="flex justify-between text-xs">
                      <span>ID: {device.id}</span>
                      <span>SN: {device.serialNumber}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline justify-between">
                      <div className="text-2xl font-bold">
                        {device.value} <span className="text-sm font-normal">{device.unit}</span>
                      </div>
                      <Badge variant={device.status === "normal" ? "outline" : "destructive"}>{device.status}</Badge>
                    </div>
                    <Progress
                      value={getValuePercentage(device)}
                      className="mt-2"
                      indicatorClassName={
                        device.status === "critical"
                          ? "bg-red-500"
                          : device.status === "warning"
                            ? "bg-yellow-500"
                            : undefined
                      }
                    />
                    <p className="mt-2 text-xs text-muted-foreground">Last updated: {formatDate(device.lastUpdated)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tabs for detailed view */}
            <Tabs defaultValue="overview" className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="history">Historical Data</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Ticket className="mr-2 h-4 w-4" />
                        Raise Ticket
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Submit Support Ticket</DialogTitle>
                        <DialogDescription>Describe the issue you're experiencing with your devices.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={submitTicket}>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="device">Device</Label>
                            <Select defaultValue={selectedDevice.id}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select device" />
                              </SelectTrigger>
                              <SelectContent>
                                {devices.map((device) => (
                                  <SelectItem key={device.id} value={device.id}>
                                    {device.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="issue-type">Issue Type</Label>
                            <Select defaultValue="malfunction">
                              <SelectTrigger>
                                <SelectValue placeholder="Select issue type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="malfunction">Device Malfunction</SelectItem>
                                <SelectItem value="calibration">Calibration Issue</SelectItem>
                                <SelectItem value="connectivity">Connectivity Problem</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              placeholder="Please describe the issue in detail..."
                              className="min-h-[100px]"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Submit Ticket</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" size="sm" onClick={downloadReport}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                </div>
              </div>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedDevice.name} Details</CardTitle>
                    <CardDescription>Current readings and status information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Device ID:</span>
                          <span>{selectedDevice.id}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Serial Number:</span>
                          <span>{selectedDevice.serialNumber}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Type:</span>
                          <span className="capitalize">{selectedDevice.type}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Last Updated:</span>
                          <span>{new Date(selectedDevice.lastUpdated).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Current Value:</span>
                          <span className="text-xl font-bold">
                            {selectedDevice.value} {selectedDevice.unit}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Min Threshold:</span>
                          <span>
                            {selectedDevice.minThreshold} {selectedDevice.unit}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Max Threshold:</span>
                          <span>
                            {selectedDevice.maxThreshold} {selectedDevice.unit}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Status:</span>
                          <Badge variant={selectedDevice.status === "normal" ? "outline" : "destructive"}>
                            {selectedDevice.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h4 className="mb-4 text-sm font-medium">Real-time Value</h4>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsLineChart
                            data={historicalData.slice(-24)}
                            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="date"
                              tick={{ fontSize: 12 }}
                              tickFormatter={(value) => value.split("-")[2]} // Just show day
                            />
                            <YAxis
                              domain={[
                                Math.max(0, selectedDevice.minThreshold * 0.8),
                                selectedDevice.maxThreshold * 1.2,
                              ]}
                            />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="hsl(var(--primary))"
                              strokeWidth={2}
                              dot={{ r: 3 }}
                              activeDot={{ r: 5 }}
                            />
                          </RechartsLineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Historical Data</CardTitle>
                      <CardDescription>View trends and patterns over time</CardDescription>
                    </div>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7d">Last 7 days</SelectItem>
                        <SelectItem value="30d">Last 30 days</SelectItem>
                        <SelectItem value="90d">Last 90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={historicalData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                          <YAxis
                            domain={[Math.max(0, selectedDevice.minThreshold * 0.8), selectedDevice.maxThreshold * 1.2]}
                          />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            dot={{ r: 2 }}
                            activeDot={{ r: 5 }}
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">Data shown for {selectedDevice.name}</div>
                    <Button variant="outline" size="sm" onClick={downloadReport}>
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Alert Settings</CardTitle>
                    <CardDescription>Configure how you receive notifications</CardDescription>
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

                    <div className="pt-4">
                      <h3 className="mb-4 text-sm font-medium">Threshold Settings</h3>
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="min-threshold">Minimum Threshold ({selectedDevice.unit})</Label>
                          <Input
                            id="min-threshold"
                            type="number"
                            defaultValue={selectedDevice.minThreshold}
                            step="0.1"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="max-threshold">Maximum Threshold ({selectedDevice.unit})</Label>
                          <Input
                            id="max-threshold"
                            type="number"
                            defaultValue={selectedDevice.maxThreshold}
                            step="0.1"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Settings</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

