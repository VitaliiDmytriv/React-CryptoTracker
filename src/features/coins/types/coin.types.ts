export type updTx = {
  quantity: number;
  pricePerCoinBought: number;
  pricePerCoinSold: number | null;
  fees: number | null;
  date: string;
};

export type createTx = {
  name: string;
  quantity: number;
  pricePerCoinBought: number;
  fees: number | null;
  notes: string | null;
  pricePerCoinSold: null | number;
  date: string;
};

export type Modes = "add" | "edit" | "merge";

export const TransactionMode = {
  Add: "add",
  Edit: "edit",
  Merge: "merge",
} as const;
