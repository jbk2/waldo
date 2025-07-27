import '../setup.components.js';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GameTimer from '../../components/GameTimer';
import { GameContext } from '../../contexts/GameContext.jsx';

describe('GameTimer component', () => {
  it('contains a time reading text', () => {
    const mockGameValue = {
      gameElapsedTime: 0,
      gameRunning: false,
      gamePlayed: false,
      characters: [],
      setCharacters: () => {},
      gameCompletedLength: null,
      startGame: () => {},
      stopGame: () => {}
    };

    render(
      <GameContext.Provider value={mockGameValue}>
        <GameTimer />
      </GameContext.Provider>
    );
    expect(screen.getByText(/Elapsed time/)).toBeInTheDocument();
  });

  it('displays elapsed time in seconds', () => {
    const mockGameValue = {
      gameElapsedTime: 1500, // 1.5 seconds
      gameRunning: false,
      gamePlayed: false,
      characters: [],
      setCharacters: () => {},
      gameCompletedLength: null,
      startGame: () => {},
      stopGame: () => {}
    };

    render(
      <GameContext.Provider value={mockGameValue}>
        <GameTimer />
      </GameContext.Provider>
    );
    expect(screen.getByText(/s$/)).toBeInTheDocument(); // Check for "s" suffix
  });

  it('shows time with proper formatting', () => {
    const mockGameValue = {
      gameElapsedTime: 2500, // 2.5 seconds
      gameRunning: false,
      gamePlayed: false,
      characters: [],
      setCharacters: () => {},
      gameCompletedLength: null,
      startGame: () => {},
      stopGame: () => {}
    };

    render(
      <GameContext.Provider value={mockGameValue}>
        <GameTimer />
      </GameContext.Provider>
    );
    // Check for the time value and "s" separately since they're in different spans
    expect(screen.getByText('2.50')).toBeInTheDocument();
    expect(screen.getByText('s')).toBeInTheDocument();
  });
});