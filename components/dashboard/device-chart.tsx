"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { Device } from "@/types/device"
import { generateHistoricalData } from "@/lib/data-utils"

interface DeviceChartProps {
  device: Device
  timeRange: "1h" | "6h" | "24h" | "7d"
}

export function DeviceChart({ device, timeRange }: DeviceChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Convert timeRange to number of data points
    let points = 0
    switch (timeRange) {
      case "1h":
        points = 60
        break
      case "6h":
        points = 72
        break
      case "24h":
        points = 96
        break
      case "7d":
        points = 168
        break
    }

    setData(generateHistoricalData(device.type, points))
  }, [device.type, timeRange])

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 10 }}
            tickFormatter={(value) => {
              if (timeRange === "7d") {
                return value.split(" ")[0] // Just show date for 7d
              }
              return value.split(" ")[1] // Just show time for other ranges
            }}
          />
          <YAxis domain={[Math.max(0, device.minThreshold * 0.8), device.maxThreshold * 1.2]} tick={{ fontSize: 10 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            fillOpacity={1}
            fill="url(#colorValue)"
            strokeWidth={2}
          />
          {/* Add threshold lines */}
          <Area
            type="monotone"
            dataKey="minThreshold"
            stroke="hsl(var(--warning))"
            fill="none"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
          <Area
            type="monotone"
            dataKey="maxThreshold"
            stroke="hsl(var(--destructive))"
            fill="none"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

