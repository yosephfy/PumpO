import express from "express";
import {
  createExercise,
  getAllExercises,
  getExerciseById,
  searchExercises,
  filterExercisesByCategory,
  getExercisesByMuscleGroup,
  getExercisesByEquipment,
  updateExercise,
  deleteExercise,
  getPopularExercises,
} from "../controllers/ExercisesController.js";

const router = express.Router();

// Routes
router.post("/", createExercise); // Create an exercise
router.get("/", getAllExercises); // Get all exercises
router.get("/:exerciseId", getExerciseById); // Get exercise by ID
router.get("/search", searchExercises); // Search exercises by keyword
router.get("/filter/category", filterExercisesByCategory); // Filter by category
router.get("/filter/muscle-group", getExercisesByMuscleGroup); // Filter by muscle group
router.get("/filter/equipment", getExercisesByEquipment); // Filter by equipment
router.put("/:exerciseId", updateExercise); // Update an exercise
router.delete("/:exerciseId", deleteExercise); // Delete an exercise
router.get("/popular", getPopularExercises); // Get popular exercises

export default router;
