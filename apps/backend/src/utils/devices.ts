import {   DeviceInfo, DeviceUsages } from "@types";
import { filterObject } from "./filterObject";

export const filterDeviceStatsData = (deviceStats: DeviceInfo) => {
  return filterObject(deviceStats, [
    "id",
    "os",
    "type",
    "actionables",
    "battery",
    "cpuUsage",
    "diskUsage",
    "ramUsage",
    "gpu",
    "cpu",
    "ram",
    "cpuTemp",
    "gpuTemp",
    "gpuUsage",
    "isCharging",
    "name",
    "platform",
    "disk",
    "services"
  ]);
}

export const filterDeviceInfo = (deviceStats: DeviceInfo) => {
  return filterObject(deviceStats, [
    "id",
    "platform",
    "type",
    "name",
    "battery",
    "cpuUsage",
    "diskUsage",
    "ramUsage",
    "gpuUsage",
    "isCharging",
  ]);
}


export const filterDeviceUsages = (deviceUsages: DeviceUsages) => {
  return filterObject(deviceUsages, [
    "battery",
    "cpuUsage",
    "diskUsage",
    "ramUsage",
    "gpuUsage",
    "isCharging",
  ]);
}

