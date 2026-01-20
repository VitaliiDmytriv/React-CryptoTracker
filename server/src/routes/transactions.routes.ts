import { Router } from "express";
import { checkTransactionExist } from "../middlewares/checkTransactionExist";
import { updateTransaction } from "../controllers/transactions.controller";

const router = Router({ mergeParams: true });

router.use("/:txId", checkTransactionExist);
router.patch("/:txId", updateTransaction);

export default router;
