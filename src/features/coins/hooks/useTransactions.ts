import { data } from "@/data";

export function useTransactions(symbol: string) {
  const transactions = data[symbol].transactions;

  return { transactions };
}
