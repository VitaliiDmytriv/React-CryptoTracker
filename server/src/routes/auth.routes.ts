import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

const email = "vitaliqq.dmutriv@gmail.com";
const password = "111111";

type LoginData = {
  email: string;
  password: string;
};

router.post("/login", (req, res) => {
  const secretKey = process.env.JWT_SECRET as string;
  const payload = req.body as LoginData;
  const isValid = payload?.email === email && payload?.password === password;
  if (isValid) {
    const token = jwt.sign({ email: payload.email }, secretKey);
    return res.json({ payload, id: "loged in", token });
  }
  res.status(401).json({ error: "Something went wrong" });
});

export default router;
