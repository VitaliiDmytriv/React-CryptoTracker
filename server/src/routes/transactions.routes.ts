import { Router } from "express";
import { checkTransactionExist } from "../middlewares/checkTransactionExist";
import {
  // createTransaction,
  deleteTransaction,
  handleTransactionAction,
} from "../controllers/transactions.controller";
import { validateTxPayload } from "../middlewares/validateRequest";

const router = Router({ mergeParams: true });

router.post("/", validateTxPayload, handleTransactionAction);

router.use("/:txId", checkTransactionExist);

router.patch("/:txId", validateTxPayload, handleTransactionAction);
router.delete("/:txId", deleteTransaction);

export default router;
