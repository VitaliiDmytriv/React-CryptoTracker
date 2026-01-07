import { formatQuantity } from "@/lib/format";
import type { CellContext } from "@tanstack/react-table";
import type { CoinShort } from "../../types/dashboard.types";

export default function HoldingsCell({ row }: CellContext<CoinShort, number>) {
  return (
    <div>
      {formatQuantity(row.original.holdings)}
      <span className="text-[#808a9d] font-light text-xs ml-1">{row.original.symbol}</span>
    </div>
  );
}
