"use client"

import { useState } from "react"
import { MapPin, Navigation } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Device } from "@/types/device"

interface DeviceMapProps {
  devices: Device[]
  selectedDeviceId?: string
}

export function DeviceMap({ devices, selectedDeviceId }: DeviceMapProps) {
  const [selectedPin, setSelectedPin] = useState<string | null>(selectedDeviceId || null)

  // In a real application, you would use a mapping library like Leaflet or Google Maps
  // This is a simplified representation
  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Locations</CardTitle>
        <CardDescription>Geographic distribution of monitoring devices</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative h-[500px] w-full bg-muted overflow-hidden">
          {/* Simplified map representation */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=800')] bg-cover bg-center opacity-50" />

          {/* Device pins */}
          {devices.map((device, index) => {
            // Generate pseudo-random positions for demo
            const top = 20 + ((index * 73) % 400)
            const left = 30 + ((index * 121) % 700)

            const isSelected = selectedPin === device.id

            return (
              <div
                key={device.id}
                className={`absolute cursor-pointer transition-all duration-200 ${
                  isSelected ? "z-10 scale-125" : "z-0 hover:scale-110"
                }`}
                style={{ top: `${top}px`, left: `${left}px` }}
                onClick={() => setSelectedPin(device.id)}
              >
                <div className="relative">
                  <MapPin
                    className={`h-8 w-8 ${
                      device.status === "normal"
                        ? "text-green-500"
                        : device.status === "warning"
                          ? "text-yellow-500"
                          : "text-red-500"
                    }`}
                  />
                  {isSelected && (
                    <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-lg" />
                  )}
                </div>

                {isSelected && (
                  <Card className="absolute -left-[100px] -top-[120px] w-[200px]">
                    <CardHeader className="p-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{device.name}</CardTitle>
                        <Badge
                          variant={
                            device.status === "normal"
                              ? "outline"
                              : device.status === "warning"
                                ? "warning"
                                : "destructive"
                          }
                        >
                          {device.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-xs">ID: {device.id}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Value:</span>
                          <span>
                            {device.value} {device.unit}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Location:</span>
                          <span>Site {index + 1}</span>
                        </div>
                        <Button size="sm" className="mt-2 w-full">
                          <Navigation className="mr-2 h-3 w-3" />
                          Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

