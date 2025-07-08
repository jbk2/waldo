import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useOutletContext } from 'react-router-dom';
import Game from '../../components/Game';

// mock entire react-router-dom module
vi.mock('react-router-dom', () => ({
  useOutletContext: vi.fn()
}));

describe('Game component', ()=> {
  const showAlert = vi.fn();
  const setCharacters = vi.fn();
  const characters = [
      { name: 'Waldo', startX: 0.5, startY: 0.5, endX: 0.6, endY: 0.6, clicked: false },
      { name: 'Odlaw', startX: 0.7, startY: 0.7, endX: 0.8, endY: 0.8, clicked: false },
      { name: 'Wizard', startX: 0.9, startY: 0.9, endX: 1.0, endY: 1.0, clicked: false }
  ];

  beforeEach(() => {
    useOutletContext.mockReturnValue({ showAlert, characters, setCharacters })
  });

  it('has an image', () => {
    render(<Game />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
})

