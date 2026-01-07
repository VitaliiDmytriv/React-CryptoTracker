import { Router } from "express";
import authenticateToken from "../middlewares/auth.middleware";
import { getMe } from "../controllers/users.controller";

const router = Router();

router.get("/me", authenticateToken, getMe);

export default router;
