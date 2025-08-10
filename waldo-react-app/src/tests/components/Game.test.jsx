import '../setup.components.js';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import Game from '../../components/Game';
import createTestRouter from '../testUtils/testRouter';

describe('Game component', () => {
  beforeEach(() => {
    vi.spyOn(Image.prototype, 'src', 'set').mockImplementation(() => {});
  });

  it('renders the game image', async () => {
    const router = createTestRouter(['/']);
    render(
      <RouterProvider router={router}>
        <Game />
      </RouterProvider>
    );

    // Wait for the loading state to disappear
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    const gameImage = screen.getByAltText('placeholderImage');
    expect(gameImage).toBeInTheDocument();
  });

  it('renders the game section container', async () => {
    const router = createTestRouter(['/']);
    render(
      <RouterProvider router={router}>
        <Game />
      </RouterProvider>
    );

    // Wait for the loading state to disappear
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    const gameSection = screen.getByTestId('game-section');
    expect(gameSection).toBeInTheDocument();
  });

  it('shows start game dialog when game is not running', async () => {
    const router = createTestRouter(['/']);
    render(
      <RouterProvider router={router}>
        <Game />
      </RouterProvider>
    );

    // Wait for the loading state to disappear
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Which game would you like to play?')).toBeInTheDocument();
  });
});

