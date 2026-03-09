import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { RegisterSchemaType } from "../schemas/auth.schema";
import { userService } from "../services/user.service";

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
      maxAge: 1000 * 60 * 60 * 5, // час життя токена
    });
    res.json({ user: result.user }); // user:{ id,name,email }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export function logOutUser(req: Request, res: Response) {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 0,
    });
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}

export async function registerUser(req: Request, res: Response) {
  const data = req.body as RegisterSchemaType;
  const existingUser = await userService.getByEmail(data.email, { id: true });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  res.json(data);
}
