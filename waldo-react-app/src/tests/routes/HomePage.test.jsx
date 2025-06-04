import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../../routes/HomePage';

// Mock react-router-dom and override useOutletContext
vi.mock('react-router-dom', async () => {
  // Import the actual module to retain other exports
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: () => ({
      setAlert: vi.fn(),
      setCharacters: vi.fn(),
      characters: [
        { name: 'Waldo', startX: 0.5, startY: 0.5, endX: 0.6, endY: 0.6 },
        { name: 'Odlaw', startX: 0.7, startY: 0.7, endX: 0.8, endY: 0.8 },
        { name: 'Wizard', startX: 0.9, startY: 0.9, endX: 1.0, endY: 1.0 },
      ],
    }),
  };
});

describe('HomePage route', ()=> {

  it('renders the Game component', () => {
    render(<HomePage />);
    expect(screen.getByTestId('auth-form')).toBeInTheDocument();
  });

})

