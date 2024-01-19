import express from "express";
import {
  getFollowedFeed,
  getLikedFeed,
  getNewFeed,
  getProfileFeed,
} from "../controllers/feed.js";

const router = express.Router();

router.get("/", getNewFeed);
router.get("/followed", getFollowedFeed);
router.get("/liked", getLikedFeed);
router.get("/profile/:userId", getProfileFeed);

export default router;
