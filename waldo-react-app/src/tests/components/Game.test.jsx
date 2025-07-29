import '../setup.components.js';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Game from '../../components/Game';
import GameProvider from '../../contexts/GameContext';
import GamesProvider from '../../contexts/GamesContext';
import UIProvider from '../../contexts/UIContext';
import AuthProvider from '../../contexts/AuthContext.jsx';

describe('Game component', () => {
  beforeEach(() => {
    vi.spyOn(Image.prototype, 'src', 'set').mockImplementation(() => {});
  });

  it('renders the game image', () => {
    render(
      <UIProvider>
        <AuthProvider>
          <GamesProvider>
            <GameProvider>
              <Game />
            </GameProvider>
          </GamesProvider>
        </AuthProvider>
      </UIProvider>
    );
    
    const gameImage = screen.getByAltText(/Waldo scene 1|placeholderImage/);
    expect(gameImage).toBeInTheDocument();
  });

  it('renders the game section container', () => {
    render(
      <UIProvider>
        <AuthProvider>
          <GamesProvider>
            <GameProvider>
              <Game />
            </GameProvider>
          </GamesProvider>
        </AuthProvider>
      </UIProvider>
    );
    
    const gameSection = screen.getByTestId('game-section');
    expect(gameSection).toBeInTheDocument();
  });

  it('shows start game dialog when game is not running', () => {
    render(
      <UIProvider>
        <AuthProvider>
          <GamesProvider>
            <GameProvider>
              <Game />
            </GameProvider>
          </GamesProvider>
        </AuthProvider>
      </UIProvider>
    );
    
    expect(screen.getByText('Which game would you like to play?')).toBeInTheDocument();
  });
});

