export interface Portfolio {
    id: string;
    userId: string;
    name: string;
    wallets: Wallet[];
    totalValue: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Wallet {
    id: string;
    address: string;
    name: string;
    encryptedPrivateKey?: string;
    balance: TokenBalance[];
    totalValue: string;
    isActive: boolean;
}
export interface TokenBalance {
    token: string;
    symbol: string;
    balance: string;
    value: string;
}
export interface PortfolioService {
    getPortfolio(portfolioId: string): Promise<Portfolio>;
    getUserPortfolios(userId: string): Promise<Portfolio[]>;
    createPortfolio(userId: string, name: string): Promise<Portfolio>;
    addWallet(portfolioId: string, wallet: Wallet): Promise<Portfolio>;
    removeWallet(portfolioId: string, walletId: string): Promise<Portfolio>;
    updateWalletBalances(walletId: string): Promise<Wallet>;
    rebalancePortfolio(portfolioId: string, targetAllocations: Record<string, number>): Promise<Portfolio>;
}
