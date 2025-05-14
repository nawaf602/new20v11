import React from 'react';
import { render, screen } from '@testing-library/react';
import Analytics from '../../../src/ui/pages/analytics';

// Mock the components used in Analytics page
jest.mock('../../../src/ui/components/Layout', () => {
  return function MockLayout({ children, title }) {
    return (
      <div data-testid="mock-layout" data-title={title}>
        {children}
      </div>
    );
  };
});

jest.mock('../../../src/ui/components/analytics/PerformanceChart', () => {
  return function MockPerformanceChart() {
    return <div data-testid="mock-performance-chart">Performance Chart</div>;
  };
});

jest.mock('../../../src/ui/components/analytics/ExchangeDistribution', () => {
  return function MockExchangeDistribution() {
    return <div data-testid="mock-exchange-distribution">Exchange Distribution</div>;
  };
});

describe('Analytics Page', () => {
  test('renders with correct layout title', () => {
    render(<Analytics />);
    
    // Check if layout is rendered with correct title
    const layout = screen.getByTestId('mock-layout');
    expect(layout).toHaveAttribute('data-title', 'Analytics');
  });

  test('renders analytics components', () => {
    render(<Analytics />);
    
    // Check if analytics components are rendered
    expect(screen.getByTestId('mock-performance-chart')).toBeInTheDocument();
    expect(screen.getByTestId('mock-exchange-distribution')).toBeInTheDocument();
  });

  test('renders analytics summary section', () => {
    render(<Analytics />);
    
    // Check if summary section is rendered
    expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
    
    // Check if summary data is rendered
    expect(screen.getByText('Total Profit')).toBeInTheDocument();
    expect(screen.getByText('12.45 ETH')).toBeInTheDocument();
    expect(screen.getByText('Total Trades')).toBeInTheDocument();
    expect(screen.getByText('142')).toBeInTheDocument();
    expect(screen.getByText('Success Rate')).toBeInTheDocument();
    expect(screen.getByText('94.5%')).toBeInTheDocument();
    expect(screen.getByText('Avg. Profit per Trade')).toBeInTheDocument();
    expect(screen.getByText('0.088 ETH')).toBeInTheDocument();
  });

  test('renders time period filter', () => {
    render(<Analytics />);
    
    // Check if time period filter is rendered
    expect(screen.getByText('Last 7 Days')).toBeInTheDocument();
  });

  test('renders export data button', () => {
    render(<Analytics />);
    
    // Check if export button is rendered
    expect(screen.getByText('Export Data')).toBeInTheDocument();
  });

  test('renders top performing routes table', () => {
    render(<Analytics />);
    
    // Check if top performing routes table is rendered
    expect(screen.getByText('Top Performing Arbitrage Routes')).toBeInTheDocument();
    
    // Check if table headers are rendered
    expect(screen.getByText('Route')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Trades')).toBeInTheDocument();
    expect(screen.getByText('Success Rate')).toBeInTheDocument();
    expect(screen.getByText('Total Profit')).toBeInTheDocument();
    expect(screen.getByText('Avg. Profit')).toBeInTheDocument();
    
    // Check if table data is rendered
    expect(screen.getByText('Uniswap V3 → SushiSwap')).toBeInTheDocument();
    expect(screen.getByText('Simple')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('97.6%')).toBeInTheDocument();
    expect(screen.getByText('3.85 ETH')).toBeInTheDocument();
    expect(screen.getByText('0.092 ETH')).toBeInTheDocument();
  });
});
