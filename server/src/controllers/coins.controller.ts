import { Request, Response } from "express";
import { coinSelectBase } from "../types/global";
import { coinService } from "../services/coin.service";
import { coinFull } from "../services/selections";

export async function getCoin(req: Request, res: Response) {
  try {
    const { id } = req.coin as coinSelectBase;

    const coin = await coinService.getById(id, coinFull);

    res.json(coin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
