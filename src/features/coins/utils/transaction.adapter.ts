import type { TransactionWithCoin } from "@/types/global";
import type { Modes } from "../types/coin.types";

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
