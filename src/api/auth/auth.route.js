import express from "express";
import AuthController from "./auth.controller.js";
import { authenticateJWT } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/auth/users", AuthController.getUsersHandler); // Route test
router.post("/auth/register", AuthController.registerHandler);
router.post("/auth/login", AuthController.loginHandler);

router.get(
  "/auth/protected",
  authenticateJWT,
  AuthController.protectedRouteHandler
);

router.post(
  "/auth/save-publicKey",
  authenticateJWT,
  AuthController.savePublicKeyHandler
);

router.get(
  "/auth/receiver-publicKey",
  authenticateJWT,
  AuthController.getReceiverPublicKeyHandler
);

export default router;
