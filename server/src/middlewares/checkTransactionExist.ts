import { Request, Response, NextFunction } from "express";
import { transactionFull } from "../types/selections";
import { transactionService } from "../services/transaction.service";

export async function checkTransactionExist(req: Request, res: Response, next: NextFunction) {
  try {
    const { txId } = req.params;

    const transaction = await transactionService.getById(txId, transactionFull);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    req.transaction = transaction;
    next();
  } catch (err) {
    console.error(err);

    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}
