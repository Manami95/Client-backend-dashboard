import type { Device } from "@/types/device"
import { format } from "date-fns"

// Helper function to format dates
function formatDate(date: Date, formatStr: string): string {
  return format(date, formatStr)
}

// Generate mock devices
export function generateDevices(): Device[] {
  return [
    {
      id: "DEV-001",
      serialNumber: "SN-12345",
      name: "Flow Meter 1",
      type: "flowmeter",
      value: 75.2,
      previousValue: 74.8,
      unit: "L/min",
      status: "normal",
      minThreshold: 50,
      maxThreshold: 100,
      lastUpdated: new Date().toISOString(),
      online: true,
      signal: "Excellent",
      battery: "92%",
      temperature: "24.5°C",
      cpuUsage: "12%",
      uptime: "5d 12h",
      firmware: "1.2.5",
      installDate: "2023-01-15",
      lastCalibration: "2023-10-05",
      lastMaintenance: {
        date: "2023-11-10",
        type: "Routine check",
      },
    },
    {
      id: "DEV-002",
      serialNumber: "SN-67890",
      name: "BOD Sensor",
      type: "bod",
      value: 35.8,
      previousValue: 32.5,
      unit: "mg/L",
      status: "warning",
      minThreshold: 0,
      maxThreshold: 30,
      lastUpdated: new Date().toISOString(),
      online: true,
      signal: "Good",
      battery: "78%",
      temperature: "23.1°C",
      cpuUsage: "15%",
      uptime: "3d 8h",
      firmware: "1.1.8",
      installDate: "2023-02-20",
      lastCalibration: "2023-09-15",
      lastMaintenance: {
        date: "2023-10-25",
        type: "Sensor cleaning",
      },
    },
    {
      id: "DEV-003",
      serialNumber: "SN-24680",
      name: "COD Sensor",
      type: "cod",
      value: 120.5,
      previousValue: 118.2,
      unit: "mg/L",
      status: "normal",
      minThreshold: 0,
      maxThreshold: 150,
      lastUpdated: new Date().toISOString(),
      online: true,
      signal: "Excellent",
      battery: "85%",
      temperature: "22.8°C",
      cpuUsage: "10%",
      uptime: "7d 3h",
      firmware: "1.3.2",
      installDate: "2023-01-05",
      lastCalibration: "2023-11-01",
      lastMaintenance: {
        date: "2023-11-05",
        type: "Firmware update",
      },
    },
    {
      id: "DEV-004",
      serialNumber: "SN-13579",
      name: "pH Meter",
      type: "ph",
      value: 8.7,
      previousValue: 8.5,
      unit: "pH",
      status: "critical",
      minThreshold: 6.5,
      maxThreshold: 8.5,
      lastUpdated: new Date().toISOString(),
      online: true,
      signal: "Fair",
      battery: "65%",
      temperature: "25.2°C",
      cpuUsage: "18%",
      uptime: "2d 14h",
      firmware: "1.2.0",
      installDate: "2023-03-10",
      lastCalibration: "2023-10-20",
      lastMaintenance: {
        date: "2023-10-22",
        type: "Electrode replacement",
      },
    },
  ]
}

