import express from "express";
import UserController from "./user.controller.js";
import { authenticateJWT } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/user/except",
  authenticateJWT,
  UserController.getAllUsersExceptUsernameHandler
);

router.post(
  "/user/set-status",
  authenticateJWT,
  UserController.setStatusUserHandler
);

export default router;
