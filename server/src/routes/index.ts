import { Router } from "express";
import authRoutes from "./auth.routes";
import portfolioRoutes from "./portfolios.routes";
import userRoutes from "./users.routes";

const router = Router();

router.use("/auth", authRoutes);

router.use("/users", userRoutes);

router.use("/users/me/portfolios", portfolioRoutes);

export default router;
