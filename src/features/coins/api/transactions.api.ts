import { portfolioEndpoints } from "@/lib/endpoints";
import type { TxAPI } from "../types/coin.types";
import api from "@/api/axios";

export async function updateTransaction(
  portfolioName: string,
  symbol: string,
  txId: string,
  payload: TxAPI
) {
  // await api.patch(portfolioEndpoints.txUpd(portfolioName, symbol, txId), {
  //   data: payload,
  // });
  console.log(portfolioName, symbol, txId, payload);

  await new Promise((res) => setTimeout(res, 2000));
  return { success: true };
}
