export interface Device {
    id: string
    name: string
    cpuUsage: number
    gpuUsage: number
    ramUsage: number
    diskUsage: number
    platform: string
    battery?: number,
    isCharging?: boolean
  }
