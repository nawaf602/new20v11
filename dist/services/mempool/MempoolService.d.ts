import { MempoolService, MempoolTransaction, SandwichOpportunity, SandwichExecutionResult } from "@/interfaces/Mempool";
/**
 * Mempool Service Implementation
 * Monitors Ethereum mempool for potential MEV opportunities
 */
export declare class MempoolServiceImpl implements MempoolService {
    private isMonitoring;
    private provider;
    private pendingTransactions;
    private monitoredTokens;
    private dexRouters;
    private swapFunctionSignatures;
    constructor();
    /**
     * Start monitoring mempool for specific tokens
     */
    startMonitoring(tokens: string[]): Promise<void>;
    /**
     * Stop monitoring mempool
     */
    stopMonitoring(): void;
    /**
     * Process a pending transaction
     */
    private processPendingTransaction;
    /**
     * Decode transaction data to extract function name and parameters
     */
    private decodeTransactionData;
    /**
     * Clean up transactions older than 10 minutes
     */
    private cleanupOldTransactions;
    /**
     * Get pending transactions
     */
    getPendingTransactions(): MempoolTransaction[];
    /**
     * Get potential sandwich attack opportunities
     */
    getSandwichOpportunities(minProfitThreshold: string): Promise<SandwichOpportunity[]>;
    /**
     * Execute sandwich attack
     */
    executeSandwich(opportunity: SandwichOpportunity): Promise<SandwichExecutionResult>;
}
