import api from "@/api/axios";
import { portfolioEndpoints } from "@/lib/endpoints";

export async function fetchPortfolioCoin(portfolioName: string, symbol: string) {
  const res = await api.get(portfolioEndpoints.coin(portfolioName, symbol));
  return res.data;
}
