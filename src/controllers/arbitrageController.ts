import { Request, Response } from "express";
import { arbitrageService } from "../services/arbitrage"; // ✅ استيراد الخدمة الفعلية

// دالة الحصول على فرص المراجحة (وهمية للتجربة)
export const getOpportunities = async (req: Request, res: Response) => {
  const dummyOpportunities = [
    {
      id: 1,
      token: "ETH",
      profit: 1.2,
      strategy: "flashloan",
      route: ["Uniswap", "Sushiswap"]
    },
    {
      id: 2,
      token: "DAI",
      profit: 0.8,
      strategy: "wallet",
      route: ["Balancer", "Curve"]
    }
  ];

  res.status(200).json({ opportunities: dummyOpportunities });
};

// ✅ دالة تنفيذ المراجحة الحقيقية
export const executeArbitrage = async (req: Request, res: Response) => {
  try {
    const result = await arbitrageService.scanAndExecuteArbitrageOpportunities();

    res.status(200).json({
      message: "✅ تمت عملية المراجحة بنجاح",
      result
    });
  } catch (error) {
    console.error("❌ خطأ أثناء تنفيذ المراجحة:", error);
    res.status(500).json({ message: "❌ فشل في تنفيذ عملية المراجحة", error });
  }
};
