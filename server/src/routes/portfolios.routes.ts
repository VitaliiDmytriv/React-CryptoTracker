import { Router } from "express";
import authenticateToken from "../middlewares/auth.middleware";
import { getPortfolio } from "../controllers/portfolios.controller";
import { getCoin } from "../controllers/coins.controller";

const router = Router();

router.get("/:portfolioName", authenticateToken, getPortfolio);

router.get("/:portfolioName/coins/:symbol", authenticateToken, getCoin);

export default router;
