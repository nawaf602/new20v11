// Mempool interfaces
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
  // Start monitoring mempool for specific tokens
  startMonitoring(tokens: string[]): Promise<void>;
  
  // Stop monitoring
  stopMonitoring(): void;
  
  // Get pending transactions
  getPendingTransactions(): MempoolTransaction[];
  
  // Get potential sandwich attack opportunities
  getSandwichOpportunities(
    minProfitThreshold: string
  ): Promise<SandwichOpportunity[]>;
  
  // Execute sandwich attack
  executeSandwich(
    opportunity: SandwichOpportunity
  ): Promise<SandwichExecutionResult>;
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
