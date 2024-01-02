import express from "express";
import { getFollowedFeed, getNewFeed } from "../controllers/feed.js";

const router = express.Router();

router.get("/", getNewFeed);
router.get("/followed", getFollowedFeed);

export default router;
