import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Game from '../../components/Game';

describe('Game component', ()=> {
  const setAlert = vi.fn();
  const setCharacters = vi.fn();
  const characters = [
    { name: 'Waldo', startX: 0.5, startY: 0.5, endX: 0.6, endY: 0.6 },
  ];

  it('has an image', () => {
    render(<Game setAlert={setAlert} characters={characters} setCharacters={setCharacters} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
})

