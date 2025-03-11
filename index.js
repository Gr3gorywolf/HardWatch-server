const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" },
});

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

// Store device connections
const devices = new Map();

// WebSocket authentication
io.use((socket, next) => {
  const { appKey, deviceName } = socket.handshake.auth;
  if (appKey !== APP_KEY) {
    return next(new Error("Invalid appKey"));
  }
  devices.set(deviceName, socket);
  console.log(`Device connected: ${deviceName}`);
  socket.on("disconnect", () => {
    devicesStats.delete(deviceName);
    devices.delete(deviceName);
    console.log(`Device disconnected: ${deviceName}`);
  });
  next();
});

// In-memory storage for device stats
const devicesStats = new Map();

/**
 * POST /send-stats-data
 * Receives device stats and stores them in memory.
 */
app.post("/send-stats-data", (req, res) => {
  const { name, cpuUsage, gpuUsage, ramUsage, diskTotal, ...rest } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Missing device name" });
  }

  devicesStats.set(name, { name, cpuUsage, gpuUsage, ramUsage, diskTotal, ...rest });
  res.json({ message: "Device stats saved" });
});

/**
 * GET /get-devices-stats
 * Returns summarized data of all devices.
 */
app.get("/get-devices-stats", (req, res) => {
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
app.get("/get-device-stats/:deviceId", (req, res) => {
  const deviceName = decodeURIComponent(req.params.deviceId);
  const deviceStats = devicesStats.get(deviceName);

  if (!deviceStats) {
    return res.status(404).json({ error: "Device not found" });
  }

  res.json(deviceStats);
});

/**
 * POST /send-action
 * Sends an action to a specific device via WebSockets.
 */
app.post("/send-action/:deviceId", (req, res) => {
  const deviceName = decodeURIComponent(req.params.deviceId);
  const { action } = req.body;
  console.log(`Sending action "${action}" to ${deviceName}`);
  if (!devices.has(deviceName)) {
    return res.status(404).json({ error: "Device not connected" });
  }

  devices.get(deviceName).emit("execute-action", { action });
  res.json({ message: `Action "${action}" sent to ${deviceName}` });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
