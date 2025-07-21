import '../setup.components.js';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CharacterStatus from '../../components/CharacterStatus';
import GameProvider from '../../contexts/GameContext';
import UIProvider from '../../contexts/UIContext.jsx';

describe('CharacterStatus component', () => {
  it('contains images for each character', () => {
    render(
      <UIProvider>
        <GameProvider>
          <CharacterStatus />
        </GameProvider>
      </UIProvider>
    );
    
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(3);
  });
  
  it('contains status for each character', () => {
    render(
      <UIProvider>
        <GameProvider>
          <CharacterStatus />
        </GameProvider>
      </UIProvider>
    );
    
    const charStatuses = screen.getAllByRole('status');
    expect(charStatuses.length).toBe(3);
  });

  it('shows "Not Found" status for all characters initially', () => {
    render(
      <UIProvider>
        <GameProvider>
          <CharacterStatus />
        </GameProvider>
      </UIProvider>
    );
    
    // All characters should show "Not Found" initially
    const notFoundStatuses = screen.getAllByText('Not Found');
    expect(notFoundStatuses.length).toBe(3);
  });

  it('displays character names as alt text for images', () => {
    render(
      <UIProvider>
        <GameProvider>
          <CharacterStatus />
        </GameProvider>
      </UIProvider>
    );
    
    const waldoImage = screen.getByAltText('waldo');
    const wendaImage = screen.getByAltText('wenda');
    const odlawImage = screen.getByAltText('odlaw');
    
    expect(waldoImage).toBeInTheDocument();
    expect(wendaImage).toBeInTheDocument();
    expect(odlawImage).toBeInTheDocument();
  });
});