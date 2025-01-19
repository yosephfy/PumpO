import express from "express";
import {
  createAchievement,
  getAchievements,
  assignAchievementToUser,
  getUserAchievements,
  updateAchievementProgress,
} from "../controllers/AchievementsController.js";

const router = express.Router();

// Create a new achievement
router.post("/", createAchievement);

// Get all achievements
router.get("/", getAchievements);

// Assign an achievement to a user
router.post("/assign", assignAchievementToUser);

// Get achievements for a user
router.get("/user/:userId", getUserAchievements);

// Update user achievement progress
router.put("/progress/:userAchievementId", updateAchievementProgress);

export default router;
