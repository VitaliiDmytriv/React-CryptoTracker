import { Request, Response } from "express";
import { Coin, Transaction } from "../types/global";
import { prisma } from "../../prisma";
import { updTxApi } from "../schemas/transactions.schema";
import { transactionService } from "../services/transaction.service";
import { coinService } from "../services/coin.service";
import { portfolioService } from "../services/portfolio.service";
import { Portfolio } from "@prisma/client";

export async function updateTransaction(req: Request, res: Response) {
  try {
    const { id: txId } = req.transaction as Transaction;
    const { id: coinId } = req.coin as Coin;
    const { id: portfolioId } = req.portfolio as Portfolio;
    const payload = req.body as updTxApi;

    await prisma.$transaction(async (tx) => {
      await transactionService.updateTx(txId, payload, tx);
      await coinService.recalculateStats(coinId, tx);
      await portfolioService.recalculateStats(portfolioId, tx);
    });

    res.json({ ok: true });
    // res.json({ updateTx });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function deleteTransaction(req: Request, res: Response) {
  try {
    const { id: txId } = req.transaction as Transaction;
    const { id: coinId } = req.coin as Coin;
    const { id: portfolioId } = req.portfolio as Portfolio;

    let deletedTransaction = null;
    await prisma.$transaction(async (tx) => {
      deletedTransaction = await transactionService.deleteTx(txId, tx);
      await coinService.recalculateStats(coinId, tx);
      await portfolioService.recalculateStats(portfolioId, tx);
    });

    res.json({ deletedTransaction });
    // res.json({ updateTx });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
