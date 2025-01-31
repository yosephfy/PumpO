import express from "express";
import {
  getUserSettings,
  getSettingsByCategory,
  updateUserSetting,
  resetUserSetting,
  getSettingByKey,
} from "../controllers/SettingsController.js";

const router = express.Router();

// Get all settings with user overrides
router.get("/:userId", getUserSettings);

// Get settings by category
router.get("/:userId/category/:category", getSettingsByCategory);

// Get settings by key
router.get("/:userId/settingkey/:settingKey", getSettingByKey);

// Update or create a user setting
router.put("/:userId/:settingKey", updateUserSetting);

// Reset a setting to default
router.delete("/:userId/:settingKey", resetUserSetting);

export default router;
