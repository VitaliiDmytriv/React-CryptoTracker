import type { CellContext } from "@tanstack/react-table";

interface NameCellData {
  image: string;
  symbol: string;
  name: string;
}

export default function NameCell<Tdata extends NameCellData, TValue>({
  row,
}: CellContext<Tdata, TValue>) {
  const { image, symbol, name } = row.original;
  return (
    <div className="flex gap-1 sm:gap-2 items-center">
      <div className="w-4 sm:w-5 shrink-0">
        <img src={image} alt={name} />
      </div>
      <div className="hidden md:block min-w-0 text-left">
        <p className="truncate">{name}</p>
      </div>
      <p className="uppercase truncate text-tertiary shrink-0">{symbol}</p>
    </div>
  );
}
