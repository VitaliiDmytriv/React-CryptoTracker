import { Request, Response } from "express";

import { Transaction } from "../types/global";
import Decimal from "decimal.js";
import { prisma } from "../../prisma";
import { updTxSchema } from "../schemas/transactions.schema";

export async function updateTransaction(req: Request, res: Response) {
  try {
    const { id } = req.transaction as Transaction;

    const data = req.body;
    const parsedData = updTxSchema.safeParse(data);
    if (!parsedData.success) {
      return res.status(400).json({
        errors: parsedData.error.flatten(),
      });
    }

    const payload = parsedData.data;

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
      fees: fees.toString() === "0" ? null : fees.toString(),
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
