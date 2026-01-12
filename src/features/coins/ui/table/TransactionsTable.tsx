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
import type { TransactionWithCoin } from "@/types/global";
import { computeInitialVisibility } from "@/lib/tableUtils";
import { useResponsiveColumns } from "@/hooks/useResponsiveColumns";
import { TableRowsSkeleton } from "@/components/TableRowsSkeleton";

type Props = {
  transactions: TransactionWithCoin[];
  onRowClick: (tr: TransactionWithCoin) => void;
  isLoading: boolean;
};

export function TransactionsTable({ transactions, onRowClick, isLoading }: Props) {
  const initialVisibility = computeInitialVisibility(columns, 639);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnVisibility: initialVisibility,
    },
  });

  useResponsiveColumns(table, 639);

  return (
    <>
      <Table className="table-fixed w-full min-w-max">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead className="align-middle text-center" key={header.id}>
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
            <TableRowsSkeleton
              columns={table
                .getAllColumns()
                .filter((col) => table.getState().columnVisibility[col.id])}
              rows={5}
            />
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="align-middle text-center "
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
    </>
  );
}
