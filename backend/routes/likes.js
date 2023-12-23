import express from "express";
import { getLikes } from "../controllers/likes.js";

const router = express.Router();

router.get("/find:likeId", getLikes);

export default router;
