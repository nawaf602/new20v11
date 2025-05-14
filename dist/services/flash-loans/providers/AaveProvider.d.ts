import { FlashLoanProvider, FlashLoanExecuteParams, FlashLoanResult } from "@/interfaces/FlashLoan";
/**
 * Aave Flash Loan Provider Implementation
 */
export declare class AaveFlashLoanProvider implements FlashLoanProvider {
    readonly name = "Aave";
    readonly supportedTokens: string[];
    readonly maxLoanAmount: Record<string, string>;
    readonly fee = 9;
    private readonly poolAddress;
    private readonly poolContract;
    constructor();
    /**
     * Initialize the list of supported tokens and their max loan amounts
     * In a real implementation, this would query the Aave protocol
     */
    private initializeSupportedTokens;
    /**
     * Execute a flash loan through Aave
     */
    execute(params: FlashLoanExecuteParams): Promise<FlashLoanResult>;
}
