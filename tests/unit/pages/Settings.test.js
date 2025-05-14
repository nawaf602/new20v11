import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Settings from '../../../src/ui/pages/settings';

// Mock the components used in Settings page
jest.mock('../../../src/ui/components/Layout', () => {
  return function MockLayout({ children, title }) {
    return (
      <div data-testid="mock-layout" data-title={title}>
        {children}
      </div>
    );
  };
});

jest.mock('../../../src/ui/components/settings/SettingsTabs', () => {
  return function MockSettingsTabs() {
    return <div data-testid="mock-settings-tabs">Settings Tabs</div>;
  };
});

describe('Settings Page', () => {
  test('renders with correct layout title', () => {
    render(<Settings />);
    
    // Check if layout is rendered with correct title
    const layout = screen.getByTestId('mock-layout');
    expect(layout).toHaveAttribute('data-title', 'Settings');
  });

  test('renders settings tabs component', () => {
    render(<Settings />);
    
    // Check if settings tabs component is rendered
    expect(screen.getByTestId('mock-settings-tabs')).toBeInTheDocument();
  });

  test('renders page header with title', () => {
    render(<Settings />);
    
    // Check if page header is rendered
    expect(screen.getByText('Bot Settings')).toBeInTheDocument();
  });

  test('renders action buttons', () => {
    render(<Settings />);
    
    // Check if action buttons are rendered
    expect(screen.getByText('Reset to Defaults')).toBeInTheDocument();
    expect(screen.getByText('Save All Changes')).toBeInTheDocument();
  });

  test('renders system information section', () => {
    render(<Settings />);
    
    // Check if system information section is rendered
    expect(screen.getByText('System Information')).toBeInTheDocument();
    
    // Check if bot status section is rendered
    expect(screen.getByText('Bot Status')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('Running')).toBeInTheDocument();
    expect(screen.getByText('Version:')).toBeInTheDocument();
    expect(screen.getByText('0.1.0')).toBeInTheDocument();
    
    // Check if network status section is rendered
    expect(screen.getByText('Network Status')).toBeInTheDocument();
    expect(screen.getByText('Network:')).toBeInTheDocument();
    expect(screen.getByText('Ethereum Mainnet')).toBeInTheDocument();
    expect(screen.getByText('Gas Price:')).toBeInTheDocument();
    expect(screen.getByText('32 Gwei')).toBeInTheDocument();
  });

  test('renders system logs section', () => {
    render(<Settings />);
    
    // Check if system logs section is rendered
    expect(screen.getByText('System Logs')).toBeInTheDocument();
    
    // Check if log entries are rendered
    expect(screen.getByText(/Arbitrage opportunity detected/)).toBeInTheDocument();
    expect(screen.getByText(/Executing arbitrage transaction/)).toBeInTheDocument();
    expect(screen.getByText(/Transaction successful/)).toBeInTheDocument();
  });

  test('renders action buttons in system information section', () => {
    render(<Settings />);
    
    // Check if action buttons are rendered
    expect(screen.getByText('Download Logs')).toBeInTheDocument();
    expect(screen.getByText('Restart Bot')).toBeInTheDocument();
  });
});
