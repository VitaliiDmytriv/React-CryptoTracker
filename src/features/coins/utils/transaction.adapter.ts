import type { CoinInfoForTx, TransactionWithCoin } from "@/types/global";
import type { TxForm } from "./transaction.schema";

export function transactionApiToForm(tx: TransactionWithCoin) {
  return {
    quantity: tx.quantity,
    pricePerCoinBought: tx.pricePerCoinBought,
    fees: tx.fees ?? "",
    pricePerCoinSold: tx.pricePerCoinSold ?? "",
    date: tx.date.split("T")[0],
    name: tx.coin.name,
  };
}

export function mapTxToCreate(tx: TxForm, coinInfo: CoinInfoForTx) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name: _, ...txWithoutName } = tx;
  return {
    ...txWithoutName,
    coin: coinInfo,
  };
}

export type CreateTxApi = ReturnType<typeof mapTxToCreate>;
