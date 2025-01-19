import express from "express";
import {
  createChat,
  getChatsForUser,
  getChatDetails,
  deleteChat,
  searchChats,
  getUnreadCountByChat,
  sendMessage,
  getMessagesByChat,
  markMessageAsRead,
  deleteMessage,
  searchMessagesInChat,
  addChatParticipant,
  removeChatParticipant,
  getChatParticipants,
  updateParticipantRole,
} from "../controllers/MessagesController.js";

const router = express.Router();

// Chats
router.post("/chats", createChat);
router.get("/chats/user/:userId", getChatsForUser);
router.get("/chats/:chatId", getChatDetails);
router.delete("/chats/:chatId", deleteChat);
router.get("/chats/search", searchChats);
router.get("/chats/:chatId/unread-count", getUnreadCountByChat);

// Messages
router.post("/messages", sendMessage);
router.get("/messages/chat/:chatId", getMessagesByChat);
router.patch("/messages/:messageId/read", markMessageAsRead);
router.delete("/messages/:messageId", deleteMessage);
router.get("/messages/chat/:chatId/search", searchMessagesInChat);

// Chat Participants
router.post("/chat-participants", addChatParticipant);
router.delete("/chat-participants", removeChatParticipant);
router.get("/chat-participants/:chatId", getChatParticipants);
router.patch("/chat-participants/role", updateParticipantRole);

export default router;
