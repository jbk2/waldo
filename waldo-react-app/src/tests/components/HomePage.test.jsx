import '../setup.components.js';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../../routes/HomePage';
import { AuthContext } from '../../contexts/AuthContext';

// Mock the Game component since we're testing HomePage
vi.mock('../../components/Game', () => ({
  default: () => <div data-testid="game-section">Game Component</div>
}));

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  Navigate: ({ to }) => <div data-testid="navigate" data-to={to}>Navigate to {to}</div>
}));

describe('HomePage component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('shows loading when not signed in', () => {
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
    expect(screen.getByAltText('Loading')).toBeInTheDocument();
  });

  it('calls navigate to sign-in when not authenticated', () => {
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
    expect(mockNavigate).toHaveBeenCalledWith('/sign-in');
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
});