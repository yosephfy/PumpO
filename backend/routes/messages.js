import express from "express";
import {
  getAllMessages,
  getMessagesFromUser,
  getUserMessagesList,
  sendMessage,
} from "../controllers/messages.js";

const router = express.Router();

router.get("/", getAllMessages);
router.get("/list", getUserMessagesList);
router.get("/:userId", getMessagesFromUser);
router.post("/send", sendMessage);

export default router;
