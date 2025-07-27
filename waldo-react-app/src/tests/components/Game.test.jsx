import '../setup.components.js';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Game from '../../components/Game';
import GameProvider from '../../contexts/GameContext';
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
          <GameProvider>
            <Game />
          </GameProvider>
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
          <GameProvider>
            <Game />
          </GameProvider>
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
          <GameProvider>
            <Game />
          </GameProvider>
        </AuthProvider>
      </UIProvider>
    );
    
    expect(screen.getByText('Which game would you like to play?')).toBeInTheDocument();
  });

  // it('has clickable image when game is running', async () => {
  //   const user = userEvent.setup();

  //   render(
  //     <UIProvider>
  //       <AuthProvider>
  //         <GameProvider>
  //           <Game />
  //         </GameProvider>
  //       </AuthProvider>
  //     </UIProvider>
  //   );
    
  //   const placeholderImage = await screen.findByRole('img', { name: /placeholderImage/ });
  //   expect(placeholderImage).toBeInTheDocument();
  //   const cakeFactoryBtn = await screen.findByRole('button', { name: 'Cake Factory' })
  //   await user.click(cakeFactoryBtn);
  //   const cakeImage = await screen.findByRole('img', { name: 'cake-factory' });
  //   await user.click(cakeImage);
  // });
});

