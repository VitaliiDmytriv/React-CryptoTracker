import { Request, Response } from "express";
import { Transaction } from "../types/global";
import { prisma } from "../../prisma";
import { createTxApi, mergeTxApi, splitTxApi, updTxApi } from "../schemas/transactions.schema";
import { transactionService } from "../services/transaction.service";
import { coinService } from "../services/coin.service";
import { portfolioService } from "../services/portfolio.service";
import { Portfolio } from "@prisma/client";
import { coinFull, coinSelectBase, transactionDecimals } from "../types/selections";
import { createBaseCoin } from "../domain/coins";
import { prepareNewTx } from "../domain/transactions/prepareNewTx";
import { parseTxToString } from "../domain/transactions";

export async function handleTransactionAction(req: Request, res: Response) {
  const { action } = req.body;
  try {
    switch (action) {
      case "edit":
        await updateTransaction(req, res);
        break;
      case "add":
        await createTransaction(req, res);
        break;
      case "merge":
        await mergeTransaction(req, res);
        break;
      case "split":
        await splitTransaction(req, res);
        break;
      default:
        return res.status(400).json({ message: "Unknown action" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function createTransaction(req: Request, res: Response) {
  try {
    const { id: portfolioId } = req.portfolio as Portfolio;
    const { payload } = req.body as createTxApi;
    const coinInfo = payload.coin;

    let coin = await coinService.getBySymbol(portfolioId, coinInfo.symbol.toUpperCase(), coinFull);

    if (!coin) {
      coin = createBaseCoin(portfolioId, coinInfo);
      await coinService.addCoin(coin, prisma);
    }

    const transaction = prepareNewTx(payload, coin.id);

    await prisma.$transaction(async (tx) => {
      await transactionService.addTx(transaction, tx);
      await coinService.recalculateStats(coin.id, tx);
      await portfolioService.recalculateStats(portfolioId, tx);
    });

    res.json({ transaction, coin });
    // res.json({ updateTx });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function updateTransaction(req: Request, res: Response) {
  try {
    const { id: txId, coinId } = req.transaction as Transaction;
    const { id: portfolioId } = req.portfolio as Portfolio;
    const { payload } = req.body as updTxApi;

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
    const { id: txId, coinId } = req.transaction as Transaction;
    const { id: portfolioId } = req.portfolio as Portfolio;

    let remainingCount = null;
    await prisma.$transaction(async (tx) => {
      await transactionService.deleteTx(txId, tx);
      remainingCount = await transactionService.getCountByCoinId(coinId, tx);
      if (remainingCount === 0) {
        await coinService.deleteCoin(coinId, tx);
      } else {
        await coinService.recalculateStats(coinId, tx);
      }
      await portfolioService.recalculateStats(portfolioId, tx);
    });

    res.json({ isCoinDeleted: remainingCount === 0 });
    // res.json({ updateTx });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function splitTransaction(req: Request, res: Response) {
  try {
    const { id: portfolioId } = req.portfolio as Portfolio;
    const { payload } = req.body as splitTxApi;

    const txFromBase = await transactionService.getByIdWithinPortfolio(payload.txId, portfolioId, {
      ...transactionDecimals,
      date: true,
    });

    if (!txFromBase) {
      return res.status(404).json({ message: "No such transaction, please try again" });
    }

    const originalTxParsed = parseTxToString(txFromBase);

    const splited = prepareNewTx({ ...originalTxParsed, ...payload.splited }, txFromBase.coinId);

    await prisma.$transaction(async (tx) => {
      await transactionService.updateTx(
        payload.txId,
        { ...originalTxParsed, quantity: payload.originalAmount },
        tx,
      );
      await transactionService.addTx(splited, tx);
      await coinService.recalculateStats(txFromBase.coinId, tx);
      await portfolioService.recalculateStats(portfolioId, tx);
    });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function mergeTransaction(req: Request, res: Response) {
  try {
    const { payload } = req.body as mergeTxApi;
    const { id: portfolioId } = req.portfolio as Portfolio;
    const { mergedTx, ids } = payload;

    const coin = await coinService.getBySymbol(
      portfolioId,
      mergedTx.symbol.toUpperCase(),
      coinSelectBase,
    );

    if (!coin) {
      return res.status(404).json({ message: "No such coin, please try again" });
    }

    const transaction = prepareNewTx(mergedTx, coin.id);

    await prisma.$transaction(async (tx) => {
      await transactionService.deleteManyTx(ids, tx);
      await transactionService.addTx(transaction, tx);

      await coinService.recalculateStats(coin.id, tx);
      await portfolioService.recalculateStats(portfolioId, tx);
    });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
