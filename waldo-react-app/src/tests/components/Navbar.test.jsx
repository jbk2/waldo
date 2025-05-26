import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from '../../components/Navbar';

describe('NavBar component', ()=> {
  const alert = null;
  const characters = [
    { name: 'Waldo', startX: 0.5, startY: 0.5, endX: 0.6, endY: 0.6 },
    { name: 'Odlaw', startX: 0.7, startY: 0.7, endX: 0.8, endY: 0.8 },
    { name: 'Wizard', startX: 0.9, startY: 0.9, endX: 1.0, endY: 1.0 },
  ];

  it('has a typemark', () => {
    render(<Navbar alert={alert} characters={characters} />);
    expect(screen.getByRole('banner').textContent).toMatch("Where's Waldo?");
  });
  
  it('renders the ScoreBoard component', () => {
    render(<Navbar alert={alert} characters={characters} />);
    expect(screen.getByTestId('score-board')).toBeInTheDocument();
  });

})
