import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ArbitrageOpportunityCard from '../../../src/ui/components/arbitrage/ArbitrageOpportunityCard';

describe('ArbitrageOpportunityCard Component', () => {
  const mockOpportunity = {
    id: '1',
    type: 'simple',
    sourceExchange: 'Uniswap V3',
    targetExchange: 'SushiSwap',
    tokenPath: ['0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', '0x6B175474E89094C44Da98b954EedeAC495271d0F', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'],
    expectedProfit: '20000000000000000', // 0.02 ETH
    expectedProfitPercentage: '2.0',
    confidence: 0.92
  };
  
  const mockExecute = jest.fn();

  test('renders opportunity details correctly', () => {
    render(<ArbitrageOpportunityCard opportunity={mockOpportunity} onExecute={mockExecute} />);
    
    // Check if type is rendered with proper capitalization
    expect(screen.getByText('Simple Arbitrage')).toBeInTheDocument();
    
    // Check if route is rendered
    expect(screen.getByText('Uniswap V3 → SushiSwap')).toBeInTheDocument();
    
    // Check if token path is rendered
    expect(screen.getByText('WETH → DAI → WETH')).toBeInTheDocument();
    
    // Check if profit is rendered
    expect(screen.getByText('0.0200 ETH (2.0%)')).toBeInTheDocument();
    
    // Check if confidence is rendered
    expect(screen.getByText('92% Confidence')).toBeInTheDocument();
  });

  test('calls onExecute when Execute button is clicked', () => {
    render(<ArbitrageOpportunityCard opportunity={mockOpportunity} onExecute={mockExecute} />);
    
    // Find and click the Execute button
    const executeButton = screen.getByText('Execute');
    fireEvent.click(executeButton);
    
    // Check if onExecute was called with the opportunity
    expect(mockExecute).toHaveBeenCalledWith(mockOpportunity);
  });
});
