import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from '../../../src/ui/components/Layout';

// Mock the Header and Sidebar components
jest.mock('../../../src/ui/components/Header', () => {
  return function MockHeader({ title, onMenuClick }) {
    return <div data-testid="mock-header">{title}</div>;
  };
});

jest.mock('../../../src/ui/components/Sidebar', () => {
  return function MockSidebar({ active }) {
    return <div data-testid="mock-sidebar">{active}</div>;
  };
});

describe('Layout Component', () => {
  test('renders header with correct title', () => {
    render(
      <Layout title="Test Title">
        <div>Test Content</div>
      </Layout>
    );
    
    // Check if header is rendered with correct title
    expect(screen.getByTestId('mock-header')).toHaveTextContent('Test Title');
  });

  test('renders sidebar with correct active state', () => {
    render(
      <Layout title="Test Title">
        <div>Test Content</div>
      </Layout>
    );
    
    // Check if sidebar is rendered with correct active state
    expect(screen.getByTestId('mock-sidebar')).toHaveTextContent('Test Title');
  });

  test('renders children content', () => {
    render(
      <Layout title="Test Title">
        <div data-testid="test-content">Test Content</div>
      </Layout>
    );
    
    // Check if children content is rendered
    expect(screen.getByTestId('test-content')).toHaveTextContent('Test Content');
  });
});
