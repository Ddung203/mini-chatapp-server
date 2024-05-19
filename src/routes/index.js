import express from "express";

const router = express.Router();
import authRouter from "../api/auth/auth.route.js";
router.use("/v1/api", authRouter);

export default router;
