import { Router } from "express";
import authenticateToken from "../middlewares/auth.middleware";
import { getCurrentPortfolio } from "../controllers/portfolios.controller";

const router = Router();

router.get("/current", authenticateToken, getCurrentPortfolio);

export default router;
