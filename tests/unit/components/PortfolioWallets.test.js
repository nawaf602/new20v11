import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PortfolioWallets from '../../../src/ui/components/portfolio/PortfolioWallets';

// Mock useState to control wallet data
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}));

describe('PortfolioWallets Component', () => {
  const mockWallets = [
    {
      id: '1',
      address: '0x1234567890123456789012345678901234567890',
      name: 'Main Trading Wallet',
      balance: [
        {
          token: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'WETH',
          balance: '10000000000000000000', // 10 ETH
          value: '10000000000000000000'    // 10 ETH
        },
        {
          token: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          symbol: 'DAI',
          balance: '5000000000000000000000', // 5000 DAI
          value: '2750000000000000000'      // 2.75 ETH
        }
      ],
      totalValue: '12750000000000000000', // 12.75 ETH
      isActive: true
    },
    {
      id: '2',
      address: '0x0987654321098765432109876543210987654321',
      name: 'Flash Loans Wallet',
      balance: [
        {
          token: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'WETH',
          balance: '5000000000000000000', // 5 ETH
          value: '5000000000000000000'    // 5 ETH
        }
      ],
      totalValue: '5000000000000000000', // 5 ETH
      isActive: true
    }
  ];
  
  const mockSetWallets = jest.fn();

  beforeEach(() => {
    // Setup the mock useState to return our mock wallets
    React.useState.mockImplementation(() => [mockWallets, mockSetWallets]);
  });

  test('renders wallet cards for each wallet', () => {
    render(<PortfolioWallets />);
    
    // Check if wallet names are rendered
    expect(screen.getByText('Main Trading Wallet')).toBeInTheDocument();
    expect(screen.getByText('Flash Loans Wallet')).toBeInTheDocument();
    
    // Check if wallet addresses are rendered (shortened)
    expect(screen.getByText('0x1234...7890')).toBeInTheDocument();
    expect(screen.getByText('0x0987...4321')).toBeInTheDocument();
    
    // Check if total values are rendered
    expect(screen.getByText('12.7500 ETH')).toBeInTheDocument();
    expect(screen.getByText('5.0000 ETH')).toBeInTheDocument();
    
    // Check if token balances are rendered
    expect(screen.getByText('WETH:')).toBeInTheDocument();
    expect(screen.getByText('DAI:')).toBeInTheDocument();
  });

  test('calls update function when Update Balance button is clicked', () => {
    render(<PortfolioWallets />);
    
    // Find all Update Balance buttons
    const updateButtons = screen.getAllByText('Update Balance');
    
    // Click the first one
    fireEvent.click(updateButtons[0]);
    
    // Check if setWallets was called (indicating the update function was triggered)
    expect(mockSetWallets).toHaveBeenCalled();
  });

  test('renders Add Wallet button', () => {
    render(<PortfolioWallets />);
    
    // Check if Add Wallet button is rendered
    expect(screen.getByText('Add Wallet')).toBeInTheDocument();
  });
});
