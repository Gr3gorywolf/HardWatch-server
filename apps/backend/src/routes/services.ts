import { devicesStats} from "../main";
import { Router } from "express";
const ServicesRouter = Router()
/**
 * GET /get-devices-stats
 * Gets all the services of all devices
 */
ServicesRouter.get("/", (req, res) => {
  const devicesSummary = Array.from(devicesStats.values()).map((stat)=>{
    return {
      id: stat.id,
      name: stat.name,
      platform: stat.platform,
      type: stat.type,
      os: stat.os,
      services: stat.services
    };
  });

  res.json(devicesSummary);
});


export default ServicesRouter;
