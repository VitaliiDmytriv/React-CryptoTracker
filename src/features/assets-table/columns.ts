import type { Coin } from "@/types/global";
import type { ColumnDef } from "@tanstack/react-table";
import NameCell from "./cells/NameCell";
import HoldingsCell from "./cells/HoldingsCell";
import { formatMoney } from "@/lib/format";

export const columns: ColumnDef<Coin>[] = [
  {
    accessorKey: "name", // ключ із об'єкта даних
    header: "Name",
    meta: { align: "left" },
    cell: NameCell,
  },
  {
    accessorKey: "activeInvestment",
    header: "Invested",
    cell: ({ getValue }) => formatMoney(getValue<number>()),
    meta: { align: "center" },
  },
  {
    accessorKey: "holdings",
    header: "Holdings",
    cell: HoldingsCell,
    meta: { align: "center" },
  },
  {
    accessorKey: "totalProfit",
    header: "Profit/Loss",
    cell: ({ getValue }) => formatMoney(getValue<number>()),
    meta: { align: "center" },
  },
];
