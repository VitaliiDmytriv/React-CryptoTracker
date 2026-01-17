import type { TransactionWithCoin } from "@/types/global";
import type { updTxOutputForm } from "./transaction.schema";
import type { Modes, updTx } from "../types/coin.types";

export function transactionUpdFormToApi(tx: updTxOutputForm): updTx {
  return {
    quantity: tx.quantity,
    pricePerCoinBought: tx.pricePerCoinBought,
    fees: tx.fees === "" ? null : tx.fees,
    pricePerCoinSold: tx.pricePerCoinSold === "" ? null : tx.pricePerCoinSold,
    date: tx.date,
  };
}

export function transactionApiToForm(tx: TransactionWithCoin, mode: Modes) {
  return {
    quantity: tx.quantity,
    pricePerCoinBought: tx.pricePerCoinBought,
    fees: tx.fees ?? "",
    pricePerCoinSold: tx.pricePerCoinSold ?? "",
    date: tx.date.split("T")[0],
    ...(mode === "add" && { name: tx.coin.name }),
  };
}
