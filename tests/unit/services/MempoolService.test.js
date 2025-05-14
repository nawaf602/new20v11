import React from 'react';
import { render, screen } from '@testing-library/react';
import { MempoolServiceImpl } from '../../../src/services/mempool/MempoolService';

// Mock the ethers library
jest.mock('ethers', () => ({
  ethers: {
    providers: {
      JsonRpcProvider: jest.fn().mockImplementation(() => ({
        getNetwork: jest.fn().mockResolvedValue({ chainId: 1 }),
        on: jest.fn(),
        off: jest.fn(),
      })),
    },
    utils: {
      parseTransaction: jest.fn().mockImplementation(() => ({
        to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', // Uniswap Router
        data: '0x0',
        value: '1000000000000000000',
      })),
      formatEther: jest.fn().mockImplementation((value) => value.toString().replace('000000000000000000', '')),
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

describe('MempoolService', () => {
  let mempoolService;

  beforeEach(() => {
    mempoolService = new MempoolServiceImpl();
  });

  test('should initialize correctly', () => {
    expect(mempoolService).toBeDefined();
  });

  test('should start and stop monitoring', async () => {
    // Mock the provider's on method
    const mockOn = jest.fn();
    const mockOff = jest.fn();
    mempoolService.provider = {
      on: mockOn,
      off: mockOff,
    };

    // Start monitoring
    await mempoolService.startMonitoring();
    expect(mockOn).toHaveBeenCalledWith('pending', expect.any(Function));

    // Stop monitoring
    await mempoolService.stopMonitoring();
    expect(mockOff).toHaveBeenCalledWith('pending', expect.any(Function));
  });

  test('should identify DEX transactions', () => {
    // Mock transaction data for a DEX swap
    const txData = {
      to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', // Uniswap Router
      data: '0x7ff36ab5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000001234567890123456789012345678901234567890000000000000000000000000000000000000000000000000000000006553f10000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000006b175474e89094c44da98b954eedeac495271d0f',
      value: '1000000000000000000',
    };

    const isDexTx = mempoolService.isDexTransaction(txData);
    expect(isDexTx).toBe(true);
  });

  test('should not identify non-DEX transactions', () => {
    // Mock transaction data for a simple ETH transfer
    const txData = {
      to: '0x1234567890123456789012345678901234567890',
      data: '0x',
      value: '1000000000000000000',
    };

    const isDexTx = mempoolService.isDexTransaction(txData);
    expect(isDexTx).toBe(false);
  });
});
