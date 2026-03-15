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
import { useMergeTxStore } from "@/store/useMergeTxStore";
import { type Row, getSortedRowModel, type SortingState } from "@tanstack/react-table";

type Props = {
  transactions: TransactionWithCoin[];
  onRowClick: (row: Row<TransactionWithCoin>) => void;
  isLoading: boolean;
};

export function TransactionsTable({ transactions, onRowClick, isLoading }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const initialVisibility = computeInitialVisibility(columns, 639);

  const rowSelection = useMergeTxStore((s) => s.rowSelection);
  const setRowSelection = useMergeTxStore((s) => s.setRowSelection);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      columnVisibility: initialVisibility,
    },
    state: {
      rowSelection,
      sorting,
    },
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.id,
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
                  <div
                    className="min-w-[70px] text-tertiary cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
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
              <TableRow
                key={row.id}
                onClick={() => onRowClick(row)}
                className={row.getIsSelected() ? "bg-muted/50" : ""}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="align-middle text-center ">
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
