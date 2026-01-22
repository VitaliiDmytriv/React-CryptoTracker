import Decimal from "decimal.js";
import { Coin } from "../../types/global";

export function calcPortfolioStats(coins: Coin[]) {
  const stats = coins.reduce(
    (prev, curr) => {
      return {
        totalProfit: prev.totalProfit.plus(curr.totalProfit),
        activeInvestment: prev.activeInvestment.plus(curr.activeInvestment),
      };
    },
    {
      totalProfit: new Decimal(0),
      activeInvestment: new Decimal(0),
    },
  );

  return {
    totalProfit: stats.totalProfit.toString(),
    activeInvestment: stats.activeInvestment.toString(),
  };
}
