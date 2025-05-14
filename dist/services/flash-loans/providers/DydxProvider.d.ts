import { FlashLoanProvider, FlashLoanExecuteParams, FlashLoanResult } from '../../../interfaces/FlashLoan';
/**
 * dYdX Flash Loan Provider Implementation
 */
export declare class DydxFlashLoanProvider implements FlashLoanProvider {
    readonly name = "dYdX";
    readonly supportedTokens: string[];
    readonly maxLoanAmount: Record<string, string>;
    readonly fee = 2;
    private readonly soloMarginAddress;
    private readonly soloMarginContract;
    constructor();
    /**
     * Initialize the list of supported tokens and their max loan amounts
     */
    private initializeSupportedTokens;
    /**
     * Execute a flash loan through dYdX
     */
    execute(params: FlashLoanExecuteParams): Promise<FlashLoanResult>;
}
