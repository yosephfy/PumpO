import express from "express";
import {
  addPost,
  getPost,
  getUserPosts,
  uploadPost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/find/:postId", getPost);
router.get("/all/:userId", getUserPosts);
router.post("/add", addPost);
router.post("/upload", uploadPost);

export default router;
