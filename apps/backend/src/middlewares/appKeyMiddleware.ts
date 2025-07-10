import { APP_KEY } from "../main";

export const appKeyMiddleware = (req, res, next) => {
  if (req.headers["appkey"] !== APP_KEY) {
    res.status(403).json({ error: "Invalid appKey" });
    return;
  }
  next();
}
