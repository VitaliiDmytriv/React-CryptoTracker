import type { Column } from "@tanstack/react-table";
import { ArrowUpDown, MoveDown, MoveUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  // Якщо сортування для колонки вимкнено в columnDef, рендеримо просто текст
  if (!column.getCanSort()) {
    return <div className="text-xs sm:text-sm">{title}</div>;
  }

  const sortedState = column.getIsSorted();
  const isActive = !!sortedState;

  return (
    <div className={cn("flex items-center justify-center")}>
      <Button
        variant="ghost"
        size="sm"
        className={cn(isActive && "text-primary", "w-full")}
        onClick={() => column.toggleSorting(sortedState === "asc")}
      >
        <span className="text-xs sm:text-sm text-inherit">{title}</span>
        {sortedState === "desc" ? (
          <MoveDown size={10} className=" text-inherit" />
        ) : sortedState === "asc" ? (
          <MoveUp size={10} className=" text-inherit" />
        ) : (
          <ArrowUpDown className=" opacity-50" />
        )}
      </Button>
    </div>
  );
}
