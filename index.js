const express = require("express");
const fs = require("fs");

const app = express();

// Load appKey from config.json
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const PORT = config.port;
const APP_KEY = config.appKey;

// Middleware to parse JSON and validate appKey
app.use(express.json());
app.use((req, res, next) => {
  if (req.headers["appkey"] !== APP_KEY) {
    return res.status(403).json({ error: "Invalid appKey" });
  }
  next();
});

// In-memory storage for device stats, including last activity timestamp
const devicesStats = new Map();
const DEVICE_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * POST /send-stats-data
 * Receives device stats and stores them in memory with a timestamp.
 */
app.post("/send-stats-data", (req, res) => {
  const { name, cpuUsage, gpuUsage, ramUsage, diskTotal, ...rest } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Missing device name" });
  }
  console.log(`Received stats from ${name}:`, req.body);

  const timestamp = Date.now();
  devicesStats.set(name, { name, cpuUsage, gpuUsage, ramUsage, diskTotal, ...rest, timestamp });
  res.json({ message: "Device stats saved" });
});

/**
 * GET /get-devices-stats
 * Returns only name, cpuUsage, gpuUsage, ramUsage, and diskTotal for each device.
 */
app.get("/get-devices-stats", (req, res) => {
  const devicesSummary = Array.from(devicesStats.values()).map(({ name, cpuUsage, gpuUsage, ramUsage, diskTotal }) => ({
    name,
    cpuUsage,
    gpuUsage,
    ramUsage,
    diskTotal,
  }));

  res.json(devicesSummary);
});

/**
 * GET /get-device-stats/:deviceId
 * Returns the complete information of a specified device.
 */
app.get("/get-device-stats/:deviceId", (req, res) => {
  const deviceName = decodeURIComponent(req.params.deviceId);
  const deviceStats = devicesStats.get(deviceName);

  if (!deviceStats) {
    return res.status(404).json({ error: "Device not found" });
  }

  res.json(deviceStats);
});

/**
 * Function to remove devices that have not sent data in the last 5 minutes.
 */
function removeInactiveDevices() {
  const now = Date.now();
  for (let [name, device] of devicesStats) {
    if (now - device.timestamp > DEVICE_TIMEOUT) {
      console.log(`Removing inactive device: ${name}`);
      devicesStats.delete(name);
    }
  }
}

// Periodically clean up inactive devices (every minute)
setInterval(removeInactiveDevices, 60 * 1000); // 1 minute interval

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
