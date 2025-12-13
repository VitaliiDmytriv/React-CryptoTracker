import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// interface UserPayload {
//   userId: string;
// }

export default function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const secretKey = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);

    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}