// Generate historical data for charts
export function generateHistoricalData(deviceType: string, points = 24) {
  const data = []
  const now = new Date()

  // Determine time interval based on points
  let timeInterval: number
  let timeFormat: string

  if (points <= 60) {
    // 1h with minute intervals
    timeInterval = 60 * 1000 // 1 minute
    timeFormat = "HH:mm"
  } else if (points <= 72) {
    // 6h with 5-minute intervals
    timeInterval = 5 * 60 * 1000 // 5 minutes
    timeFormat = "HH:mm"
  } else if (points <= 96) {
    // 24h with 15-minute intervals
    timeInterval = 15 * 60 * 1000 // 15 minutes
    timeFormat = "HH:mm"
  } else {
    // 7d with hourly intervals
    timeInterval = 60 * 60 * 1000 // 1 hour
    timeFormat = "MM-DD HH:mm"
  }

  // Generate base values based on device type
  let baseValue: number
  let minThreshold: number
  let maxThreshold: number
  let fluctuation: number

  switch (deviceType) {
    case "flowmeter":
      baseValue = 75
      fluctuation = 10
      minThreshold = 50
      maxThreshold = 100
      break
    case "bod":
      baseValue = 25
      fluctuation = 15
      minThreshold = 0
      maxThreshold = 30
      break
    case "cod":
      baseValue = 120
      fluctuation = 30
      minThreshold = 0
      maxThreshold = 150
      break
    case "ph":
      baseValue = 7.5
      fluctuation = 1.5
      minThreshold = 6.5
      maxThreshold = 8.5
      break
    default:
      baseValue = 50
      fluctuation = 20
      minThreshold = 20
      maxThreshold = 80
  }

  // Generate data points
  for (let i = points; i >= 0; i--) {
    const date = new Date(now.getTime() - i * timeInterval)

    // Add some randomness but maintain a trend
    const trend = Math.sin(i / (points / 6)) * (fluctuation / 2)
    const random = (Math.random() - 0.5) * fluctuation
    let value = baseValue + trend + random

    // Ensure value is within reasonable bounds
    if (deviceType === "ph") {
      value = Math.min(14, Math.max(0, value))
    } else {
      value = Math.max(0, value)
    }

    data.push({
      time: formatDate(date, timeFormat),
      value: Number.parseFloat(value.toFixed(2)),
      minThreshold,
      maxThreshold,
    })
  }

  return data
}

// Generate analytics data
export function generateAnalyticsData(deviceType: string, days = 30) {
  const data = []
  const now = new Date()

  // Generate base values based on device type
  let baseValue: number
  let fluctuation: number

  switch (deviceType) {
    case "flowmeter":
      baseValue = 75
      fluctuation = 15
      break
    case "bod":
      baseValue = 25
      fluctuation = 10
      break
    case "cod":
      baseValue = 120
      fluctuation = 25
      break
    case "ph":
      baseValue = 7.5
      fluctuation = 1.2
      break
    default:
      baseValue = 50
      fluctuation = 20
  }

  // Generate data points
  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Add some randomness but maintain a trend
    const trend = Math.sin(i / (days / 8)) * (fluctuation / 2)
    const random = (Math.random() - 0.5) * fluctuation
    let value = baseValue + trend + random

    // Ensure value is within reasonable bounds
    if (deviceType === "ph") {
      value = Math.min(14, Math.max(0, value))
    } else {
      value = Math.max(0, value)
    }

    // Calculate average and previous period value
    const average = baseValue + Math.sin(i / (days / 4)) * (fluctuation / 4)
    const previousPeriod = value * (0.9 + Math.random() * 0.2)

    data.push({
      date: formatDate(date, "MM-dd"),
      value: Number.parseFloat(value.toFixed(2)),
      average: Number.parseFloat(average.toFixed(2)),
      previousPeriod: Number.parseFloat(previousPeriod.toFixed(2)),
    })
  }

  return data
}

