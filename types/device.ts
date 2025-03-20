export interface Device {
  id: string
  serialNumber: string
  name: string
  type: string
  value: number
  previousValue: number
  unit: string
  status: string
  minThreshold: number
  maxThreshold: number
  lastUpdated: string
  online: boolean
  signal?: string
  battery?: string
  temperature?: string
  cpuUsage?: string
  uptime?: string
  firmware?: string
  installDate?: string
  lastCalibration?: string
  lastMaintenance?: {
    date: string
    type: string
  }
  warningLevel?: string
  criticalLevel?: string
}

