import { Router } from "express";
import { loginUser, logOutUser, registerUser } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/login", validate(loginSchema), loginUser);
router.post("/logout", logOutUser);
router.post("/register", validate(registerSchema), registerUser);

export default router;
