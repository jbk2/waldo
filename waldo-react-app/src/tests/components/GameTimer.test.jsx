import '../setup.components.js';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import GameTimer from '../../components/GameTimer';
import { GameContext } from '../../contexts/GameContext.jsx';
import { TimerContext } from '../../contexts/TimerContext.jsx';

describe('GameTimer component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows 0.00s when game is idle', () => {
    const mockGameValue = {
      gameState: 'idle',
      GAME_STATES: {
        IDLE: 'idle',
        LOADING: 'loading',
        PLAYING: 'playing',
        COMPLETED: 'completed'
      },
      gameCompletedLength: null
    };
    
    const mockTimerValue = {
      getStartTime: () => Date.now()
    };

    render(
      <GameContext.Provider value={mockGameValue}>
        <TimerContext.Provider value={mockTimerValue}>
          <GameTimer />
        </TimerContext.Provider>
      </GameContext.Provider>
    );
    
    expect(screen.getByText('0.00')).toBeInTheDocument();
  });

  it('starts counting when game state changes to playing', async () => {
    const mockGameValue = {
      gameState: 'idle',
      GAME_STATES: {
        IDLE: 'idle',
        LOADING: 'loading',
        PLAYING: 'playing',
        COMPLETED: 'completed'
      },
      gameCompletedLength: null
    };
    
    const startTime = Date.now();
    const mockTimerValue = {
      getStartTime: () => startTime
    };

    const { rerender } = render(
      <GameContext.Provider value={mockGameValue}>
        <TimerContext.Provider value={mockTimerValue}>
          <GameTimer />
        </TimerContext.Provider>
      </GameContext.Provider>
    );

    expect(screen.getByText('0.00')).toBeInTheDocument();

    // Change game state to playing
    const playingGameValue = { ...mockGameValue, gameState: 'playing' };
    
    rerender(
      <GameContext.Provider value={playingGameValue}>
        <TimerContext.Provider value={mockTimerValue}>
          <GameTimer />
        </TimerContext.Provider>
      </GameContext.Provider>
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Should now show approx. 1.00s
    const timeElement = screen.getByText(/^\d+\.\d{2}$/);
    const timeValue = parseFloat(timeElement.textContent);
    expect(timeValue).toBeGreaterThan(0.9);
    expect(timeValue).toBeLessThan(1.1);
  });

  it('stops counting when game state changes from playing to idle', async () => {
    const startTime = Date.now();
    const mockTimerValue = {
      getStartTime: () => startTime
    };

    const playingGameValue = {
      gameState: 'playing',
      GAME_STATES: {
        IDLE: 'idle',
        LOADING: 'loading',
        PLAYING: 'playing',
        COMPLETED: 'completed'
      },
      gameCompletedLength: null
    };

    const { rerender } = render(
      <GameContext.Provider value={playingGameValue}>
        <TimerContext.Provider value={mockTimerValue}>
          <GameTimer />
        </TimerContext.Provider>
      </GameContext.Provider>
    );

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Should show approximately 2.00s
    let timeElement = screen.getByText(/^\d+\.\d{2}$/);
    let timeValue = parseFloat(timeElement.textContent);
    expect(timeValue).toBeGreaterThan(1.9);
    expect(timeValue).toBeLessThan(2.1);

    // Change game state to idle
    const idleGameValue = { ...playingGameValue, gameState: 'idle' };
    
    rerender(
      <GameContext.Provider value={idleGameValue}>
        <TimerContext.Provider value={mockTimerValue}>
          <GameTimer />
        </TimerContext.Provider>
      </GameContext.Provider>
    );

    // Should reset to 0.00
    expect(screen.getByText('0.00')).toBeInTheDocument();
  });

  it('shows completed game time when game is completed', () => {
    const mockGameValue = {
      gameState: 'completed',
      GAME_STATES: {
        IDLE: 'idle',
        LOADING: 'loading',
        PLAYING: 'playing',
        COMPLETED: 'completed'
      },
      gameCompletedLength: 3500 // 3.5 seconds in milliseconds
    };
    
    const mockTimerValue = {
      getStartTime: () => Date.now()
    };

    render(
      <GameContext.Provider value={mockGameValue}>
        <TimerContext.Provider value={mockTimerValue}>
          <GameTimer />
        </TimerContext.Provider>
      </GameContext.Provider>
    );
    
    expect(screen.getByText('3.50')).toBeInTheDocument();
  });

  it('updates timer display every 20ms when playing', async () => {
    const startTime = Date.now();
    const mockTimerValue = {
      getStartTime: () => startTime
    };

    const playingGameValue = {
      gameState: 'playing',
      GAME_STATES: {
        IDLE: 'idle',
        LOADING: 'loading',
        PLAYING: 'playing',
        COMPLETED: 'completed'
      },
      gameCompletedLength: null
    };

    render(
      <GameContext.Provider value={playingGameValue}>
        <TimerContext.Provider value={mockTimerValue}>
          <GameTimer />
        </TimerContext.Provider>
      </GameContext.Provider>
    );

    act(() => {
      vi.advanceTimersByTime(50);
    });

    const timeElement = screen.getByText(/^\d+\.\d{2}$/);
    const timeValue = parseFloat(timeElement.textContent);
    expect(timeValue).toBeCloseTo(0.05, 1);
    expect(timeValue).toBeLessThan(0.06);
  });
});