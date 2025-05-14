import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../../../src/ui/pages/index';

// Mock the components used in Dashboard
jest.mock('../../../src/ui/components/Layout', () => {
  return function MockLayout({ children, title }) {
    return (
      <div data-testid="mock-layout" data-title={title}>
        {children}
      </div>
    );
  };
});

jest.mock('../../../src/ui/components/dashboard/DashboardStats', () => {
  return function MockDashboardStats() {
    return <div data-testid="mock-dashboard-stats">Dashboard Stats</div>;
  };
});

jest.mock('../../../src/ui/components/dashboard/ProfitChart', () => {
  return function MockProfitChart() {
    return <div data-testid="mock-profit-chart">Profit Chart</div>;
  };
});

jest.mock('../../../src/ui/components/arbitrage/ArbitrageOpportunitiesList', () => {
  return function MockArbitrageOpportunitiesList() {
    return <div data-testid="mock-arbitrage-opportunities-list">Arbitrage Opportunities List</div>;
  };
});

describe('Dashboard Page', () => {
  test('renders with correct layout title', () => {
    render(<Dashboard />);
    
    // Check if layout is rendered with correct title
    const layout = screen.getByTestId('mock-layout');
    expect(layout).toHaveAttribute('data-title', 'Dashboard');
  });

  test('renders all dashboard components', () => {
    render(<Dashboard />);
    
    // Check if all components are rendered
    expect(screen.getByTestId('mock-dashboard-stats')).toBeInTheDocument();
    expect(screen.getByTestId('mock-profit-chart')).toBeInTheDocument();
    expect(screen.getByTestId('mock-arbitrage-opportunities-list')).toBeInTheDocument();
  });

  test('renders recent activity section', () => {
    render(<Dashboard />);
    
    // Check if recent activity section is rendered
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    
    // Check if activity items are rendered
    expect(screen.getByText('Executed arbitrage on Uniswap/SushiSwap')).toBeInTheDocument();
    expect(screen.getByText('Wallet balance updated')).toBeInTheDocument();
    expect(screen.getByText('Executed arbitrage on Curve/Balancer')).toBeInTheDocument();
  });
});
