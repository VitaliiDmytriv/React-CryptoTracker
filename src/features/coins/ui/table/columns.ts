import type { TransactionWithCoin } from "@/types/global";
import type { ColumnDef } from "@tanstack/react-table";
import { formatMoney, formatPrice } from "@/lib/format";
import QuantityCell from "./cells/QuantityCell";
import NameCell from "./cells/NameCell";

export const columns: ColumnDef<TransactionWithCoin>[] = [
  {
    id: "name",
    accessorKey: "name", // ключ із об'єкта даних
    header: "Name",
    cell: NameCell,
    meta: { align: "center", hideOnMobile: true },
  },
  {
    accessorKey: "quantity",
    id: "quantity",
    header: "Coins",
    cell: QuantityCell,
    meta: { align: "center" },
  },
  {
    accessorKey: "pricePerCoinBought",
    id: "pricePerCoinBought",
    header: "Bought",
    cell: ({ getValue }) => formatPrice(getValue<number>()),
    meta: { align: "center" },
  },
  {
    accessorKey: "pricePerCoinSold",
    id: "pricePerCoinSold",
    header: "Sold",
    cell: ({ getValue }) => formatPrice(getValue<number>()),
    meta: { align: "center" },
  },
  {
    accessorKey: "fees",
    id: "fees",
    header: "Fee",
    cell: ({ getValue }) => formatMoney(getValue<number>()),
    meta: { align: "center", hideOnMobile: true },
  },
  {
    accessorKey: "profit",
    id: "profit",
    header: "Profit",
    cell: ({ getValue }) => formatMoney(getValue<number>()),
    meta: { align: "center" },
  },
];
