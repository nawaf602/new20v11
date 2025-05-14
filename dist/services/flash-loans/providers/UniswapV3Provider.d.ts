import { FlashLoanProvider, FlashLoanExecuteParams, FlashLoanResult } from '../../../interfaces/FlashLoan';
/**
 * Uniswap V3 Flash Swap Provider Implementation
 */
export declare class UniswapV3FlashSwapProvider implements FlashLoanProvider {
    readonly name = "UniswapV3";
    readonly supportedTokens: string[];
    readonly maxLoanAmount: Record<string, string>;
    readonly fee = 3;
    private readonly factoryAddress;
    private readonly factoryContract;
    private readonly poolCache;
    constructor();
    /**
     * Initialize the list of supported tokens and their max loan amounts
     */
    private initializeSupportedTokens;
    /**
     * Get or create a pool contract for the given token pair
     */
    private getPoolContract;
    /**
     * Execute a flash swap through Uniswap V3
     */
    execute(params: FlashLoanExecuteParams): Promise<FlashLoanResult>;
}
