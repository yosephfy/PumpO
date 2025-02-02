import express from "express";
import { getUserFeed } from "../controllers/FeedController.js";

const router = express.Router();

// Route to manually trigger feed ranking update

router.get("/user-feed", getUserFeed);

export default router;
