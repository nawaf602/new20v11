import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Arbitrage from '../../../src/ui/pages/arbitrage';

// Mock the components used in Arbitrage page
jest.mock('../../../src/ui/components/Layout', () => {
  return function MockLayout({ children, title }) {
    return (
      <div data-testid="mock-layout" data-title={title}>
        {children}
      </div>
    );
  };
});

jest.mock('../../../src/ui/components/arbitrage/ArbitrageOpportunitiesList', () => {
  return function MockArbitrageOpportunitiesList() {
    return <div data-testid="mock-arbitrage-opportunities-list">Arbitrage Opportunities List</div>;
  };
});

describe('Arbitrage Page', () => {
  test('renders with correct layout title', () => {
    render(<Arbitrage />);
    
    // Check if layout is rendered with correct title
    const layout = screen.getByTestId('mock-layout');
    expect(layout).toHaveAttribute('data-title', 'Arbitrage');
  });

  test('renders arbitrage opportunities list component', () => {
    render(<Arbitrage />);
    
    // Check if arbitrage opportunities list is rendered
    expect(screen.getByTestId('mock-arbitrage-opportunities-list')).toBeInTheDocument();
  });

  test('renders filter controls', () => {
    render(<Arbitrage />);
    
    // Check if filter dropdowns are rendered
    expect(screen.getByText('All Types')).toBeInTheDocument();
    expect(screen.getByText('All Exchanges')).toBeInTheDocument();
    
    // Check if scan button is rendered
    expect(screen.getByText('Scan Now')).toBeInTheDocument();
  });

  test('renders arbitrage settings section', () => {
    render(<Arbitrage />);
    
    // Check if settings section is rendered
    expect(screen.getByText('Arbitrage Settings')).toBeInTheDocument();
    
    // Check if settings inputs are rendered
    expect(screen.getByLabelText('Minimum Profit (ETH)')).toBeInTheDocument();
    expect(screen.getByLabelText('Maximum Gas (Gwei)')).toBeInTheDocument();
    expect(screen.getByLabelText('Minimum Confidence (%)')).toBeInTheDocument();
  });

  test('renders recent arbitrage executions table', () => {
    render(<Arbitrage />);
    
    // Check if executions table is rendered
    expect(screen.getByText('Recent Arbitrage Executions')).toBeInTheDocument();
    
    // Check if table headers are rendered
    expect(screen.getByText('Time')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Route')).toBeInTheDocument();
    expect(screen.getByText('Profit')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    
    // Check if table data is rendered
    expect(screen.getByText('Simple')).toBeInTheDocument();
    expect(screen.getByText('Triangular')).toBeInTheDocument();
    expect(screen.getByText('Uniswap V3 → SushiSwap')).toBeInTheDocument();
  });
});
