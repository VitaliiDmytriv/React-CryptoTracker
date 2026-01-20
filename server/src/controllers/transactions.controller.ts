import { Request, Response } from "express";

import { Transaction, TxUpdatePayload } from "../types/global";
import Decimal from "decimal.js";
import { prisma } from "../../prisma";

export async function updateTransaction(req: Request, res: Response) {
  try {
    const { id } = req.transaction as Transaction;

    const payload: TxUpdatePayload = req.body;

    const quantity = new Decimal(payload.quantity);
    const pxBought = new Decimal(payload.pricePerCoinBought);
    const pxSold = new Decimal(payload.pricePerCoinSold ?? 0);
    const fees = new Decimal(payload.fees ?? 0);

    const totalSpent = quantity.mul(pxBought);
    const totalProfit = payload.pricePerCoinSold
      ? quantity.mul(pxSold).minus(totalSpent).minus(fees)
      : null;
    // decimal.js .....

    const obj = {
      quantity: quantity.toString(),
      pricePerCoinBought: pxBought.toString(),
      pricePerCoinSold: pxSold.toString() === "0" ? null : pxSold.toString(),
      fees: fees ? fees.toString() : null,
      totalSpent: totalSpent.toString(),
      profit: totalProfit ? totalProfit.toString() : null,
      date: new Date(payload.date),
    };

    const updateTx = await prisma.transaction.update({
      where: { id },
      data: {
        ...obj,
      },
    });

    res.json({ updateTx });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
