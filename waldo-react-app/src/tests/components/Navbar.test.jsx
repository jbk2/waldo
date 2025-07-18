import '../setup.components.js';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from '../../components/Navbar';
import { AuthContext } from '../../contexts/AuthContext';
import GameProvider from '../../contexts/GameContext';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
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
      <AuthContext.Provider value={mockAuthValue}>
        <GameProvider>
          <Navbar />
        </GameProvider>
      </AuthContext.Provider>
    );
    expect(screen.getByTestId('character-status-col')).toBeInTheDocument();
  });

  it('has a typemark', () => {
    const mockAuthValue = {
      signedIn: true,
      signOut: vi.fn()
    };

    render(
      <AuthContext.Provider value={mockAuthValue}>
        <GameProvider>
          <Navbar />
        </GameProvider>
      </AuthContext.Provider>
    );
    expect(screen.getByTestId('typemark-col')).toBeInTheDocument();
  });

  it('renders the ScoreBoard component when signed in', () => {
    const mockAuthValue = {
      signedIn: true,
      signOut: vi.fn()
    };

    render(
      <AuthContext.Provider value={mockAuthValue}>
        <GameProvider>
          <Navbar />
        </GameProvider>
      </AuthContext.Provider>
    );
    expect(screen.getByTestId('scoreboard-col')).toBeInTheDocument();
  });

  it('does not render logout button when not signed in', () => {
    const mockAuthValue = {
      signedIn: false,
      signOut: vi.fn()
    };

    render(
      <AuthContext.Provider value={mockAuthValue}>
        <GameProvider>
          <Navbar />
        </GameProvider>
      </AuthContext.Provider>
    );
    expect(screen.getByTestId('scoreboard-col')).toBeInTheDocument();
    // ScoreBoard should still be there but logout button should not be
    expect(screen.queryByText('LogOut')).not.toBeInTheDocument();
  });

  it('calls navigate when typemark is clicked', () => {
    const mockAuthValue = {
      signedIn: true,
      signOut: vi.fn()
    };

    render(
      <AuthContext.Provider value={mockAuthValue}>
        <GameProvider>
          <Navbar />
        </GameProvider>
      </AuthContext.Provider>
    );
    
    const typemark = screen.getByText("Where's Waldo?");
    typemark.click();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
