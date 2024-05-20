import express from "express";
import { authenticateJWT } from "../../middleware/authMiddleware.js";
import MessageController from "./message.controller.js";

const router = express.Router();

router.post(
  "/message/create",
  authenticateJWT,
  MessageController.createMessageHandler
);

router.get(
  "/message/conversation/:conversationId",
  authenticateJWT,
  MessageController.getMessagesByConversationIdHandler
);

router.get(
  "/message/users",
  authenticateJWT,
  MessageController.getMessagesByUsersHandler
);

export default router;
