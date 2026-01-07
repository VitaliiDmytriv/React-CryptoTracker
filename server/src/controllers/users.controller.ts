import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { userSelectMe } from "../services/selections";
import { DecodedUser } from "../types/global";

export async function getMe(req: Request, res: Response) {
  const { id } = req.user as DecodedUser;
  const user = await userService.getById(id, userSelectMe);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ user }); // user:{ id,name,email }
}
