import { Router } from "express";
import authenticateToken from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticateToken, (req, res) => {
  res.json({ message: "Server is working ass!", user: req.user });
});

export default router;
