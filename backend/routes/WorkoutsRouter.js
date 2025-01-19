import express from "express";
import {
  createWorkoutPlan,
  getAllWorkoutPlans,
  getWorkoutPlanById,
  searchWorkoutPlans,
  getWorkoutPlansByUser,
  filterWorkoutPlansByDuration,
  updateWorkoutPlan,
  deleteWorkoutPlan,
  duplicateWorkoutPlan,
  getFeaturedWorkoutPlans,
  getWorkoutPlansByTags,
  getRecentWorkoutPlans,
  addExerciseToWorkoutPlan,
  getAllExercisesInWorkoutPlan,
  updateExerciseInWorkoutPlan,
  removeExerciseFromWorkoutPlan,
  reorderExercisesInWorkoutPlan,
  bulkAddExercisesToWorkoutPlan,
  getTotalWorkoutDuration,
  checkIfExerciseExistsInWorkoutPlan,
} from "../controllers/WorkoutController.js";

const router = express.Router();

// Workout Plan Routes
router.post("/", createWorkoutPlan);
router.get("/", getAllWorkoutPlans);
router.get("/user", getWorkoutPlansByUser);
router.get("/:workoutId", getWorkoutPlanById);
router.get("/search", searchWorkoutPlans);
router.get("/filter/duration", filterWorkoutPlansByDuration);
router.put("/:workoutId", updateWorkoutPlan);
router.delete("/:workoutId", deleteWorkoutPlan);
router.post("/duplicate/:workoutId", duplicateWorkoutPlan);
router.get("/featured", getFeaturedWorkoutPlans);
router.get("/tags", getWorkoutPlansByTags);
router.get("/recent", getRecentWorkoutPlans);

// Workout Exercise Routes
router.post("/:workoutId/exercises", addExerciseToWorkoutPlan);
router.get("/:workoutId/exercises", getAllExercisesInWorkoutPlan);
router.put("/:workoutId/exercises/:exerciseId", updateExerciseInWorkoutPlan);
router.delete(
  "/:workoutId/exercises/:exerciseId",
  removeExerciseFromWorkoutPlan
);
router.patch("/:workoutId/exercises/reorder", reorderExercisesInWorkoutPlan);
router.post("/:workoutId/exercises/bulk", bulkAddExercisesToWorkoutPlan);
router.get("/:workoutId/total-duration", getTotalWorkoutDuration);
router.get(
  "/:workoutId/exercises/:exerciseId/exists",
  checkIfExerciseExistsInWorkoutPlan
);

export default router;
