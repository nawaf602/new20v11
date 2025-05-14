import { FlashLoanProvider, FlashLoanExecuteParams, FlashLoanResult, FlashLoanService } from "@/interfaces/FlashLoan"; // Corrected path using alias
import { logger } from "@/utils/logger"; // Corrected path using alias
import { getEthereumProvider } from "@/utils/ethereum"; // Corrected path using alias

/**
 * Flash Loan Service Implementation
 * Manages multiple flash loan providers and executes flash loans
 */
export class FlashLoanServiceImpl implements FlashLoanService {
  private providers: Map<string, FlashLoanProvider> = new Map();

  constructor() {
    // Register providers during initialization
    this.registerProviders();
  }

  /**
   * Register all supported flash loan providers
   */
  private registerProviders(): void {
    // This will be implemented as we add each provider
    logger.info("Initializing Flash Loan Service");
  }

  /**
   * Get all available flash loan providers
   */
  public getProviders(): FlashLoanProvider[] {
    return Array.from(this.providers.values());
  }

  /**
   * Get a specific provider by name
   */
  public getProvider(name: string): FlashLoanProvider | undefined {
    return this.providers.get(name);
  }

  /**
   * Execute a flash loan with the best provider (lowest fee)
   */
  public async executeBestFlashLoan(params: FlashLoanExecuteParams): Promise<FlashLoanResult> {
    try {
      // Get all providers that support the token
      const supportedProviders = this.getProviders().filter(provider =>
        provider.supportedTokens.includes(params.token)
      );

      if (supportedProviders.length === 0) {
        return {
          success: false,
          error: `No provider supports token ${params.token}`
        };
      }

      // Find the provider with the lowest fee
      const bestProvider = supportedProviders.reduce((prev, current) =>
        prev.fee < current.fee ? prev : current
      );

      logger.info(`Selected ${bestProvider.name} as best provider for flash loan`);

      // Execute with the best provider
      return this.executeFlashLoan(bestProvider.name, params);
    } catch (error: unknown) { // Added type annotation
      logger.error("Error executing best flash loan:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error executing flash loan";
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Execute a flash loan with a specific provider
   */
  public async executeFlashLoan(providerName: string, params: FlashLoanExecuteParams): Promise<FlashLoanResult> {
    try {
      const provider = this.getProvider(providerName);

      if (!provider) {
        return {
          success: false,
          error: `Provider ${providerName} not found`
        };
      }

      if (!provider.supportedTokens.includes(params.token)) {
        return {
          success: false,
          error: `Provider ${providerName} does not support token ${params.token}`
        };
      }

      logger.info(`Executing flash loan with provider ${providerName}`);

      // Execute the flash loan
      return await provider.execute(params);
    } catch (error: unknown) { // Added type annotation
      logger.error(`Error executing flash loan with provider ${providerName}:`, error);
      const errorMessage = error instanceof Error ? error.message : `Unknown error executing flash loan with provider ${providerName}`;
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Register a new provider
   */
  public registerProvider(provider: FlashLoanProvider): void {
    this.providers.set(provider.name, provider);
    logger.info(`Registered flash loan provider: ${provider.name}`);
  }
}

