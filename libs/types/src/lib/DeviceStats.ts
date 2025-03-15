import { Device } from "./Device"

export type DeviceStats = Device & {
    os: string
    cpu: string
    gpu: string
    ram: string
    disk: string
    cpuTemp: number | null
    gpuTemp: number | null
    actionables: Array<{
        name: string
        action: string
    }>
  }