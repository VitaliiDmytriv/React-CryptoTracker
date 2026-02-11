import Decimal from "decimal.js";
import { v4 as uuidv4 } from "uuid";

export type CoinInfo = {
  symbol: string;
  name: string;
  image: string;
};

export function createBaseCoin(portfolioId: string, coinInfo: CoinInfo) {
  return {
    symbol: coinInfo.symbol.toUpperCase(),
    name: coinInfo.name,
    id: uuidv4(),
    portfolioId: portfolioId,
    totalProfit: new Decimal("0"),
    activeInvestment: new Decimal("0"),
    createdAt: new Date(),
    image: coinInfo.image,
    avgPrice: new Decimal("0"),
    holdings: new Decimal("0"),
  };
}
