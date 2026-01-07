import { Router } from "express";
import { loginUser } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema } from "../schemas/login.schema";

const router = Router();

router.post("/login", validate(loginSchema), loginUser);

export default router;
