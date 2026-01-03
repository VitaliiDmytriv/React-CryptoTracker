import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { userService } from "../services/user.service";
import { userSelectMe } from "../services/selections";
import { DecodedUser } from "../types/global";

type LoginData = {
  email: string;
  password: string;
};

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body as LoginData;
    const result = await authService.login(email, password);
    if (!result) {
      return res.status(401).json({ error: "Incorrect password or Email" });
    }
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false, // false on dev
      sameSite: "strict",
      maxAge: 1000 * 60 * 60, // час життя токена
    });
    res.json({ user: result.user }); // user:{ id,name,email }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getMe(req: Request, res: Response) {
  const { id } = req.user as DecodedUser;
  const user = await userService.getById(id, userSelectMe);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ user }); // user:{ id,name,email }
}
