import { formatPrice, formatQuantity } from "@/lib/format";
import type { TransactionWithCoin } from "@/types/global";
import { useMergedTx } from "../hooks/useMergedTx";

type Props = {
  transactions: TransactionWithCoin[];
};

export function MergedStats({ transactions }: Props) {
  const stats = useMergedTx(transactions);

  return (
    <div>
      <div>Quantity: {formatQuantity(stats.quantity)}</div>
      <div>Average Price: {formatPrice(stats.pricePerCoinBought)}</div>
    </div>
  );
}
