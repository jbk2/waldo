import '../setup.components.js';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from '../../components/Navbar';
import { AuthContext } from '../../contexts/AuthContext';
import GameProvider from '../../contexts/GameContext';
import UIProvider from '../../contexts/UIContext.jsx';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  Link: ({ children, to, ...props }) => {
    return <a href={to} {...props}>{children}</a>
  }
}));

describe('Navbar component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the CharacterStatus component', () => {
    const mockAuthValue = {
      signedIn: true,
      signOut: vi.fn()
    };

    render(
      <UIProvider>
        <AuthContext.Provider value={mockAuthValue}>
          <GameProvider>
            <Navbar />
          </GameProvider>
        </AuthContext.Provider>
      </UIProvider>
    );
    expect(screen.getByTestId('character-status-col')).toBeInTheDocument();
  });

  it('has a typemark', () => {
    const mockAuthValue = {
      signedIn: true,
      signOut: vi.fn()
    };

    render(
      <UIProvider>
        <AuthContext.Provider value={mockAuthValue}>
          <GameProvider>
            <Navbar />
          </GameProvider>
        </AuthContext.Provider>
      </UIProvider>
    );
    expect(screen.getByTestId('typemark-col')).toBeInTheDocument();
  });

  it('renders the GameTimer component when signed in', () => {
    const mockAuthValue = {
      signedIn: true,
      signOut: vi.fn()
    };

    render(
      <UIProvider>
        <AuthContext.Provider value={mockAuthValue}>
          <GameProvider>
            <Navbar />
          </GameProvider>
        </AuthContext.Provider>
      </UIProvider>
    );
    expect(screen.getByTestId('gametimer-col')).toBeInTheDocument();
  });

  it('renders the Competition Board Link when signed in', () => {
    const mockAuthValue = {
      signedIn: true,
      signOut: vi.fn()
    };

    render(
      <UIProvider>
        <AuthContext.Provider value={mockAuthValue}>
          <GameProvider>
            <Navbar />
          </GameProvider>
        </AuthContext.Provider>
      </UIProvider>
    );
    expect(screen.getByRole('link', { name: 'Competition Board' })).toBeInTheDocument();
  });

  it('does not render logout button when not signed in', () => {
    const mockAuthValue = {
      signedIn: false,
      signOut: vi.fn()
    };

    render(
      <UIProvider>
        <AuthContext.Provider value={mockAuthValue}>
          <GameProvider>
            <Navbar />
          </GameProvider>
        </AuthContext.Provider>
      </UIProvider>
    );
    expect(screen.getByTestId('gametimer-col')).toBeInTheDocument();
    // GameTimer should still be there but logout button should not be
    expect(screen.queryByText('SignOut')).not.toBeInTheDocument();
    expect(screen.queryByText('SignIn')).toBeInTheDocument();
  });

  it('calls navigate when typemark is clicked', () => {
    const mockAuthValue = {
      signedIn: true,
      signOut: vi.fn()
    };

    render(
      <UIProvider>
        <AuthContext.Provider value={mockAuthValue}>
          <GameProvider>
            <Navbar />
          </GameProvider>
        </AuthContext.Provider>
      </UIProvider>
    );
    
    const typemark = screen.getByText("Where's Waldo?");
    typemark.click();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
