// Arbitrage interfaces
export interface ArbitrageOpportunity {
  id: string;
  type: ArbitrageType;
  sourceExchange: string;
  targetExchange: string;
  intermediateExchanges?: string[];
  tokenPath: string[];
  inputAmount: string;
  expectedOutputAmount: string;
  expectedProfit: string;
  expectedProfitPercentage: string;
  gasCost: string;
  netProfit: string;
  timestamp: number;
  confidence: number;
  executionParams?: any;
}

export enum ArbitrageType {
  SIMPLE = 'simple',
  TRIANGULAR = 'triangular',
  MULTI_STEP = 'multi_step'
}

export interface ExchangeRate {
  exchange: string;
  tokenIn: string;
  tokenOut: string;
  rate: string; // Rate in tokenOut per tokenIn
  liquidity: string; // Available liquidity in tokenIn
  timestamp: number;
}

export interface ArbitrageService {
  // Scan for simple arbitrage opportunities (two exchanges)
  scanSimpleArbitrage(
    tokenA: string,
    tokenB: string,
    minProfitPercentage: number
  ): Promise<ArbitrageOpportunity[]>;
  
  // Scan for triangular arbitrage opportunities
  scanTriangularArbitrage(
    baseToken: string,
    intermediateTokens: string[],
    minProfitPercentage: number
  ): Promise<ArbitrageOpportunity[]>;
  
  // Scan for multi-step arbitrage opportunities
  scanMultiStepArbitrage(
    startToken: string,
    maxSteps: number,
    minProfitPercentage: number
  ): Promise<ArbitrageOpportunity[]>;
  
  // Execute an arbitrage opportunity
  executeArbitrage(
    opportunity: ArbitrageOpportunity
  ): Promise<ArbitrageExecutionResult>;
}

export interface ArbitrageExecutionResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
  gasUsed?: string;
  effectiveGasPrice?: string;
  actualProfit?: string;
  actualProfitPercentage?: string;
  executionTime?: number;
}
