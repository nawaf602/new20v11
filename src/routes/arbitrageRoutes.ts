// Placeholder for Arbitrage Routes
import { Router } from "express";
import { getOpportunities, executeArbitrage } from "../controllers/arbitrageController";
import { authenticate } from "../middleware/auth"; // Corrected import name

const router = Router();

// Apply authentication middleware
router.use(authenticate);

router.get("/opportunities", getOpportunities);
router.post("/execute", executeArbitrage);

export default router;

