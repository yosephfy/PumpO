import express from "express";
import {
  addSettings,
  getSettingsFromUserId,
  getSettingsFromUserIdAndName,
  updateSettingByUserIdAndName,
} from "../controllers/settings.js";

const router = express.Router();

router.get("/getall", getSettingsFromUserId);
router.get("/get/:val", getSettingsFromUserIdAndName);
router.post("/add", addSettings);
router.put("/update", updateSettingByUserIdAndName);

export default router;
