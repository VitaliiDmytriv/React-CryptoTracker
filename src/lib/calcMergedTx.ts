import type { TransactionWithCoin } from "@/types/global";
import type { RowSelectionState } from "@tanstack/react-table";
import Decimal from "decimal.js";

export function calcMergedTx(transactions: TransactionWithCoin[], rowSelection: RowSelectionState) {
  const result = transactions
    .filter((tx) => rowSelection[tx.id])
    .reduce(
      (acc, cur) => {
        acc.fees = acc.fees.add(cur.fees || 0);
        acc.quantity = acc.quantity.add(cur.quantity);
        acc.totalSpent = acc.totalSpent.add(cur.totalSpent);
        return acc;
      },
      { quantity: new Decimal(0), totalSpent: new Decimal(0), fees: new Decimal(0) },
    );

  const pricePerCoinBought = result.quantity.isZero()
    ? "0"
    : result.totalSpent.div(result.quantity).toString();

  const fees = result.fees.isZero() ? "" : result.fees.toString();
  return {
    quantity: result.quantity.toString(),
    totalSpent: result.totalSpent.toString(),
    fees,
    pricePerCoinBought,
  };
}
