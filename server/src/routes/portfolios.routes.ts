import { Router } from "express";
import { getPortfolio } from "../controllers/portfolios.controller";
import { checkPortfolioExist } from "../middlewares/checkPortfolioExist";
import transactionsRoutes from "./transactions.routes";
import coinsRoutes from "./coins.routes";

const router = Router();

router.use("/:portfolioName", checkPortfolioExist); //перевірка на portfolioName
router.get("/:portfolioName", getPortfolio);
router.use("/:portfolioName/coins", coinsRoutes);
router.use("/:portfolioName/transactions", transactionsRoutes);

export default router;
