import { Router } from "express";
import authenticateToken from "../middlewares/auth.middleware";
import { getMe } from "../controllers/users.controller";
import portfoliosRoutes from "./portfolios.routes";

const router = Router();
router.use(authenticateToken); // перевірка на авторизацію

router.get("/me", getMe);
router.use("/me/portfolios", portfoliosRoutes);

export default router;
