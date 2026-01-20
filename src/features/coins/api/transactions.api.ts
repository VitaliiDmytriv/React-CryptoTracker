import { portfolioEndpoints } from "@/lib/endpoints";
import type { updTx } from "../types/coin.types";
import api from "@/api/axios";

export async function updateTransaction(
  portfolioName: string,
  symbol: string,
  txId: string,
  payload: updTx,
) {
  await api.patch(portfolioEndpoints.txUpd(portfolioName, symbol, txId), payload);
}
