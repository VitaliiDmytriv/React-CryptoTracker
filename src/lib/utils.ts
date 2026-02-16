import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createDefaultTx() {
  return {
    id: "",
    coinId: "",
    quantity: "",
    pricePerCoinBought: "",
    fees: "",
    totalSpent: "",
    pricePerCoinSold: "",
    profit: "",
    notes: null,
    date: new Date().toISOString(),
    coin: {
      name: "",
      symbol: "",
      image: "",
    },
  };
}

export const ACTIONS = {
  add: "add" as const,
  edit: "edit" as const,
  merge: "merge" as const,
};
