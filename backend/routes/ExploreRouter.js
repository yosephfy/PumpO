import express from "express";
import {
  getSuggestedUsers,
  getTrendingContent,
  searchExplore,
} from "../controllers/ExploreController.js";

const router = express.Router();

// Trending Content
router.get("/trending", getTrendingContent);

// Suggested Users
router.get("/people", getSuggestedUsers);

// Search in Explore Page
router.get("/search", searchExplore);

export default router;
