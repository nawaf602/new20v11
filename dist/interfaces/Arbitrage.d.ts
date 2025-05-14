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
export declare enum ArbitrageType {
    SIMPLE = "simple",
    TRIANGULAR = "triangular",
    MULTI_STEP = "multi_step"
}
export interface ExchangeRate {
    exchange: string;
    tokenIn: string;
    tokenOut: string;
    rate: string;
    liquidity: string;
    timestamp: number;
}
export interface ArbitrageService {
    scanSimpleArbitrage(tokenA: string, tokenB: string, minProfitPercentage: number): Promise<ArbitrageOpportunity[]>;
    scanTriangularArbitrage(baseToken: string, intermediateTokens: string[], minProfitPercentage: number): Promise<ArbitrageOpportunity[]>;
    scanMultiStepArbitrage(startToken: string, maxSteps: number, minProfitPercentage: number): Promise<ArbitrageOpportunity[]>;
    executeArbitrage(opportunity: ArbitrageOpportunity): Promise<ArbitrageExecutionResult>;
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
