import { DeviceInfo, DeviceUsages } from "@types";
import {  devices, devicesStats } from "../main";
import { Router } from "express";
import { filterDeviceInfo, filterDeviceStatsData, filterDeviceUsages } from "../utils/devices";
const DevicesRouter = Router()
/**
 * POST /send-stats-data
 * Receives device stats and stores them in memory.
 */
DevicesRouter.post("/send-stats-data", (req, res) => {
  const {id } = req.body as DeviceInfo;
  if (!id) {
    res.status(400).json({ error: "Missing device id" });
    return;
  }
  const filteredData = filterDeviceStatsData(req.body);
  devicesStats.set(id, filteredData);
  res.json({ message: "Device stats saved" });
});

/**
 * POST /send-device-usage
 * Receives device specific usage and stores them in memory.
 */
DevicesRouter.post("/send-device-usage", (req, res) => {
  const {id } = req.body as DeviceUsages & { id: string };
  if (!id) {
    res.status(400).json({ error: "Missing device id" });
    return;
  }
  if (!devicesStats.has(id)) {
    res.status(404).json({ error: "Device not found" });
    return;
  }
  const newUsages = filterDeviceUsages(req.body);
  devicesStats.set(id, { ...devicesStats.get(id), ...newUsages });
  res.json({ message: "Device stats saved" });
});

/**
 * GET /get-devices-stats
 * Returns summarized data of all devices.
 */
DevicesRouter.get("/get-devices-stats", (req, res) => {
  const devicesSummary = Array.from(devicesStats.values()).map((stat)=>filterDeviceInfo(stat));

  res.json(devicesSummary);
});

/**
 * GET /get-device-stats/:deviceId
 * Returns full stats of a specific device.
 */
DevicesRouter.get("/get-device-stats/:deviceId", (req, res) => {
  const deviceId = decodeURIComponent(req.params.deviceId);
  const deviceStats = devicesStats.get(deviceId);

  if (!deviceStats) {
    res.status(404).json({ error: "Device not found" });
    return
  }

  res.json(deviceStats);
});

/**
 * POST /send-action
 * Sends an action to a specific device via WebSockets.
 */
DevicesRouter.post("/send-action/:deviceId", (req, res) => {
  const deviceId = decodeURIComponent(req.params.deviceId);
  const { action } = req.body;
  console.log(`Sending action "${action}" to ${deviceId}`);
  if (!devices.has(deviceId)) {
    res.status(404).json({ error: "Device not connected" });
    return
  }

  devices.get(deviceId).emit("execute-action", { action });
  res.json({ message: `Action "${action}" sent to ${deviceId}` });
});


export default DevicesRouter;
