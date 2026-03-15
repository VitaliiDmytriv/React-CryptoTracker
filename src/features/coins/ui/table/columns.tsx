import type { TransactionWithCoin } from "@/types/global";
import type { ColumnDef } from "@tanstack/react-table";
import { formatMoney, formatPrice } from "@/lib/format";
import QuantityCell from "./cells/QuantityCell";
import NameCell from "./cells/NameCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";

export const columns: ColumnDef<TransactionWithCoin>[] = [
  {
    id: "name",
    accessorKey: "name", // ключ із об'єкта даних
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: NameCell,
    meta: { align: "center", hideOnMobile: true },
    enableSorting: false,
  },
  {
    accessorKey: "quantity",
    id: "quantity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
    cell: QuantityCell,
    meta: { align: "center" },
    sortingFn: "basic",
  },
  {
    accessorKey: "pricePerCoinBought",
    id: "pricePerCoinBought",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Bought" />,
    cell: ({ getValue }) => formatPrice(getValue<string>()),
    meta: { align: "center" },
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "pricePerCoinSold",
    id: "pricePerCoinSold",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sold" />,
    cell: ({ getValue }) => formatPrice(getValue<string>()),
    meta: { align: "center" },
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "fees",
    id: "fees",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fee" />,
    enableSorting: false,
    cell: ({ getValue }) => formatMoney(getValue<string>()),
    meta: { align: "center", hideOnMobile: true },
  },
  {
    accessorKey: "profit",
    id: "profit",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Profit" />,
    cell: ({ getValue }) => formatMoney(getValue<string>()),
    meta: { align: "center" },
    sortingFn: "alphanumeric",
  },
];
