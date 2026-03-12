import { useQuery } from "@tanstack/react-query";
import { fetchGeckoCoins } from "../service/coinGecko.service";

export const useGeckoCoins = (search: string) =>
  useQuery({
    queryKey: ["coins", search],
    queryFn: () => fetchGeckoCoins(search),
    staleTime: 1000 * 30,
  });
