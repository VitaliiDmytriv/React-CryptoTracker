import type { Coin, RouteParams, TransactionWithCoin } from "@/types/global";
import { useQuery } from "@tanstack/react-query";
import { fetchPortfolioCoin } from "../api/coins.api";
import { portfolioKeys } from "@/lib/queryKeys";

export function useCoin() {
  const { portfolioName, symbol } = useParams<RouteParams>();

  return useQuery<Coin<TransactionWithCoin>>({
    queryKey: portfolioKeys.coin(portfolioName!, symbol!),
    queryFn: () => fetchPortfolioCoin(portfolioName!, symbol!),
    staleTime: Infinity,
  });
}
