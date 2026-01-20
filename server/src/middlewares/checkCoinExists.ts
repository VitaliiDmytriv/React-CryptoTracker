import { Request, Response, NextFunction } from "express";
import { PortfolioBase } from "../types/global";
import { coinSelectBase } from "../services/selections";
import { coinService } from "../services/coin.service";

export async function checkCoinExists(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: portfolioId } = req.portfolio as PortfolioBase;
    const { symbol } = req.params;

    const coin = await coinService.getBySymbol(portfolioId, symbol, coinSelectBase);

    if (!coin) {
      return res.status(404).json({ message: "Coin not found" });
    }

    req.coin = coin;
    next();
  } catch (err) {
    console.error(err);

    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}
