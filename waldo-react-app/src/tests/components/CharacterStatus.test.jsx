import '../setup.components.js';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import CharacterStatus from '../../components/CharacterStatus';
import { AuthContext } from '../../contexts/AuthContext';
import GameProvider from '../../contexts/GameContext';
import GamesProvider from '../../contexts/GamesContext';
import UIProvider from '../../contexts/UIContext.jsx';
import { GameContext } from '../../contexts/GameContext';

// Helper to render with minimal context values
function renderCharacterStatus(characters = null) {
  const mockAuthValue = {
    signedIn: true,
    signOut: vi.fn()
  };

  const mockGameValue = {
    characters: characters || [
      { id: 'waldo', name: 'waldo', clicked: false },
      { id: 'wenda', name: 'wenda', clicked: false },
      { id: 'odlaw', name: 'odlaw', clicked: false }
    ]
  };

  return render(
    <UIProvider>
      <AuthContext.Provider value={mockAuthValue}>
        <GamesProvider>
          <GameContext.Provider value={mockGameValue}>
            <CharacterStatus />
          </GameContext.Provider>
        </GamesProvider>
      </AuthContext.Provider>
    </UIProvider>
  );
}

describe('CharacterStatus component', () => {
  beforeEach(() => {
    vi.spyOn(Image.prototype, 'src', 'set').mockImplementation(() => {});
  });

  it('contains images for each character', () => {
    renderCharacterStatus();
    
    expect(screen.getByAltText('waldo')).toBeInTheDocument();
    expect(screen.getByAltText('wenda')).toBeInTheDocument();
    expect(screen.getByAltText('odlaw')).toBeInTheDocument();
  });

  it('contains status for each character', () => {
    renderCharacterStatus();
    
    const notFoundElements = screen.getAllByText('Not Found');
    expect(notFoundElements).toHaveLength(3);
  });

  it('shows "Not Found" status for all characters initially', () => {
    renderCharacterStatus();
    
    const notFoundElements = screen.getAllByText('Not Found');
    expect(notFoundElements).toHaveLength(3);
  });

  it('displays character names as alt text for images', () => {
    renderCharacterStatus();
    
    expect(screen.getByAltText('waldo')).toBeInTheDocument();
    expect(screen.getByAltText('wenda')).toBeInTheDocument();
    expect(screen.getByAltText('odlaw')).toBeInTheDocument();
  });

  it('displays found if character is clicked', () => {
    // Only provide what CharacterStatus actually needs
    const charactersWithWaldoFound = [
      { id: 'waldo', name: 'waldo', clicked: true },
      { id: 'wenda', name: 'wenda', clicked: false },
      { id: 'odlaw', name: 'odlaw', clicked: false }
    ];
    
    renderCharacterStatus(charactersWithWaldoFound);
    
    // Check that waldo shows "Found ✅"
    expect(screen.getByText('Found ✅')).toBeInTheDocument();
    
    // Check that other characters still show "Not Found"
    const notFoundElements = screen.getAllByText('Not Found');
    expect(notFoundElements).toHaveLength(2);
  });
});