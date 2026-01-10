import type { TransactionWithCoin } from "@/types/global";
import type { CellContext } from "@tanstack/react-table";

export default function NameCell({ row }: CellContext<TransactionWithCoin, unknown>) {
  return (
    <div className="flex gap-1 sm:gap-2 items-center justify-center">
      <div className="w-3 xs:w-4 sm:w-5 shrink-0">
        <img src={row.original.coin.image} alt="" />
      </div>
      <p className="uppercase truncate text-[#808a9d] shrink-0">{row.original.coin.symbol}</p>
    </div>
  );
}
