import type { Coin, Portfolio } from "@/types/global";

export interface DashboardResponse {
  portfolio: Portfolio<CoinShort>;
}

export type CoinShort = Omit<Coin, "transactions">;
