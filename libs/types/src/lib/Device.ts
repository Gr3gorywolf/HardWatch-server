
export type DeviceType = "desktop" | "laptop" | "handheld" | "server";
export interface Device {
    id: string
    name: string
    type: DeviceType
    cpuUsage: number
    gpuUsage: number
    ramUsage: number
    diskUsage: number
    platform: string
    battery?: number,
    isCharging?: boolean
  }
