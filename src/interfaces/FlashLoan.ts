// Flash Loan Provider Interface
export interface FlashLoanProvider {
  name: string;
  supportedTokens: string[];
  maxLoanAmount: Record<string, string>; // token address -> max amount in wei
  fee: number; // in basis points (e.g., 9 = 0.09%)
  execute(params: FlashLoanExecuteParams): Promise<FlashLoanResult>;
}

// Parameters for executing a flash loan
export interface FlashLoanExecuteParams {
  token: string; // Token address
  amount: string; // Amount in wei
  receiver: string; // Address that will receive the loan
  data: string; // Encoded data to be executed during the callback
}

// Result of a flash loan execution
export interface FlashLoanResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
  gasUsed?: string;
  effectiveGasPrice?: string;
  totalCost?: string; // Gas cost + flash loan fee
}

// Flash Loan Service Interface
export interface FlashLoanService {
  // Get all available flash loan providers
  getProviders(): FlashLoanProvider[];
  
  // Get a specific provider by name
  getProvider(name: string): FlashLoanProvider | undefined;
  
  // Execute a flash loan with the best provider (lowest fee)
  executeBestFlashLoan(params: FlashLoanExecuteParams): Promise<FlashLoanResult>;
  
  // Execute a flash loan with a specific provider
  executeFlashLoan(providerName: string, params: FlashLoanExecuteParams): Promise<FlashLoanResult>;
}
