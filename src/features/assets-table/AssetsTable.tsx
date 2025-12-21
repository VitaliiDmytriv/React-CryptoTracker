import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Coin } from "@/types/global";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "./columns";
import { cn } from "@/lib/utils";

type Props = {
  data: Coin[];
  onRowClick: (coin: Coin) => void;
};

export default function AssetsTable({ data, onRowClick }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className="table-fixed">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                className={cn(
                  "align-middle px-3",
                  header.column.columnDef.meta?.align === "center" && "text-center",
                  header.column.columnDef.meta?.align === "left" && "text-left"
                )}
                key={header.id}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                className={cn(
                  "align-middle p-3",
                  cell.column.columnDef.meta?.align === "center" && "text-center",
                  cell.column.columnDef.meta?.align === "left" && "text-left"
                )}
                onClick={() => onRowClick(row.original)}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
