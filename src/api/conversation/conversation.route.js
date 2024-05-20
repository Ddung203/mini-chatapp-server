import express from "express";
import { authenticateJWT } from "../../middleware/authMiddleware.js";
import ConversationController from "./conversation.controller.js";

const router = express.Router();

router.post(
  "/conversation/create",
  authenticateJWT,
  ConversationController.createConversationHandler
);

router.post(
  "/conversation/find",
  authenticateJWT,
  ConversationController.getConversationHandler
);

export default router;
