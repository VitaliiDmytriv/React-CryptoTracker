import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { RegisterSchemaType } from "../schemas/auth.schema";
import { userService } from "../services/user.service";
import { prisma } from "../../prisma";
import { portfolioService } from "../services/portfolio.service";
import jwt from "jsonwebtoken";

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
  try {
    const data = req.body as RegisterSchemaType;
    const existingUser = await userService.getByEmail(data.email, { id: true });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const user = await prisma.$transaction(async (tx) => {
      const createdUser = await userService.create(data, tx);
      await portfolioService.create("main", createdUser.id, tx);
      return createdUser;
    });

    const secretKey = process.env.JWT_SECRET as string;
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "5h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // false on dev
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 5, // час життя токена
    });

    res.status(201).json({
      user: { email: user.email, id: user.id, userName: user.userName },
      message: "User created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
