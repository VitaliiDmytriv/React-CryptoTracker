import type { CryptoPricesSimple } from "@/types/global";
import axios from "axios";

export const coingeckoApi = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  withCredentials: false,
  headers: {
    "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY,
  },
});

export async function fetchPricesSimple(coinIds: string) {
  const { data } = await coingeckoApi.get<CryptoPricesSimple>("/simple/price", {
    params: {
      vs_currencies: "usd",
      symbols: coinIds,
    },
  });

  return data;
}
