import React from 'react';
import { render, screen } from '@testing-library/react';
import { FlashLoanServiceImpl } from '../../../src/services/flash-loans/FlashLoanService';
import { AaveProvider } from '../../../src/services/flash-loans/providers/AaveProvider';

// Mock the ethers library
jest.mock('ethers', () => ({
  ethers: {
    providers: {
      JsonRpcProvider: jest.fn().mockImplementation(() => ({
        getNetwork: jest.fn().mockResolvedValue({ chainId: 1 }),
      })),
    },
    Contract: jest.fn().mockImplementation(() => ({
      flashLoan: jest.fn().mockResolvedValue({
        hash: '0x123456789abcdef',
        wait: jest.fn().mockResolvedValue({ status: 1 }),
      }),
    })),
    Wallet: jest.fn().mockImplementation(() => ({
      address: '0x1234567890123456789012345678901234567890',
      connect: jest.fn().mockReturnThis(),
    })),
    utils: {
      parseEther: jest.fn().mockImplementation((value) => value + '000000000000000000'),
      formatEther: jest.fn().mockImplementation((value) => value.replace('000000000000000000', '')),
    },
  },
}));

// Mock the logger
jest.mock('../../../src/utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

describe('FlashLoanService', () => {
  let flashLoanService;
  let aaveProvider;

  beforeEach(() => {
    aaveProvider = new AaveProvider();
    flashLoanService = new FlashLoanServiceImpl();
    flashLoanService.registerProvider('aave', aaveProvider);
  });

  test('should register a provider', () => {
    expect(flashLoanService.getProvider('aave')).toBe(aaveProvider);
  });

  test('should throw error for unknown provider', () => {
    expect(() => {
      flashLoanService.getProvider('unknown');
    }).toThrow('Flash loan provider unknown not found');
  });

  test('should get available providers', () => {
    const providers = flashLoanService.getAvailableProviders();
    expect(providers).toContain('aave');
    expect(providers.length).toBe(1);
  });
});
