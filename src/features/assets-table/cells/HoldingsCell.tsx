import { formatQuantity } from "@/lib/format";
import type { Coin } from "@/types/global";
import type { CellContext } from "@tanstack/react-table";

export default function HoldingsCell({ row }: CellContext<Coin, number>) {
  return (
    <div>
      {formatQuantity(row.original.holdings)}
      <span className="text-[#808a9d] font-light text-xs ml-1">{row.original.symbol}</span>
    </div>
  );
}
