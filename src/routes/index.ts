// Index for routes
import { Router } from "express";
import authRoutes from "./authRoutes";
import arbitrageRoutes from "./arbitrageRoutes";
import portfolioRoutes from "./portfolioRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/arbitrage", arbitrageRoutes);
router.use("/portfolio", portfolioRoutes);
// Add other routes here as needed

export default router;

