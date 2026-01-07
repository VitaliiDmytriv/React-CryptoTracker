import api from "@/api/axios";
import type { PortfolioResponse } from "@/types/global";
import { portfolioEND } from "@/lib/endpoints";

export async function fetchCurrentPortfolio() {
  const response = await api.get<PortfolioResponse>(portfolioEND.current);
  return response.data.portfolio;
}
