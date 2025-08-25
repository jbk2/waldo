import '../setup.components.js';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../../routes/HomePage';
import userEvent from '@testing-library/user-event';

// Mock the Game component
vi.mock('../../components/Game', () => ({
  default: () => <div data-testid="game-component">Game Component</div>
}));

// Mock the Welcome component
vi.mock('../../components/Welcome', () => ({
  default: ({ setViewedWelcome }) => (
    <div data-testid="welcome-component">
      <button onClick={() => setViewedWelcome(true)}>Proceed to app</button>
      Welcome Component
    </div>
  )
}));

describe('HomePage component', () => {
  it('renders Welcome if not yet viewed', () => {
    
    render(<HomePage />);
    
    expect(screen.getByTestId('welcome-component')).toBeInTheDocument();
  });
  
  it('renders Game when Welcome has been viewed', async () => {

    const user = userEvent.setup();
    
    render(<HomePage />);
    expect(screen.getByTestId('welcome-component')).toBeInTheDocument();
    
    const proceedButton = screen.getByText('Proceed to app');
    await user.click(proceedButton)
    
    expect(screen.getByTestId('game-component')).toBeInTheDocument();
    expect(screen.queryByTestId('welcome-component')).not.toBeInTheDocument();
  });

});