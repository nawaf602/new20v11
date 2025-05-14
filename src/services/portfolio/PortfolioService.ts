import { ethers } from "ethers";
import { v4 as uuidv4 } from "uuid";
import {
  PortfolioService,
  Portfolio,
  Wallet,
  TokenBalance
} from "@/interfaces/Portfolio"; // Corrected path
import { getEthereumProvider, getContract } from "@/utils/ethereum"; // Corrected path
import { logger } from "@/utils/logger"; // Corrected path

// ERC20 ABI (simplified for balanceOf)
const ERC20_ABI = [
  {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{"name": "", "type": "string"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "type": "function"
  }
];

/**
 * Portfolio Service Implementation
 * Manages user portfolios and wallets
 */
export class PortfolioServiceImpl implements PortfolioService {
  private portfolios: Map<string, Portfolio> = new Map();
  private wallets: Map<string, Wallet> = new Map();
  private provider: ethers.providers.Provider;

  // Common tokens with their price in ETH (simplified)
  private tokenPrices: Record<string, string> = {
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2": ethers.utils.parseEther("1").toString(), // WETH = 1 ETH
    "0x6B175474E89094C44Da98b954EedeAC495271d0F": ethers.utils.parseEther("0.00055").toString(), // DAI = 0.00055 ETH
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": ethers.utils.parseEther("0.00055").toString(), // USDC = 0.00055 ETH
    "0xdAC17F958D2ee523a2206206994597C13D831ec7": ethers.utils.parseEther("0.00055").toString(), // USDT = 0.00055 ETH
    "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599": ethers.utils.parseEther("0.06").toString()  // WBTC = 0.06 ETH
  };

  constructor() {
    logger.info("Initializing Portfolio Service");
    this.provider = getEthereumProvider();

    // Initialize with some sample data
    this.initializeSampleData();
  }

  /**
   * Initialize with sample data
   */
  private initializeSampleData(): void {
    // Create sample wallets
    const wallet1: Wallet = {
      id: uuidv4(),
      address: "0x1234567890123456789012345678901234567890",
      name: "Main Wallet",
      balance: [
        {
          token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          symbol: "WETH",
          balance: ethers.utils.parseEther("10").toString(),
          value: ethers.utils.parseEther("10").toString()
        },
        {
          token: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
          symbol: "DAI",
          balance: ethers.utils.parseEther("5000").toString(),
          value: ethers.utils.parseEther("2.75").toString()
        }
      ],
      totalValue: ethers.utils.parseEther("12.75").toString(),
      isActive: true
    };

    const wallet2: Wallet = {
      id: uuidv4(),
      address: "0x0987654321098765432109876543210987654321",
      name: "Secondary Wallet",
      balance: [
        {
          token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          symbol: "WETH",
          balance: ethers.utils.parseEther("5").toString(),
          value: ethers.utils.parseEther("5").toString()
        },
        {
          token: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          symbol: "USDC",
          balance: ethers.utils.parseUnits("3000", 6).toString(),
          value: ethers.utils.parseEther("1.65").toString()
        }
      ],
      totalValue: ethers.utils.parseEther("6.65").toString(),
      isActive: true
    };

    // Store wallets
    this.wallets.set(wallet1.id, wallet1);
    this.wallets.set(wallet2.id, wallet2);

    // Create sample portfolio
    const portfolio: Portfolio = {
      id: uuidv4(),
      userId: "sample_user_id",
      name: "Main Portfolio",
      wallets: [wallet1, wallet2],
      totalValue: ethers.utils.parseEther("19.4").toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Store portfolio
    this.portfolios.set(portfolio.id, portfolio);

    logger.info("Initialized Portfolio Service with sample data");
  }

  /**
   * Get portfolio by ID
   */
  public async getPortfolio(portfolioId: string): Promise<Portfolio> {
    const portfolio = this.portfolios.get(portfolioId);

    if (!portfolio) {
      throw new Error(`Portfolio with ID ${portfolioId} not found`);
    }

    return portfolio;
  }

  /**
   * Get all portfolios for a user
   */
  public async getUserPortfolios(userId: string): Promise<Portfolio[]> {
    return Array.from(this.portfolios.values())
      .filter(portfolio => portfolio.userId === userId);
  }

  /**
   * Create a new portfolio
   */
  public async createPortfolio(userId: string, name: string): Promise<Portfolio> {
    const portfolio: Portfolio = {
      id: uuidv4(),
      userId,
      name,
      wallets: [],
      totalValue: "0",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.portfolios.set(portfolio.id, portfolio);
    logger.info(`Created new portfolio ${portfolio.id} for user ${userId}`);

    return portfolio;
  }

  /**
   * Add wallet to portfolio
   */
  public async addWallet(portfolioId: string, wallet: Wallet): Promise<Portfolio> {
    const portfolio = await this.getPortfolio(portfolioId);

    // Check if wallet already exists
    if (portfolio.wallets.some(w => w.address === wallet.address)) {
      throw new Error(`Wallet with address ${wallet.address} already exists in portfolio`);
    }

    // Generate ID if not provided
    if (!wallet.id) {
      wallet.id = uuidv4();
    }

    // Set default values if not provided
    if (!wallet.balance) {
      wallet.balance = [];
    }

    if (!wallet.totalValue) {
      wallet.totalValue = "0";
    }

    // Store wallet
    this.wallets.set(wallet.id, wallet);

    // Add to portfolio
    portfolio.wallets.push(wallet);

    // Update portfolio total value
    this.updatePortfolioValue(portfolio);

    logger.info(`Added wallet ${wallet.id} to portfolio ${portfolioId}`);

    return portfolio;
  }

  /**
   * Remove wallet from portfolio
   */
  public async removeWallet(portfolioId: string, walletId: string): Promise<Portfolio> {
    const portfolio = await this.getPortfolio(portfolioId);

    // Check if wallet exists in portfolio
    const walletIndex = portfolio.wallets.findIndex(w => w.id === walletId);

    if (walletIndex === -1) {
      throw new Error(`Wallet with ID ${walletId} not found in portfolio`);
    }

    // Remove wallet from portfolio
    portfolio.wallets.splice(walletIndex, 1);

    // Update portfolio total value
    this.updatePortfolioValue(portfolio);

    logger.info(`Removed wallet ${walletId} from portfolio ${portfolioId}`);

    return portfolio;
  }

  /**
   * Update wallet balances
   */
  public async updateWalletBalances(walletId: string): Promise<Wallet> {
    const wallet = this.wallets.get(walletId);

    if (!wallet) {
      throw new Error(`Wallet with ID ${walletId} not found`);
    }

    try {
      // In a real implementation, this would fetch balances from the blockchain
      // For demonstration, we'll update with random variations

      let totalValue = ethers.BigNumber.from(0);

      for (const balance of wallet.balance) {
        // Apply random variation (-5% to +5%)
        const variation = (Math.random() * 0.1) - 0.05;
        const newBalance = ethers.BigNumber.from(balance.balance)
          .mul(ethers.BigNumber.from(Math.floor((1 + variation) * 100)))
          .div(ethers.BigNumber.from(100));

        balance.balance = newBalance.toString();

        // Update value
        const tokenPrice = this.tokenPrices[balance.token] || "0";
        const value = newBalance.mul(ethers.BigNumber.from(tokenPrice)).div(ethers.constants.WeiPerEther);
        balance.value = value.toString();

        totalValue = totalValue.add(value);
      }

      // Update wallet total value
      wallet.totalValue = totalValue.toString();

      // Update wallet in storage
      this.wallets.set(walletId, wallet);

      // Update portfolio values
      for (const portfolio of this.portfolios.values()) {
        if (portfolio.wallets.some(w => w.id === walletId)) {
          // Update the wallet in the portfolio
          const walletIndex = portfolio.wallets.findIndex(w => w.id === walletId);
          portfolio.wallets[walletIndex] = wallet;

          // Update portfolio total value
          this.updatePortfolioValue(portfolio);
        }
      }

      logger.info(`Updated balances for wallet ${walletId}`);

      return wallet;
    } catch (error: unknown) { // Added type annotation
      logger.error(`Error updating wallet balances for ${walletId}:`, error);
      const errorMessage = error instanceof Error ? error.message : `Unknown error updating wallet balances for ${walletId}`;
      throw new Error(errorMessage); // Re-throw error after logging
    }
  }

  /**
   * Update portfolio total value
   */
  private updatePortfolioValue(portfolio: Portfolio): void {
    let totalValue = ethers.BigNumber.from(0);

    for (const wallet of portfolio.wallets) {
      totalValue = totalValue.add(ethers.BigNumber.from(wallet.totalValue));
    }

    portfolio.totalValue = totalValue.toString();
    portfolio.updatedAt = new Date();

    // Update portfolio in storage
    this.portfolios.set(portfolio.id, portfolio);
  }

  /**
   * Rebalance portfolio
   */
  public async rebalancePortfolio(
    portfolioId: string,
    targetAllocations: Record<string, number>
  ): Promise<Portfolio> {
    const portfolio = await this.getPortfolio(portfolioId);

    try {
      logger.info(`Rebalancing portfolio ${portfolioId}`);

      // In a real implementation, this would execute trades to achieve target allocations
      // For demonstration, we'll simulate the rebalancing

      // Validate target allocations
      const totalAllocation = Object.values(targetAllocations).reduce((sum, value) => sum + value, 0);

      if (Math.abs(totalAllocation - 100) > 0.1) {
        throw new Error(`Total allocation must be 100%, got ${totalAllocation}%`);
      }

      // Get current allocations
      const currentAllocations: Record<string, number> = {};
      const totalValue = ethers.BigNumber.from(portfolio.totalValue);

      // Calculate current allocations for each token
      for (const wallet of portfolio.wallets) {
        for (const balance of wallet.balance) {
          const token = balance.token;
          const value = ethers.BigNumber.from(balance.value);

          if (!currentAllocations[token]) {
            currentAllocations[token] = 0;
          }

          // Avoid division by zero if totalValue is 0
          if (!totalValue.isZero()) {
            // Use formatUnits for potentially large numbers before converting to float
            const percentage = parseFloat(
              ethers.utils.formatUnits(value.mul(10000).div(totalValue), 2) // Calculate percentage with 2 decimal places
            );
            currentAllocations[token] += percentage;
          }
        }
      }

      // Log current and target allocations
      logger.info("Current allocations:", currentAllocations);
      logger.info("Target allocations:", targetAllocations);

      // In a real implementation, this would execute trades to rebalance
      // For demonstration, we'll simulate the result

      // Update portfolio
      portfolio.updatedAt = new Date();

      logger.info(`Rebalanced portfolio ${portfolioId}`);

      return portfolio;
    } catch (error: unknown) { // Added type annotation
      logger.error(`Error rebalancing portfolio ${portfolioId}:`, error);
      const errorMessage = error instanceof Error ? error.message : `Unknown error rebalancing portfolio ${portfolioId}`;
      throw new Error(errorMessage); // Re-throw error after logging
    }
  }
}

