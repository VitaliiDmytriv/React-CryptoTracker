import { Request, Response } from "express";
import { DecodedUser } from "../types/global";
import { portfolioService } from "../services/portfolio.service";
import { coinService } from "../services/coin.service";
import { coinFull } from "../services/selections";

export async function getCoin(req: Request, res: Response) {
  try {
    const { id } = req.user as DecodedUser;
    const { portfolioName, symbol } = req.params;

    const portfolio = await portfolioService.getByUserId(id, portfolioName, { id: true });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const coin = await coinService.getBySymbol(portfolio.id, symbol, coinFull);
    if (!coin) return res.status(404).json({ message: "Coin not found" });

    res.json(coin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
