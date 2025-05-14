import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SettingsTabs from '../../../src/ui/components/settings/SettingsTabs';

// Mock useState to control active tab
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}));

describe('SettingsTabs Component', () => {
  // Mock state for active tab
  const mockSetActiveTab = jest.fn();
  
  beforeEach(() => {
    // Setup the mock useState to return 'general' as active tab initially
    React.useState.mockImplementation((initialValue) => {
      if (initialValue === 'general') {
        return ['general', mockSetActiveTab];
      }
      return [initialValue, jest.fn()];
    });
  });

  test('renders all tab buttons', () => {
    render(<SettingsTabs />);
    
    // Check if all tab buttons are rendered
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
    expect(screen.getByText('Trading')).toBeInTheDocument();
    expect(screen.getByText('Advanced')).toBeInTheDocument();
  });

  test('renders general settings by default', () => {
    render(<SettingsTabs />);
    
    // Check if general settings content is rendered
    expect(screen.getByText('General Settings')).toBeInTheDocument();
    expect(screen.getByLabelText('Theme')).toBeInTheDocument();
    expect(screen.getByLabelText('Language')).toBeInTheDocument();
  });

  test('changes tab when clicking on tab buttons', () => {
    render(<SettingsTabs />);
    
    // Click on Security tab
    fireEvent.click(screen.getByText('Security'));
    
    // Check if setActiveTab was called with 'security'
    expect(mockSetActiveTab).toHaveBeenCalledWith('security');
    
    // Click on Trading tab
    fireEvent.click(screen.getByText('Trading'));
    
    // Check if setActiveTab was called with 'trading'
    expect(mockSetActiveTab).toHaveBeenCalledWith('trading');
    
    // Click on Advanced tab
    fireEvent.click(screen.getByText('Advanced'));
    
    // Check if setActiveTab was called with 'advanced'
    expect(mockSetActiveTab).toHaveBeenCalledWith('advanced');
  });
});
