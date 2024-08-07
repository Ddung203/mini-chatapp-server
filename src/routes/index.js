import express from "express";
import authRouter from "../api/auth/auth.route.js";
import conversationRouter from "../api/conversation/conversation.route.js";
import messageRouter from "../api/message/message.route.js";
import userRouter from "../api/user/user.route.js";

const router = express.Router();

router.use("/v2/api", authRouter);
router.use("/v2/api", conversationRouter);
router.use("/v2/api", messageRouter);
router.use("/v2/api", userRouter);

export default router;
