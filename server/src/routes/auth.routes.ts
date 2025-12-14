import { Router } from "express";
import { getUser, loginUser } from "../controllers/auth.controller";
import authenticateToken from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", authenticateToken, getUser);
router.post("/login", loginUser);

export default router;
