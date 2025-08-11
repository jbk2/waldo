import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { GameContext } from '../../contexts/GameContext.jsx';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import EndGameDialog from '../../components/EndGameDialog.jsx';
import { GamesContext } from '../../contexts/GamesContext.jsx';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  Link: ({ children, to, state, ...props }) => (
    <a href={to} data-state={JSON.stringify(state)} {...props}>{children}</a>
  )
}));

describe('EndGameDialog component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const authContextVal = {
    signedIn: false
  };

  const gamesContextVal = {
    images: [
      { id: 1, title: 'cake-factory', url: 'test-image.jpg', difficulty: 'easy' },
      { id: 2, title: 'ali-baba', url: 'test-image.jpg', difficulty: 'medium' },
      { id: 3, title: 'musketeers', url: 'test-image.jpg', difficulty: 'difficult' },
      { id: 4, title: 'troy', url: 'test-image.jpg', difficulty: 'very_difficult' }
    ],
    DIFFICULTY_PROPS: {
      easy: { color: 'text-green-500', label: 'easy' },
      medium: { color: 'text-yellow-500', label: 'med' },
      difficult: { color: 'text-orange-500', label: 'diff' },
      very_difficult: { color: 'text-red-500', label: 'v.diff' }
    }
  };

  const gameContextVal = {
    gameCompletedLength: 1500,
    resetGame: vi.fn(),
    gameImage: { title: 'img1', id: 1 } 
  };

  const renderEndGameDialog = (authContextVal, gamesContextVal, gameContextVal) => {
    return render(
      <AuthContext.Provider value={authContextVal}>
        <GamesContext.Provider value={gamesContextVal}>
          <GameContext.Provider value={gameContextVal} >
            <EndGameDialog />  
          </GameContext.Provider>
        </GamesContext.Provider>
      </AuthContext.Provider>
    );
  };

  it('renders the correct completed game time in seconds', () => {
    renderEndGameDialog(authContextVal, gamesContextVal, gameContextVal);
    
    expect(screen.getByText('1.50')).toBeInTheDocument();
  })
  
  it('renders sign in / up links if not signed in', () => {
    renderEndGameDialog(authContextVal, gamesContextVal, gameContextVal);
    
    expect(screen.getByText((content, element) => {
      return element.textContent.trim().toLowerCase() === 'sign in';
    })).toBeInTheDocument();
    
    expect(screen.getByText((content, element) => {
      return element.textContent.trim().toLowerCase() === 'sign up';
    })).toBeInTheDocument();
  })
  
  it("renders competition board link, not sign up/in links, if already signed in ", () => {
    const signedInContextVal = { signedIn: true };
    
    renderEndGameDialog(signedInContextVal, gamesContextVal, gameContextVal);

    expect(screen.queryByText(/^\s*Sign in\s*$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^\s*sign up\s*$/)).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'here' })).toBeInTheDocument();  
  })

})
