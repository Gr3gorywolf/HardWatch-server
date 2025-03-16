import express from "express";
import http from "http";
import socketIo, { Socket } from "socket.io";
import fs from "fs";
import cors from "cors";
import path from "path";
import DevicesRouter from "./routes/devices";
import { DeviceStats } from "@types";
export const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const PORT = 3400;
export const APP_KEY = config.appKey;
const USE_FRONTEND_CDN = config.useFrontendCdn;
let frontendPath = path.resolve("frontend");
let indexHtmlFile = path.join(frontendPath, "index.html");
export const devices = new Map<string, Socket>();
export const devicesStats = new Map<string, DeviceStats>();
if (USE_FRONTEND_CDN || !fs.existsSync(indexHtmlFile)) {
  frontendPath = path.resolve("assets");
  indexHtmlFile = path.join(frontendPath, "cdn-index.html");
}

// WebSocket handling
io.use((socket, next) => {
  const { appKey, id } = socket.handshake.auth;
  if (appKey !== APP_KEY) {
    return next(new Error("Invalid appKey"));
  }
  if (devices.has(id)) {
    devices.get(id).disconnect();
    devices.delete(id);
  }
  devices.set(id, socket);
  console.log(`Device connected: ${id}`);
  socket.on("disconnect", () => {
    devicesStats.delete(id);
    devices.delete(id);
    console.log(`Device disconnected: ${id}`);
  });
  next();
});
// Devices routes
app.use("/api/devices", DevicesRouter);
// Static serving
app.use(express.static(frontendPath));
app.get("*", (req, res) => {
  res.sendFile(indexHtmlFile);
});
// Clear disconnected devices
setInterval(() => {
  Array.from(devicesStats.keys()).forEach((deviceId) => {
    if (!devices.has(deviceId)) {
      devicesStats.delete(deviceId);
    }
  })
}, 1000 * 60);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
