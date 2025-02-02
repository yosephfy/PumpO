import express from "express";
import {
  deleteUser,
  getUserById,
  getUserByUsername,
  getUsers,
  loginUser,
  registerUser,
  searchUsers,
  updateUser,
} from "../controllers/UsersController.js";

const router = express.Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers); // Supports query and pagination
router.get("/search", searchUsers); // New route for query-based search
router.get("/:userId", getUserById);
router.get("/username/:username", getUserByUsername);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
