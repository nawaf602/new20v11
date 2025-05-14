import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardStats from '../../../src/ui/components/dashboard/DashboardStats';

describe('DashboardStats Component', () => {
  test('renders all stat cards', () => {
    render(<DashboardStats />);
    
    // Check if all stat titles are rendered
    expect(screen.getByText('Total Profit')).toBeInTheDocument();
    expect(screen.getByText('Arbitrage Opportunities')).toBeInTheDocument();
    expect(screen.getByText('Average Execution Time')).toBeInTheDocument();
    expect(screen.getByText('Success Rate')).toBeInTheDocument();
    
    // Check if all stat values are rendered
    expect(screen.getByText('12.45 ETH')).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText('1.2s')).toBeInTheDocument();
    expect(screen.getByText('94.5%')).toBeInTheDocument();
    
    // Check if all stat changes are rendered
    expect(screen.getByText('3.2%')).toBeInTheDocument();
    expect(screen.getByText('12%')).toBeInTheDocument();
    expect(screen.getByText('0.3s')).toBeInTheDocument();
    expect(screen.getByText('2.1%')).toBeInTheDocument();
  });
});
