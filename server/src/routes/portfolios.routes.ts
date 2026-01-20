import { Router } from "express";
import { getPortfolio } from "../controllers/portfolios.controller";
import { getCoin } from "../controllers/coins.controller";
import { checkPortfolioExist } from "../middlewares/checkPortfolioExist";
import { checkCoinExists } from "../middlewares/checkCoinExists";
import transactionsRoutes from "./transactions.routes";

const router = Router();

router.use("/:portfolioName", checkPortfolioExist); //перевірка на portfolioName

router.get("/:portfolioName", getPortfolio);

router.use("/:portfolioName/coins/:symbol", checkCoinExists); //перевірка на coin

router.get("/:portfolioName/coins/:symbol", getCoin);

router.use("/:portfolioName/coins/:symbol/transactions", transactionsRoutes);

export default router;

// Зробити middlewares для portfolio, coins
