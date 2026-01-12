import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "./columns";
import { cn } from "@/lib/utils";
import type { CoinShort } from "@/types/global";
import { TableRowsSkeleton } from "@/components/TableRowsSkeleton";

type Props = {
  data: CoinShort[];
  onRowClick: (coin: CoinShort) => void;
  isLoading: boolean;
};

export default function AssetsTable({ data, onRowClick, isLoading }: Props) {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className="table-fixed w-full min-w-max">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                className={cn(
                  " align-middle",
                  header.column.columnDef.meta?.align === "center" && "text-center",
                  header.column.columnDef.meta?.align === "left" && "text-left"
                )}
                key={header.id}
              >
                <div className="min-w-[70px]">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </div>
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRowsSkeleton columns={columns} rows={6} />
        ) : (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cn(
                    " align-middle",
                    cell.column.columnDef.meta?.align === "center" && "text-center",
                    cell.column.columnDef.meta?.align === "left" && "text-left"
                  )}
                  onClick={() => onRowClick(row.original)}
                >
                  <div className="min-w-[70px]">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
