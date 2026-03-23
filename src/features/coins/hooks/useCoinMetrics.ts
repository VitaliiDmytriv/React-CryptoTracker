import type { RouteParams } from "@/types/global";
import { useCoin } from "./useCoin";
import { usePriceSimple } from "@/hooks/usePriceSimple";
import Decimal from "decimal.js";

export function useCoinMetrics() {
  const { symbol } = useParams<RouteParams>();
  const { data: livePrices, isLoading: isPricesLoading } = usePriceSimple(
    symbol!.toLocaleLowerCase(),
  );
  const { data: coin, isLoading: isCoinLoading } = useCoin();

  const isLoading = isCoinLoading || isPricesLoading;

  if (isLoading || !coin || !livePrices) {
    return {
      metrics: null,
      isLoading,
      coin: null,
    };
  }
  const currentPrice = livePrices[symbol!.toLowerCase()]?.usd;
  const marketValue = new Decimal(coin.holdings).mul(currentPrice);
  const unrealizedPnL = marketValue.minus(coin.activeInvestment).toString();
  return {
    metrics: {
      marketValue: marketValue.toString(),
      quantity: coin.holdings,
      realizedPnL: coin.totalProfit,
      avgBuyPrice: coin.avgPrice,
      unrealizedPnL,
    },
    isLoading,
    coin,
  };
}
