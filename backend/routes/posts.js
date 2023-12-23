import express from "express";
import { getPost } from "../controllers/posts.js";

const router = express.Router();

router.get("/find:postId", getPost);

export default router;
