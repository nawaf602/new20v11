import { FlashLoanProvider, FlashLoanExecuteParams, FlashLoanResult, FlashLoanService } from "@/interfaces/FlashLoan";
/**
 * Flash Loan Service Implementation
 * Manages multiple flash loan providers and executes flash loans
 */
export declare class FlashLoanServiceImpl implements FlashLoanService {
    private providers;
    constructor();
    /**
     * Register all supported flash loan providers
     */
    private registerProviders;
    /**
     * Get all available flash loan providers
     */
    getProviders(): FlashLoanProvider[];
    /**
     * Get a specific provider by name
     */
    getProvider(name: string): FlashLoanProvider | undefined;
    /**
     * Execute a flash loan with the best provider (lowest fee)
     */
    executeBestFlashLoan(params: FlashLoanExecuteParams): Promise<FlashLoanResult>;
    /**
     * Execute a flash loan with a specific provider
     */
    executeFlashLoan(providerName: string, params: FlashLoanExecuteParams): Promise<FlashLoanResult>;
    /**
     * Register a new provider
     */
    registerProvider(provider: FlashLoanProvider): void;
}
