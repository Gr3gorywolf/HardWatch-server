import {  DeviceStats } from "@types";
import { filterObject } from "./filterObject";

export const filterDeviceStatsData = (deviceStats: DeviceStats) => {
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
    "disk"
  ]);
}

export const filterDeviceData = (deviceStats: DeviceStats) => {
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

