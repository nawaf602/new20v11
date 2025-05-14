import React from 'react';
import { render, screen } from '@testing-library/react';
import Portfolio from '../../../src/ui/pages/portfolio';

// Mock the components used in Portfolio page
jest.mock('../../../src/ui/components/Layout', () => {
  return function MockLayout({ children, title }) {
    return (
      <div data-testid="mock-layout" data-title={title}>
        {children}
      </div>
    );
  };
});

jest.mock('../../../src/ui/components/portfolio/PortfolioWallets', () => {
  return function MockPortfolioWallets() {
    return <div data-testid="mock-portfolio-wallets">Portfolio Wallets</div>;
  };
});

jest.mock('../../../src/ui/components/portfolio/PortfolioAllocation', () => {
  return function MockPortfolioAllocation() {
    return <div data-testid="mock-portfolio-allocation">Portfolio Allocation</div>;
  };
});

describe('Portfolio Page', () => {
  test('renders with correct layout title', () => {
    render(<Portfolio />);
    
    // Check if layout is rendered with correct title
    const layout = screen.getByTestId('mock-layout');
    expect(layout).toHaveAttribute('data-title', 'Portfolio');
  });

  test('renders portfolio components', () => {
    render(<Portfolio />);
    
    // Check if portfolio components are rendered
    expect(screen.getByTestId('mock-portfolio-wallets')).toBeInTheDocument();
    expect(screen.getByTestId('mock-portfolio-allocation')).toBeInTheDocument();
  });

  test('renders portfolio summary section', () => {
    render(<Portfolio />);
    
    // Check if summary section is rendered
    expect(screen.getByText('Portfolio Summary')).toBeInTheDocument();
    
    // Check if summary data is rendered
    expect(screen.getByText('Total Value')).toBeInTheDocument();
    expect(screen.getByText('21.4 ETH')).toBeInTheDocument();
    expect(screen.getByText('Active Wallets')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Last Updated')).toBeInTheDocument();
  });

  test('renders transaction history section', () => {
    render(<Portfolio />);
    
    // Check if transaction history section is rendered
    expect(screen.getByText('Transaction History')).toBeInTheDocument();
    
    // Check if table headers are rendered
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Wallet')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    
    // Check if table data is rendered
    expect(screen.getByText('Main Trading Wallet')).toBeInTheDocument();
    expect(screen.getByText('Arbitrage Profit')).toBeInTheDocument();
    expect(screen.getByText('+0.12 ETH')).toBeInTheDocument();
  });

  test('renders update all balances button', () => {
    render(<Portfolio />);
    
    // Check if update button is rendered
    expect(screen.getByText('Update All Balances')).toBeInTheDocument();
  });
});
