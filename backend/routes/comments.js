import express from "express";
import { getComments } from "../controllers/comments.js";

const router = express.Router();

router.get("/find:commentId", getComments);

export default router;
