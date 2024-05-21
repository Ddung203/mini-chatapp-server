import express from "express";
import AuthController from "./auth.controller.js";
import { authenticateJWT } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/auth/refreshToken", AuthController.refreshTokenHandler);

router.get("/auth/users", AuthController.getUsersHandler); // Route test
router.post("/auth/register", AuthController.registerHandler);
router.post("/auth/login", AuthController.loginHandler);

router.get(
  "/auth/protected",
  authenticateJWT,
  AuthController.protectedRouteHandler
);

export default router;
