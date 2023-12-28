import express from "express";
import {
  getUserById,
  getUserByUsername,
  getUserByEmail,
  updateUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/findById/:userId", getUserById);
router.get("/findByUsername/:username", getUserByUsername);
router.get("/findbyEmail/:email", getUserByEmail);

router.put("/update", updateUser);

export default router;
