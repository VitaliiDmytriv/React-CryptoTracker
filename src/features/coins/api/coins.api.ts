import api from "@/api/axios";
import { coingeckoApi } from "@/api/coingecko.api";
import { portfolioEndpoints } from "@/lib/endpoints";
import type { CoinGecko } from "@/types/global";
import type { SearchResponse, SearchSimplePrice } from "../types/coin.types";
import { mapSearchCoin } from "../utils/helpFunctions";

export async function fetchPortfolioCoin(portfolioName: string, symbol: string) {
  const res = await api.get(portfolioEndpoints.coin(portfolioName, symbol));
  return res.data;
}

export async function fetchMarketCoins() {
  const { data } = await coingeckoApi.get<CoinGecko[]>("/coins/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 70,
    },
  });

  return data;
}

export async function searchCoins(query: string) {
  const { data } = await coingeckoApi.get<SearchResponse>("/search", {
    params: { query },
  });

  return data.coins;
}

export async function searchCoinsWithPrice(query: string) {
  const coins = await searchCoins(query);
  const ids = coins.slice(0, 20).map((c) => c.id);

  if (ids.length === 0) {
    return [];
  }

  const { data: prices } = await coingeckoApi.get<SearchSimplePrice>("/simple/price", {
    params: {
      ids: ids.join(","),
      vs_currencies: "usd",
    },
  });

  return coins.map((c) => ({
    ...mapSearchCoin(c),
    price: prices[c.id]?.usd,
  }));
}
