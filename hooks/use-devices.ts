"use client"

import { useState, useEffect } from "react"
import type { Device } from "@/types/device"
import { generateDevices } from "@/lib/data-utils"

export function useDevices() {
  const [devices, setDevices] = useState<Device[]>([])
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)

  // Initialize devices
  useEffect(() => {
    const initialDevices = generateDevices()
    setDevices(initialDevices)
    setSelectedDevice(initialDevices[0])
  }, [])

  // Add new device
  const addDevice = (newDevice: Partial<Device>) => {
    const device: Device = {
      ...newDevice,
      value: 0,
      previousValue: 0,
      status: "normal",
      lastUpdated: new Date().toISOString(),
      online: true,
      // Add default values for other required fields
      signal: "Good",
      battery: "100%",
      temperature: "25°C",
      cpuUsage: "0%",
      uptime: "0d 0h",
      firmware: "1.0.0",
      installDate: new Date().toISOString().split("T")[0],
      lastCalibration: new Date().toISOString().split("T")[0],
      lastMaintenance: {
        date: new Date().toISOString().split("T")[0],
        type: "Initial Setup",
      },
    } as Device

    setDevices((prev) => [...prev, device])
    setSelectedDevice(device)
  }

  // Simulate real-time updates
  useEffect(() => {
    if (devices.length === 0) return

    const interval = setInterval(() => {
      setDevices((prevDevices) =>
        prevDevices.map((device) => {
          // Simulate data updates here
          // This is a simplified version, you should implement more realistic updates
          const newValue = device.value + (Math.random() - 0.5) * 10
          return {
            ...device,
            value: Number.parseFloat(newValue.toFixed(2)),
            lastUpdated: new Date().toISOString(),
          }
        }),
      )
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [devices])

  return {
    devices,
    selectedDevice,
    setSelectedDevice,
    addDevice,
  }
}

