import express from "express";
import {
  addLike,
  deleteLike,
  getLikesFromPost,
  getNumLikesFromPost,
} from "../controllers/likes.js";

const router = express.Router();

router.get("/get/:postId", getLikesFromPost);
router.get("/getnum/:postId", getNumLikesFromPost);
router.post("/add", addLike);
router.delete("/delete/:postId", deleteLike);

export default router;
