import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PortfolioServiceImpl } from '../../../src/services/portfolio/PortfolioService';

// Mock the ethers library
jest.mock('ethers', () => ({
  ethers: {
    providers: {
      Provider: jest.fn(),
    },
    utils: {
      parseEther: jest.fn().mockImplementation((value) => value + '000000000000000000'),
      formatEther: jest.fn().mockImplementation((value) => value.toString().replace('000000000000000000', '')),
    },
    BigNumber: {
      from: jest.fn().mockImplementation((value) => ({
        mul: jest.fn().mockReturnThis(),
        div: jest.fn().mockReturnThis(),
        add: jest.fn().mockReturnThis(),
        toString: jest.fn().mockReturnValue(value.toString()),
      })),
    },
    constants: {
      WeiPerEther: '1000000000000000000',
    },
  },
}));

// Mock the ethereum utility
jest.mock('../../../src/utils/ethereum', () => ({
  getEthereumProvider: jest.fn().mockReturnValue({}),
  getContract: jest.fn().mockReturnValue({}),
}));

// Mock the logger
jest.mock('../../../src/utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

describe('PortfolioService', () => {
  let portfolioService;

  beforeEach(() => {
    portfolioService = new PortfolioServiceImpl();
  });

  test('should initialize with sample data', () => {
    expect(portfolioService.portfolios.size).toBeGreaterThan(0);
    expect(portfolioService.wallets.size).toBeGreaterThan(0);
  });

  test('should get portfolio by ID', async () => {
    // Get the first portfolio ID from the map
    const portfolioId = Array.from(portfolioService.portfolios.keys())[0];
    
    const portfolio = await portfolioService.getPortfolio(portfolioId);
    
    expect(portfolio).toBeDefined();
    expect(portfolio.id).toBe(portfolioId);
  });

  test('should throw error for non-existent portfolio', async () => {
    await expect(portfolioService.getPortfolio('non-existent-id')).rejects.toThrow(
      'Portfolio with ID non-existent-id not found'
    );
  });

  test('should get user portfolios', async () => {
    const userId = 'sample_user_id';
    
    const portfolios = await portfolioService.getUserPortfolios(userId);
    
    expect(portfolios.length).toBeGreaterThan(0);
    expect(portfolios[0].userId).toBe(userId);
  });

  test('should create a new portfolio', async () => {
    const userId = 'test_user_id';
    const name = 'Test Portfolio';
    
    const portfolio = await portfolioService.createPortfolio(userId, name);
    
    expect(portfolio).toBeDefined();
    expect(portfolio.userId).toBe(userId);
    expect(portfolio.name).toBe(name);
    expect(portfolio.wallets).toEqual([]);
    expect(portfolio.totalValue).toBe('0');
  });

  test('should add wallet to portfolio', async () => {
    // Get the first portfolio ID from the map
    const portfolioId = Array.from(portfolioService.portfolios.keys())[0];
    
    const wallet = {
      address: '0xabcdef1234567890abcdef1234567890abcdef12',
      name: 'Test Wallet',
    };
    
    const updatedPortfolio = await portfolioService.addWallet(portfolioId, wallet);
    
    expect(updatedPortfolio.wallets.some(w => w.address === wallet.address)).toBe(true);
  });
});
