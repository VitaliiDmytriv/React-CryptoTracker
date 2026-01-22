import Decimal from "decimal.js";
import { Transaction } from "../../types/global";

export function calcCoinStats(transactions: Transaction[]) {
  let holdings = new Decimal(0);
  let activeInvestment = new Decimal(0);
  let totalProfit = new Decimal(0);

  for (const tx of transactions) {
    if (!tx.profit) {
      holdings = holdings.plus(tx.quantity);
      activeInvestment = activeInvestment.plus(tx.totalSpent);
    } else {
      totalProfit = totalProfit.plus(tx.profit);
    }
  }

  const avgPrice = holdings.gt(0) ? activeInvestment.div(holdings) : new Decimal(0);

  return {
    holdings: holdings.toString(),
    activeInvestment: activeInvestment.toString(),
    avgPrice: avgPrice.toString(),
    totalProfit: totalProfit.toString(),
  };
}
