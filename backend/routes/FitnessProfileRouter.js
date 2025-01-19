import express from "express";
import {
  createFitnessProfile,
  getFitnessProfileByUserId,
  updateFitnessProfile,
  deleteFitnessProfile,
} from "../controllers/FitnessProfileController.js";

const router = express.Router();

// Create a new fitness profile
router.post("/", createFitnessProfile);

// Get a fitness profile by user ID
router.get("/:userId", getFitnessProfileByUserId);

// Update a fitness profile
router.put("/:profileId", updateFitnessProfile);

// Delete a fitness profile
router.delete("/:profileId", deleteFitnessProfile);

export default router;