// Generate distribution data for pie/bar charts
export function generateDistributionData(deviceType: string) {
  // Define ranges based on device type
  let ranges: { name: string; min: number; max: number }[] = []

  switch (deviceType) {
    case "flowmeter":
      ranges = [
        { name: "Very Low (<60)", min: 0, max: 60 },
        { name: "Low (60-70)", min: 60, max: 70 },
        { name: "Normal (70-80)", min: 70, max: 80 },
        { name: "High (80-90)", min: 80, max: 90 },
        { name: "Very High (>90)", min: 90, max: Number.POSITIVE_INFINITY },
      ]
      break
    case "bod":
      ranges = [
        { name: "Excellent (<15)", min: 0, max: 15 },
        { name: "Good (15-20)", min: 15, max: 20 },
        { name: "Normal (20-25)", min: 20, max: 25 },
        { name: "Concerning (25-30)", min: 25, max: 30 },
        { name: "Critical (>30)", min: 30, max: Number.POSITIVE_INFINITY },
      ]
      break
    case "cod":
      ranges = [
        { name: "Very Low (<90)", min: 0, max: 90 },
        { name: "Low (90-110)", min: 90, max: 110 },
        { name: "Normal (110-130)", min: 110, max: 130 },
        { name: "High (130-150)", min: 130, max: 150 },
        { name: "Very High (>150)", min: 150, max: Number.POSITIVE_INFINITY },
      ]
      break
    case "ph":
      ranges = [
        { name: "Very Acidic (<6.5)", min: 0, max: 6.5 },
        { name: "Slightly Acidic (6.5-7.0)", min: 6.5, max: 7.0 },
        { name: "Neutral (7.0-7.5)", min: 7.0, max: 7.5 },
        { name: "Slightly Alkaline (7.5-8.5)", min: 7.5, max: 8.5 },
        { name: "Very Alkaline (>8.5)", min: 8.5, max: 14 },
      ]
      break
    default:
      ranges = [
        { name: "Very Low", min: 0, max: 20 },
        { name: "Low", min: 20, max: 40 },
        { name: "Normal", min: 40, max: 60 },
        { name: "High", min: 60, max: 80 },
        { name: "Very High", min: 80, max: Number.POSITIVE_INFINITY },
      ]
  }

  // Generate random distribution that makes sense
  return ranges.map((range) => {
    // Center values around the "Normal" range
    let value
    if (range.name.includes("Normal")) {
      value = 35 + Math.floor(Math.random() * 15)
    } else if (range.name.includes("Low") || range.name.includes("High")) {
      value = 15 + Math.floor(Math.random() * 15)
    } else {
      value = 5 + Math.floor(Math.random() * 10)
    }

    return {
      name: range.name,
      value,
    }
  })
}

// Generate alerts
export function generateAlerts(deviceType: string, count = 5): any[] {
  const alerts = []
  const now = new Date()

  // Define alert types based on device type
  const alertTypes = {
    flowmeter: [
      { title: "Low Flow Rate", message: "Flow rate below minimum threshold", severity: "warning" },
      { title: "High Flow Rate", message: "Flow rate exceeded maximum threshold", severity: "critical" },
      { title: "Flow Rate Fluctuation", message: "Unusual fluctuations detected", severity: "warning" },
      { title: "Flow Rate Normalized", message: "Flow rate returned to normal range", severity: "info" },
    ],
    bod: [
      { title: "High BOD Level", message: "BOD level exceeded maximum threshold", severity: "critical" },
      { title: "BOD Level Rising", message: "BOD level approaching critical threshold", severity: "warning" },
      { title: "BOD Level Normalized", message: "BOD level returned to normal range", severity: "info" },
    ],
    cod: [
      { title: "High COD Level", message: "COD level exceeded maximum threshold", severity: "critical" },
      { title: "COD Level Rising", message: "COD level approaching critical threshold", severity: "warning" },
      { title: "COD Level Normalized", message: "COD level returned to normal range", severity: "info" },
    ],
    ph: [
      { title: "High pH Level", message: "pH level exceeded maximum threshold", severity: "critical" },
      { title: "Low pH Level", message: "pH level below minimum threshold", severity: "critical" },
      { title: "pH Level Rising", message: "pH level approaching upper threshold", severity: "warning" },
      { title: "pH Level Falling", message: "pH level approaching lower threshold", severity: "warning" },
      { title: "pH Level Normalized", message: "pH level returned to normal range", severity: "info" },
    ],
  }

  const deviceAlerts = alertTypes[deviceType as keyof typeof alertTypes] || alertTypes.flowmeter

  // Generate random alerts
  for (let i = 0; i < count; i++) {
    const randomAlert = deviceAlerts[Math.floor(Math.random() * deviceAlerts.length)]
    const randomTime = new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000)

    alerts.push({
      ...randomAlert,
      timestamp: randomTime.toISOString(),
      value: Math.random() * 100,
      threshold: Math.random() * 100,
      duration: `${Math.floor(Math.random() * 60)} minutes`,
      actions: Math.random() > 0.5 ? "Automatic system adjustment" : undefined,
    })
  }

  return alerts
}

