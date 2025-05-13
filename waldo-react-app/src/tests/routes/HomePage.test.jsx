import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../../routes/HomePage';

describe('HomePage route', ()=> {
  it('renders the GamePage component', () => {
    render(<HomePage />);
    expect(screen.getByTestId('game-section')).toBeInTheDocument();
  });

})

