import express from "express";
import {
  addSettings,
  getSettingsFromUserId,
  getSettingsFromUserIdAndKey,
  updateSettingByUserIdAndKey,
} from "../controllers/settings.js";

const router = express.Router();

router.get("/getall", getSettingsFromUserId);
router.get("/get", getSettingsFromUserIdAndKey);
router.post("/add", addSettings);
router.put("/update", updateSettingByUserIdAndKey);

export default router;
