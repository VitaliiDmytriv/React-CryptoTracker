import { fetchPricesSimple } from "@/api/coingecko.api";
import { coinGeckoKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function usePriceSimple(coinIds: string) {
  return useQuery({
    queryKey: coinGeckoKeys.prices(coinIds),
    queryFn: () => fetchPricesSimple(coinIds),
    enabled: !!coinIds,
    refetchInterval: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });
}
