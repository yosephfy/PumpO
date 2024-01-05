import express from "express";
import {
  getFollowedFeed,
  getNewFeed,
  getProfileFeed,
} from "../controllers/feed.js";

const router = express.Router();

router.get("/", getNewFeed);
router.get("/followed", getFollowedFeed);
router.get("/profile/:userId", getProfileFeed);

export default router;
