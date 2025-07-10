import { DeviceType } from "../Device"
import { Service } from "../Service"

export type GetServicesResponse =  {
    id: string,
    name: string,
    platform: string,
    type: DeviceType,
    os: string,
    services: Service[]
  }
