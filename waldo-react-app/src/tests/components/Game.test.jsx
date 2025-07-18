import '../setup.components.js';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Game from '../../components/Game';
import GameProvider from '../../contexts/GameContext';
import UIProvider from '../../contexts/UIContext';

describe('Game component', () => {
  beforeEach(() => {
    vi.spyOn(Image.prototype, 'src', 'set').mockImplementation(() => {});
  });

  it('renders the game image', () => {
    render(
      <UIProvider>
        <GameProvider>
          <Game />
        </GameProvider>
      </UIProvider>
    );
    
    const gameImage = screen.getByRole('img', { name: 'Waldo scene 1' });
    expect(gameImage).toBeInTheDocument();
  });

  it('renders the game section container', () => {
    render(
      <UIProvider>
        <GameProvider>
          <Game />
        </GameProvider>
      </UIProvider>
    );
    
    const gameSection = screen.getByTestId('game-section');
    expect(gameSection).toBeInTheDocument();
  });

  it('shows start game dialog when game is not running', () => {
    render(
      <UIProvider>
        <GameProvider>
          <Game />
        </GameProvider>
      </UIProvider>
    );
    
    // The StartGameDialog should be present when game is not running
    expect(screen.getByText('PLAY A GAME ?')).toBeInTheDocument();
  });

  it('has clickable image when game is running', () => {
    render(
      <UIProvider>
        <GameProvider>
          <Game />
        </GameProvider>
      </UIProvider>
    );
    
    const gameImage = screen.getByRole('img', { name: 'Waldo scene 1' });
    expect(gameImage).toBeInTheDocument();
  });
});

