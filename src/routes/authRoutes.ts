import express, { Request, RequestHandler, Response } from "express";
import protect from "../middlewares/authMiddleware";
import { getUserProfile, registerUser, loginUser } from "../controllers/authController";
import upload from "../middlewares/uploadMiddleware";

const router = express.Router();

router.post("/register", registerUser as RequestHandler);
router.post("/login", loginUser as RequestHandler);
router.get("/profile", protect as RequestHandler, getUserProfile as RequestHandler);


router.post("/upload-image", upload.single("image"), ((req: Request, res: Response): void => {
    if (!req.file) {
        res.status(400).json({ message: "No image uploaded" });
        return;
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.json({ imageUrl });
}) as RequestHandler);
export default router;