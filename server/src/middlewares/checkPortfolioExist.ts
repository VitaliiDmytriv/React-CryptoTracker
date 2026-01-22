import { Request, Response, NextFunction } from "express";
import { DecodedUser } from "../types/global";
import { portfolioService } from "../services/portfolio.service";
import { portfolioSelectBase } from "../types/selections";

export async function checkPortfolioExist(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.user as DecodedUser;
    const { portfolioName } = req.params;

    const portfolio = await portfolioService.getByUserId(id, portfolioName, portfolioSelectBase);

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    req.portfolio = portfolio;
    next();
  } catch (err) {
    console.error(err);

    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}
