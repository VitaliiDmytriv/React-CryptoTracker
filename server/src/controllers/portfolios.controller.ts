import { Request, Response } from "express";
import { portfolioService } from "../services/portfolio.service";
import { portfolioWithCoinsSelect } from "../services/selections";
import { DecodedUser, PortfolioBase } from "../types/global";

export async function getPortfolio(req: Request, res: Response) {
  try {
    const { id } = req.user as DecodedUser;
    const { portfolioName } = req.portfolio as PortfolioBase;

    const portfolio = await portfolioService.getByUserId(
      id,
      portfolioName,
      portfolioWithCoinsSelect,
    );

    res.json({ portfolio });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
