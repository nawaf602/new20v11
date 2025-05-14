import { PortfolioService, Portfolio, Wallet } from "@/interfaces/Portfolio";
/**
 * Portfolio Service Implementation
 * Manages user portfolios and wallets
 */
export declare class PortfolioServiceImpl implements PortfolioService {
    private portfolios;
    private wallets;
    private provider;
    private tokenPrices;
    constructor();
    /**
     * Initialize with sample data
     */
    private initializeSampleData;
    /**
     * Get portfolio by ID
     */
    getPortfolio(portfolioId: string): Promise<Portfolio>;
    /**
     * Get all portfolios for a user
     */
    getUserPortfolios(userId: string): Promise<Portfolio[]>;
    /**
     * Create a new portfolio
     */
    createPortfolio(userId: string, name: string): Promise<Portfolio>;
    /**
     * Add wallet to portfolio
     */
    addWallet(portfolioId: string, wallet: Wallet): Promise<Portfolio>;
    /**
     * Remove wallet from portfolio
     */
    removeWallet(portfolioId: string, walletId: string): Promise<Portfolio>;
    /**
     * Update wallet balances
     */
    updateWalletBalances(walletId: string): Promise<Wallet>;
    /**
     * Update portfolio total value
     */
    private updatePortfolioValue;
    /**
     * Rebalance portfolio
     */
    rebalancePortfolio(portfolioId: string, targetAllocations: Record<string, number>): Promise<Portfolio>;
}
