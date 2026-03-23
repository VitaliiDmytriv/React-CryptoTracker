import Decimal from "decimal.js";
import { usePortfolio } from "./usePortfolio";
import { usePriceSimple } from "../usePriceSimple";

export function usePortfolioMetrics() {
  const { data: portfolio, isLoading: isPortLoading } = usePortfolio();

  const coinSymbols = useMemo(() => {
    return portfolio?.coins.map((c) => c.symbol.toLowerCase()).join(",") || "";
  }, [portfolio]);

  const { data: livePrices, isLoading: isPricesLoading } = usePriceSimple(coinSymbols);

  const liveAssets = useMemo(() => {
    if (!portfolio || !livePrices) return [];

    return portfolio.coins.map((coin) => {
      const currentPrice = livePrices[coin.symbol.toLowerCase()]?.usd || 0;
      // актуальна ціна активів
      const marketValue = new Decimal(currentPrice).mul(coin.holdings);
      const unrealizedPnL = marketValue.minus(coin.activeInvestment);
      const unrealizedPnLPercent = new Decimal(coin.activeInvestment).greaterThan(0)
        ? unrealizedPnL.div(coin.activeInvestment).mul(100).toString()
        : "0";
      const totalPnL = unrealizedPnL.plus(coin.totalProfit).toString();
      return {
        ...coin,
        currentPrice: currentPrice.toString(),
        marketValue: marketValue.toString(),
        unrealizedPnL: unrealizedPnL.toString(),
        unrealizedPnLPercent,
        totalPnL,
      };
    });
  }, [livePrices, portfolio]);

  const metrics = liveAssets.reduce(
    (prev, curr) => {
      prev.totalPnL = prev.totalPnL.add(curr.totalPnL);
      prev.marketValue = prev.marketValue.add(curr.marketValue);
      prev.unrealizedPnL = prev.unrealizedPnL.add(curr.unrealizedPnL);
      prev.totalCostBasis = prev.totalCostBasis.add(curr.activeInvestment);
      return prev;
    },
    {
      totalPnL: new Decimal(0),
      marketValue: new Decimal(0),
      totalCostBasis: new Decimal(0),
      unrealizedPnL: new Decimal(0),
    },
  );

  const totalPnLPercent = metrics.totalCostBasis.greaterThan(0)
    ? metrics.totalPnL.div(metrics.totalCostBasis).mul(100).toString()
    : "0";

  return {
    metrics: {
      totalPnL: metrics.totalPnL.toString(),
      marketValue: metrics.marketValue.toString(),
      costBasis: portfolio?.activeInvestment ?? "0",
      unrealizedPnL: metrics.unrealizedPnL.toString(),
      totalPnLPercent,
    },
    assets: liveAssets,
    isLoading: isPortLoading || isPricesLoading,
  };
}
