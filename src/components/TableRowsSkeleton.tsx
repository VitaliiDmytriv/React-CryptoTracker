import type { ColumnDef } from "@tanstack/react-table";
import { TableCell, TableRow } from "./ui/table";
import { Skeleton } from "./ui/skeleton";
type Props<T> = {
  rows: number;
  columns: ColumnDef<T>[];
};

export function TableRowsSkeleton<T>({ columns, rows }: Props<T>) {
  return Array.from({ length: rows }).map((_, rowIndex) => (
    <TableRow key={rowIndex}>
      {columns.map((_, colIndex) => (
        <TableCell key={colIndex}>
          <Skeleton className="h-5 w-full" />
        </TableCell>
      ))}
    </TableRow>
  ));
}
