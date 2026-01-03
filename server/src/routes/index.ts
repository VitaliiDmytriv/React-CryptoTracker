import { Router } from "express";
import homeRoutes from "./home.routes";
import authRoutes from "./auth.routes";
import dashboardRoutes from "./dashboard.routes";

const router = Router();

router.use("/", homeRoutes);
router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
