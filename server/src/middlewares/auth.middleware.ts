import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface UserPayload {
  userId: string;
}

export default function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const secretKey = process.env.JWT_SECRET as string;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log(token);

  if (!token) return res.status(401).json({ message: `Токен відсутній: ${secretKey}` });
  try {
    const user = jwt.verify(token, secretKey) as UserPayload;
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Токен недійсний", err });
  }
}
