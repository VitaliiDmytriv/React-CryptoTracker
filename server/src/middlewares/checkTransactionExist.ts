import { Request, Response, NextFunction } from "express";
import { transactionFull } from "../types/selections";
import { transactionService } from "../services/transaction.service";
import { PortfolioBase } from "../types/global";

export async function checkTransactionExist(req: Request, res: Response, next: NextFunction) {
  try {
    const { txId } = req.params;
    const { id: portfolioId } = req.portfolio as PortfolioBase;

    const transaction = await transactionService.getByIdWithinPortfolio(
      txId,
      portfolioId,
      transactionFull,
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    req.transaction = transaction;
    next();
  } catch (err) {
    console.error(err);

    return res.status(404).json({ error: "Unauthorized: Invalid token" });
  }
}
