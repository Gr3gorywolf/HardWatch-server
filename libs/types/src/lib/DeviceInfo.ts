import { Device } from "./Device"
import { Service } from "./Service"

export type DeviceInfo = Device & {
    os: string
    cpu: string
    gpu: string
    actionables: Array<{
        name: string
        action: string
    }>
    services: Array<Service>
  }
