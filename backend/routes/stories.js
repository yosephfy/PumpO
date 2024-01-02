import express from "express";
import {
  addStory,
  getFollowedStories,
  getStory,
  getUserStories,
} from "../controllers/stories.js";

const router = express.Router();

router.get("/find/:storyId", getStory);
router.get("/all/:userId", getUserStories);
router.get("/followed/:userId", getFollowedStories);
router.post("/add", addStory);

export default router;
