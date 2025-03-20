"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DeviceOverview } from "@/components/dashboard/device-overview"
import { DeviceDetails } from "@/components/dashboard/device-details"
import { DeviceAnalytics } from "@/components/dashboard/device-analytics"
import { DeviceAlerts } from "@/components/dashboard/device-alerts"
import { DeviceMap } from "@/components/dashboard/device-map"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDevices } from "@/hooks/use-devices"

export function DashboardView() {
  const { devices, selectedDevice, setSelectedDevice } = useDevices()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <DeviceOverview devices={devices} selectedDeviceId={selectedDevice?.id} onDeviceSelect={setSelectedDevice} />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="alerts">Alerts</TabsTrigger>
                  <TabsTrigger value="map">Map</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  {selectedDevice && <DeviceDetails device={selectedDevice} />}
                </TabsContent>
                <TabsContent value="analytics" className="space-y-4">
                  {selectedDevice && <DeviceAnalytics device={selectedDevice} />}
                </TabsContent>
                <TabsContent value="alerts" className="space-y-4">
                  {selectedDevice && <DeviceAlerts device={selectedDevice} />}
                </TabsContent>
                <TabsContent value="map" className="space-y-4">
                  <DeviceMap devices={devices} selectedDeviceId={selectedDevice?.id} />
                </TabsContent>
              </Tabs>
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

