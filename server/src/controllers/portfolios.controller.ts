import { Request, Response } from "express";
import { DecodedUser } from "../types/global";
import { portfolioService } from "../services/portfolio.service";
import { portfolioWithCoinsSelect } from "../services/selections";

export async function getPortfolio(req: Request, res: Response) {
  try {
    const { id } = req.user as DecodedUser;
    const { portfolioName } = req.params;
    const portfolio = await portfolioService.getByUserId(
      id,
      portfolioName,
      portfolioWithCoinsSelect
    );
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    res.json({ portfolio });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
