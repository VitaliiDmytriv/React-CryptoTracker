import type { Coin } from "@/types/global";
import type { CellContext } from "@tanstack/react-table";

export default function NameCell({ row }: CellContext<Coin, string>) {
  const { image, symbol, name } = row.original;
  return (
    <div className="flex gap-1 sm:gap-2 items-center">
      <div className="w-4 sm:w-5 shrink-0">
        <img src={image} alt="" />
      </div>
      <div className="hidden md:block min-w-0 text-left">
        <p className="truncate">{name}</p>
      </div>
      <p className="uppercase truncate text-[#808a9d] shrink-0">{symbol}</p>
    </div>
  );
}
