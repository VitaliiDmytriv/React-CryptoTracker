import api from "@/api/axios";
import type { PortfolioResponse } from "@/types/global";
import { portfolioEndpoints } from "@/lib/endpoints";

export async function fetchPortfolioByName(portfolioName: string) {
  const response = await api.get<PortfolioResponse>(portfolioEndpoints.byName(portfolioName));
  return response.data.portfolio;
}
