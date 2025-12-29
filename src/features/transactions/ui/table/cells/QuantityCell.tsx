import { formatQuantity } from "@/lib/format";
import type { Transaction } from "@/types/global";
import type { CellContext } from "@tanstack/react-table";

export default function QuantityCell({ row }: CellContext<Transaction, unknown>) {
  return (
    <div className="flex items-center">
      <div className="hidden xs:block md:hidden w-3 xs:w-4 sm:w-5 shrink-0">
        <img src={row.original.image} alt="" />
      </div>
      <p className="m-auto">{formatQuantity(row.original.quantity as number)}</p>
    </div>
  );
}
