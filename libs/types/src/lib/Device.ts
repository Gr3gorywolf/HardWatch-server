import { DeviceUsages } from "./DeviceUsages";

export type DeviceType = "desktop" | "laptop" | "handheld" | "server";
export type  Device = DeviceUsages & {
    id: string
    name: string
    type: DeviceType
    platform: string
  }
