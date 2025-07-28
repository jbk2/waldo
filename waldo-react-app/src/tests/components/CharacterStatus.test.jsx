import '../setup.components.js';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CharacterStatus from '../../components/CharacterStatus';
import GameProvider from '../../contexts/GameContext';
import { GameContext } from '../../contexts/GameContext';
import UIProvider from '../../contexts/UIContext.jsx';
import AuthProvider from '../../contexts/AuthContext.jsx';
import GamesProvider from '../../contexts/GamesContext.jsx';

describe('CharacterStatus component', () => {
  it('contains images for each character', () => {
    render(
      <UIProvider>
        <AuthProvider>
          <GamesProvider>
            <GameProvider>
              <CharacterStatus />
            </GameProvider>
          </GamesProvider>
        </AuthProvider>
      </UIProvider>
    );
    
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(3);
  });
  
  it('contains status for each character', () => {
    render(
      <UIProvider>
        <AuthProvider>
          <GamesProvider>
            <GameProvider>
              <CharacterStatus />
            </GameProvider>
          </GamesProvider>
        </AuthProvider>
      </UIProvider>
    );
    
    const charStatuses = screen.getAllByRole('status');
    expect(charStatuses.length).toBe(3);
  });

  it('shows "Not Found" status for all characters initially', () => {
    render(
      <UIProvider>
        <AuthProvider>
          <GamesProvider>
            <GameProvider>
              <CharacterStatus />
            </GameProvider>
          </GamesProvider>
        </AuthProvider>
      </UIProvider>
    );
    
    // All characters should show "Not Found" initially
    const notFoundStatuses = screen.getAllByText('Not Found');
    expect(notFoundStatuses.length).toBe(3);
  });

  it('displays character names as alt text for images', () => {
    render(
      <UIProvider>
        <AuthProvider>
          <GamesProvider>
            <GameProvider>
              <CharacterStatus />
            </GameProvider>
          </GamesProvider>
        </AuthProvider>
      </UIProvider>
    );
    
    const waldoImage = screen.getByAltText('waldo');
    const wendaImage = screen.getByAltText('wenda');
    const odlawImage = screen.getByAltText('odlaw');
    
    expect(waldoImage).toBeInTheDocument();
    expect(wendaImage).toBeInTheDocument();
    expect(odlawImage).toBeInTheDocument();
  });

  it('displays found if character is clicked', () => {
    const mockCharacters = [
      { id: 1, name: 'waldo', clicked: true },
      { id: 2, name: 'wenda', clicked: false },
      { id: 3, name: 'odlaw', clicked: false }
    ]

    render(
      <UIProvider>
        <AuthProvider>
          <GamesProvider>
            <GameProvider>
              <GameContext.Consumer>
                {(contextValue => (
                  <GameContext.Provider value={{ ...contextValue, characters: mockCharacters }}>
                    <CharacterStatus />
                  </GameContext.Provider>
                ))}
              </GameContext.Consumer>
            </GameProvider>
          </GamesProvider>
        </AuthProvider>
      </UIProvider>
    );

    const foundStatuses = screen.getAllByText(/Found ✅/);
    expect(foundStatuses.length).toBe(1);
  });
});