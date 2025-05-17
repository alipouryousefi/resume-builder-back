import express, { RequestHandler } from "express";
import protect from "../middlewares/authMiddleware";
import { getUserProfile, registerUser, loginUser } from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser as RequestHandler);
router.post("/login", loginUser as RequestHandler);
router.get("/profile", protect as RequestHandler, getUserProfile as RequestHandler);

export default router;