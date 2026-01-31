import { Router } from "express";
import { checkTransactionExist } from "../middlewares/checkTransactionExist";
import { deleteTransaction, updateTransaction } from "../controllers/transactions.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { updTxSchema } from "../schemas/transactions.schema";

const router = Router({ mergeParams: true });

router.use("/:txId", checkTransactionExist);
// закінчення на /edit
router.patch("/:txId/update", validateRequest(updTxSchema), updateTransaction);
// закінчення на /delete
router.delete("/:txId/delete", deleteTransaction);

export default router;
