export interface MempoolTransaction {
    hash: string;
    from: string;
    to: string;
    value: string;
    gasPrice: string;
    gasLimit: string;
    nonce: number;
    data: string;
    blockNumber?: number;
    timestamp: number;
    decodedFunction?: {
        name: string;
        params: Record<string, any>;
    };
}
export interface SandwichOpportunity {
    id: string;
    targetTransaction: MempoolTransaction;
    targetPool: string;
    tokenIn: string;
    tokenOut: string;
    estimatedProfit: string;
    frontrunGasPrice: string;
    backrunGasPrice: string;
    confidence: number;
    timestamp: number;
}
export interface MempoolService {
    startMonitoring(tokens: string[]): Promise<void>;
    stopMonitoring(): void;
    getPendingTransactions(): MempoolTransaction[];
    getSandwichOpportunities(minProfitThreshold: string): Promise<SandwichOpportunity[]>;
    executeSandwich(opportunity: SandwichOpportunity): Promise<SandwichExecutionResult>;
}
export interface SandwichExecutionResult {
    success: boolean;
    frontrunTxHash?: string;
    backrunTxHash?: string;
    error?: string;
    profit?: string;
    gasUsed?: string;
    totalCost?: string;
}
