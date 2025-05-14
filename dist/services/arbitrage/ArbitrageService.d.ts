import { ArbitrageService, ArbitrageOpportunity, ArbitrageExecutionResult } from "@/interfaces/Arbitrage";
/**
 * Arbitrage Service Implementation
 * Detects and executes arbitrage opportunities across multiple exchanges
 */
export declare class ArbitrageServiceImpl implements ArbitrageService {
    private exchangeRates;
    private supportedExchanges;
    private commonTokens;
    constructor();
    /**
     * Initialize exchange rates with sample data
     * In a real implementation, this would fetch rates from DEXs
     */
    private initializeExchangeRates;
    /**
     * Get exchange rates for a token pair
     */
    private getExchangeRates;
    /**
     * Calculate the output amount for a given input amount and exchange rate
     */
    private calculateOutputAmount;
    /**
     * Calculate gas cost for an arbitrage transaction
     * In a real implementation, this would use the current gas price
     */
    private calculateGasCost;
    /**
     * Scan for simple arbitrage opportunities (two exchanges)
     */
    scanSimpleArbitrage(tokenA: string, tokenB: string, minProfitPercentage: number): Promise<ArbitrageOpportunity[]>;
    /**
     * Scan for triangular arbitrage opportunities
     */
    scanTriangularArbitrage(baseToken: string, intermediateTokens: string[], minProfitPercentage: number): Promise<ArbitrageOpportunity[]>;
    /**
     * Scan for multi-step arbitrage opportunities
     */
    scanMultiStepArbitrage(startToken: string, maxSteps: number, minProfitPercentage: number): Promise<ArbitrageOpportunity[]>;
    /**
     * Execute an arbitrage opportunity
     */
    executeArbitrage(opportunity: ArbitrageOpportunity): Promise<ArbitrageExecutionResult>;
}
