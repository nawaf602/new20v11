// Placeholder for Arbitrage Routes
import { Router } from "express";
import { getOpportunities, executeArbitrage } from "../controllers/arbitrageController";
// import { authenticate } from "../middleware/auth"; // تم التعليق مؤقتًا

const router = Router();

// ✅ تم تعطيل التوثيق مؤقتًا لغرض التجربة
// router.use(authenticate);

router.get("/opportunities", getOpportunities);
router.post("/execute", executeArbitrage);

export default router;
