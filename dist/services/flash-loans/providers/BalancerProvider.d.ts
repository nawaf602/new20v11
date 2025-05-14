import { FlashLoanProvider, FlashLoanExecuteParams, FlashLoanResult } from "@/interfaces/FlashLoan";
/**
 * Balancer Flash Loan Provider Implementation
 */
export declare class BalancerFlashLoanProvider implements FlashLoanProvider {
    readonly name = "Balancer";
    readonly supportedTokens: string[];
    readonly maxLoanAmount: Record<string, string>;
    readonly fee = 0;
    private readonly vaultAddress;
    private readonly vaultContract;
    constructor();
    /**
     * Initialize the list of supported tokens and their max loan amounts
     */
    private initializeSupportedTokens;
    /**
     * Execute a flash loan through Balancer
     */
    execute(params: FlashLoanExecuteParams): Promise<FlashLoanResult>;
}
