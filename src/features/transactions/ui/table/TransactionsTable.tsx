import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "@/features/transactions/ui/table/columns";
import type { Transaction } from "@/types/global";
import { computeInitialVisibility } from "@/lib/tableUtils";

type Props = {
  data: Transaction[];
  onRowClick: (tr: Transaction) => void;
};

export function TransactionsTable({ data, onRowClick }: Props) {
  const initialVisibility = computeInitialVisibility(columns, 639);

  const table = useReactTable({
    data,
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
          {table.getRowModel().rows.map((row) => (
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
          ))}
        </TableBody>
      </Table>
    </>
  );
}
