// Portfolio interfaces
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
  value: string; // Value in ETH
}

export interface PortfolioService {
  // Get portfolio by ID
  getPortfolio(portfolioId: string): Promise<Portfolio>;
  
  // Get all portfolios for a user
  getUserPortfolios(userId: string): Promise<Portfolio[]>;
  
  // Create a new portfolio
  createPortfolio(userId: string, name: string): Promise<Portfolio>;
  
  // Add wallet to portfolio
  addWallet(portfolioId: string, wallet: Wallet): Promise<Portfolio>;
  
  // Remove wallet from portfolio
  removeWallet(portfolioId: string, walletId: string): Promise<Portfolio>;
  
  // Update wallet balances
  updateWalletBalances(walletId: string): Promise<Wallet>;
  
  // Rebalance portfolio
  rebalancePortfolio(portfolioId: string, targetAllocations: Record<string, number>): Promise<Portfolio>;
}
