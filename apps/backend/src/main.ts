import express from "express";
import http from "http";
import socketIo from "socket.io";
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

// CORS Middleware
app.use(cors());

app.use(express.json());

// Load appKey from config.json
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const PORT = 3400;
export const APP_KEY = config.appKey;
const USE_FRONTEND_CDN = config.useFrontendCdn;
let frontendPath = path.resolve("frontend");
let indexHtmlFile = path.join(frontendPath, "index.html");
// Store device connections
export const devices = new Map();
// In-memory storage for device stats
export const devicesStats = new Map<string, DeviceStats>();

if (USE_FRONTEND_CDN || !fs.existsSync(indexHtmlFile)) {
  frontendPath = path.resolve("assets");
  indexHtmlFile = path.join(frontendPath, "cdn-index.html");
}

// WebSocket authentication
io.use((socket, next) => {
  const { appKey, id } = socket.handshake.auth;
  if (appKey !== APP_KEY) {
    return next(new Error("Invalid appKey"));
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

//Devices api
app.use("/api/devices",DevicesRouter);

//frontend serving
app.use(express.static(frontendPath));
// client side routing management
app.get("*", (req, res) => {
  res.sendFile(indexHtmlFile);
});


// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
