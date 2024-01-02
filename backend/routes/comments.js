import express from "express";
import {
  addComment,
  deleteComment,
  getCommentsFromPost,
  getNumCommentsFromPost,
} from "../controllers/comments.js";

const router = express.Router();

router.get("/get/:postId", getCommentsFromPost);
router.get("/getnum/:postId", getNumCommentsFromPost);
router.post("/add", addComment);
router.delete("/delete/:postId", deleteComment);

export default router;
