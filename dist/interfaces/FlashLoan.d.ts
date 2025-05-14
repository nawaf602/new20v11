export interface FlashLoanProvider {
    name: string;
    supportedTokens: string[];
    maxLoanAmount: Record<string, string>;
    fee: number;
    execute(params: FlashLoanExecuteParams): Promise<FlashLoanResult>;
}
export interface FlashLoanExecuteParams {
    token: string;
    amount: string;
    receiver: string;
    data: string;
}
export interface FlashLoanResult {
    success: boolean;
    transactionHash?: string;
    error?: string;
    gasUsed?: string;
    effectiveGasPrice?: string;
    totalCost?: string;
}
export interface FlashLoanService {
    getProviders(): FlashLoanProvider[];
    getProvider(name: string): FlashLoanProvider | undefined;
    executeBestFlashLoan(params: FlashLoanExecuteParams): Promise<FlashLoanResult>;
    executeFlashLoan(providerName: string, params: FlashLoanExecuteParams): Promise<FlashLoanResult>;
}
