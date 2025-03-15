import {  APP_KEY, devices, devicesStats } from "../main";
import  {Router} from "express";
const DevicesRouter = Router()

DevicesRouter.use((req, res, next) => {
  if (req.headers["appkey"] !== APP_KEY) {
    res.status(403).json({ error: "Invalid appKey" });
    return;
  }
  next();
});
/**
 * POST /send-stats-data
 * Receives device stats and stores them in memory.
 */
DevicesRouter.post("/send-stats-data", (req, res) => {
  const { name, cpuUsage, gpuUsage, ramUsage, diskTotal, ...rest } = req.body;
  if (!name) {
    res.status(400).json({ error: "Missing device name" });
    return;
  }

  devicesStats.set(name, { name, cpuUsage, gpuUsage, ramUsage, diskTotal, ...rest });
  res.json({ message: "Device stats saved" });
});

/**
 * GET /get-devices-stats
 * Returns summarized data of all devices.
 */
DevicesRouter.get("/get-devices-stats", (req, res) => {
  const devicesSummary = Array.from(devicesStats.values()).map(({ name, cpuUsage, gpuUsage, ramUsage, diskTotal, platform }) => ({
    name,
    cpuUsage,
    gpuUsage,
    ramUsage,
    diskTotal,
    platform,
  }));

  res.json(devicesSummary);
});

/**
 * GET /get-device-stats/:deviceId
 * Returns full stats of a specific device.
 */
DevicesRouter.get("/get-device-stats/:deviceId", (req, res) => {
  const deviceName = decodeURIComponent(req.params.deviceId);
  const deviceStats = devicesStats.get(deviceName);

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
  const deviceName = decodeURIComponent(req.params.deviceId);
  const { action } = req.body;
  console.log(`Sending action "${action}" to ${deviceName}`);
  if (!devices.has(deviceName)) {
    res.status(404).json({ error: "Device not connected" });
    return
  }

  devices.get(deviceName).emit("execute-action", { action });
  res.json({ message: `Action "${action}" sent to ${deviceName}` });
});


export default DevicesRouter;
