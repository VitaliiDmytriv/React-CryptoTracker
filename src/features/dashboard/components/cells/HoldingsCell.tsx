import { formatQuantity } from "@/lib/format";
import type { CellContext } from "@tanstack/react-table";

interface HoldingsCellData {
  holdings: string;
  symbol: string;
}

export default function HoldingsCell<Tdata extends HoldingsCellData, TValue>({
  row,
}: CellContext<Tdata, TValue>) {
  return (
    <div>
      {formatQuantity(row.original.holdings)}
      <span className="text-tertiary font-light text-xs ml-1">{row.original.symbol}</span>
    </div>
  );
}
