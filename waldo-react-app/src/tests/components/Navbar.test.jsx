import '../setup.components.js';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from '../../components/Navbar';
import { AuthContext } from '../../contexts/AuthContext';
import GameProvider from '../../contexts/GameContext';
import { GameContext } from '../../contexts/GameContext';
import GamesProvider from '../../contexts/GamesContext';
import UIProvider from '../../contexts/UIContext.jsx';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  Link: ({ children, to, ...props }) => {
    return <a href={to} {...props}>{children}</a>
  }
}));

// Helper to render with minimal context values
function renderNavbar(authValue = { signedIn: true, signOut: vi.fn() }) {
  return render(
    <UIProvider>
      <AuthContext.Provider value={authValue}>
        <GamesProvider>
          <GameProvider>
            <Navbar />
          </GameProvider>
        </GamesProvider>
      </AuthContext.Provider>
    </UIProvider>
  );
}

describe('Navbar component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the CharacterStatus component', () => {
    renderNavbar();
    expect(screen.getByTestId('character-status-col')).toBeInTheDocument();
  });

  it('has a typemark', () => {
    renderNavbar();
    expect(screen.getByTestId('typemark-col')).toBeInTheDocument();
  });

  it('renders the GameTimer component when signed in', () => {
    renderNavbar();
    expect(screen.getByTestId('gametimer-col')).toBeInTheDocument();
  });

  it('renders the Competition Board Link when signed in', () => {
    renderNavbar();
    const competitionBoardLink = screen.getByRole('link', { name: 'Competition Board' });
    expect(competitionBoardLink).toBeInTheDocument();
    expect(competitionBoardLink).toHaveAttribute('href', '/competition-board');
  });

  it('does not render the Competition Board Link when not signed in', () => {
    renderNavbar({ signedIn: false, signOut: vi.fn() });
    expect(screen.queryByRole('link', { name: 'Competition Board' })).not.toBeInTheDocument();
  });

  it('does not render logout button when not signed in', () => {
    renderNavbar({ signedIn: false, signOut: vi.fn() });
    expect(screen.queryByRole('button', { name: 'SignOut' })).not.toBeInTheDocument();
  });

  it('calls reset when typemark is clicked', () => {
    const mockReset = vi.fn();
    render(
      <UIProvider>
        <AuthContext.Provider value={{ signedIn: true, signOut: vi.fn() }}>
          <GamesProvider>
            <GameContext.Provider value={{ resetGame: mockReset }}>
              <Navbar />
            </GameContext.Provider>
          </GamesProvider>
        </AuthContext.Provider>
      </UIProvider>
    );
    
    const typemark = screen.getByText("Where's Waldo?");
    typemark.click();
    expect(mockReset).toHaveBeenCalled();
  });
});
