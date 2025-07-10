export interface DeviceUsages {
    cpuUsage: number
    gpuUsage: number
    ramUsage: number
    diskUsage: number
    battery?: number
    isCharging?: boolean
    ram: string
    disk: string
    cpuTemp: number | null
    gpuTemp: number | null

}
