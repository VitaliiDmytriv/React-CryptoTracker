import { Router } from "express";
import { getMe, loginUser } from "../controllers/auth.controller";
import authenticateToken from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema } from "../schemas/login.schema";

const router = Router();

router.get("/me", authenticateToken, getMe);
router.post("/login", validate(loginSchema), loginUser);

export default router;
