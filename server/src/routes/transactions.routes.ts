import { Router } from "express";
import { checkTransactionExist } from "../middlewares/checkTransactionExist";
import { updateTransaction } from "../controllers/transactions.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { updTxSchema } from "../schemas/transactions.schema";

const router = Router({ mergeParams: true });

router.use("/:txId", checkTransactionExist);
router.patch("/:txId", validateRequest(updTxSchema), updateTransaction);

export default router;
