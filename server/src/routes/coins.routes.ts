import { Router } from "express";
import { checkCoinExists } from "../middlewares/checkCoinExists";
import { getCoin } from "../controllers/coins.controller";

const router = Router({ mergeParams: true });

router.use("/:symbol", checkCoinExists); //перевірка на coin

router.get("/:symbol", getCoin);

export default router;
