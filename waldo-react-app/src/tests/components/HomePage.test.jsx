import '../setup.components.js';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../../routes/HomePage';
import { AuthContext } from '../../contexts/AuthContext';

// Mock the Game component since we're testing HomePage
vi.mock('../../components/Game', () => ({
  default: () => <div data-testid="game-section">Game Component</div>
}));

// Mock react-router-dom Navigate component
vi.mock('react-router-dom', () => ({
  Navigate: ({ to, replace }) => (
    <div data-testid="navigate" data-to={to} data-replace={replace}>
      Navigate to {to}
    </div>
  )
}));

describe('HomePage component', () => {
  it('renders Navigate to sign-in when not authenticated', () => {
    const mockAuthValue = {
      authenticate: vi.fn(),
      authChecked: true,
      signedIn: false,
      user: null
    };

    render(
      <AuthContext.Provider value={mockAuthValue}>
        <HomePage />
      </AuthContext.Provider>
    );
    
    const navigateElement = screen.getByTestId('navigate');
    expect(navigateElement).toBeInTheDocument();
    expect(navigateElement).toHaveAttribute('data-to', '/sign-in');
    expect(navigateElement).toHaveAttribute('data-replace', 'true');
  });

  it('renders Game when authenticated', () => {
    const mockAuthValue = {
      authenticate: vi.fn(),
      authChecked: true,
      signedIn: true,
      user: { id: 1, email: 'test@example.com' }
    };

    render(
      <AuthContext.Provider value={mockAuthValue}>
        <HomePage />
      </AuthContext.Provider>
    );
    
    expect(screen.getByTestId('game-section')).toBeInTheDocument();
  });

  it('does not render Navigate when authenticated', () => {
    const mockAuthValue = {
      authenticate: vi.fn(),
      authChecked: true,
      signedIn: true,
      user: { id: 1, email: 'test@example.com' }
    };

    render(
      <AuthContext.Provider value={mockAuthValue}>
        <HomePage />
      </AuthContext.Provider>
    );
    
    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();
  });
});