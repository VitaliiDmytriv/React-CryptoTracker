import { fetchMarketCoins, searchCoinsWithPrice } from "../api/coins.api";
import type { CoinOption } from "../types/coin.types";
import { mapMarketCoin } from "../utils/helpFunctions";

export async function fetchGeckoCoins(search: string): Promise<CoinOption[]> {
  const query = search.trim().toLowerCase();

  if (!query) {
    const coins = await fetchMarketCoins();
    return coins.map(mapMarketCoin);
  }

  const coins = await searchCoinsWithPrice(query);

  return coins;
}
