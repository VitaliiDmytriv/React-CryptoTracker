import type { ColumnDef } from "@tanstack/react-table";
import NameCell from "./cells/NameCell";
import HoldingsCell from "./cells/HoldingsCell";
import { formatMoney } from "@/lib/format";
import type { CoinShort } from "@/types/global";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";

export const columns: ColumnDef<CoinShort>[] = [
  {
    accessorKey: "name", // ключ із об'єкта даних
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    meta: { align: "left" },
    enableSorting: false,
    cell: NameCell,
  },
  {
    accessorKey: "activeInvestment",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Invested" />,
    cell: ({ getValue }) => formatMoney(getValue<string>()),
    meta: { align: "center" },
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "holdings",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Holdings" />,
    cell: HoldingsCell,
    meta: { align: "center" },
    enableSorting: false,
  },
  {
    accessorKey: "totalProfit",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Profit/Loss" />,
    cell: ({ getValue }) => formatMoney(getValue<string>()),
    meta: { align: "center" },
    sortingFn: "alphanumeric",
  },
];
