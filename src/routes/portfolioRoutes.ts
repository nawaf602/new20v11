// Placeholder for Portfolio Routes
import { Router } from "express";
import { getPortfolio, addWallet } from "../controllers/portfolioController";
import { authenticate } from "../middleware/auth"; // Corrected import name

const router = Router();

// Apply authentication middleware
router.use(authenticate);

router.get("/", getPortfolio);
router.post("/wallets", addWallet);

export default router;

