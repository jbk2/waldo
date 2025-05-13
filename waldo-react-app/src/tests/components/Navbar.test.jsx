import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from '../../components/Navbar';

describe('NavBar component', ()=> {
  it('has a typemark', () => {
    render(<Navbar />);
    expect(screen.getByRole('banner').textContent).toMatch("Where's Waldo?");
  });
  
  it('renders the ScoreBoard component', () => {
    render(<Navbar />);
    expect(screen.getByTestId('score-board')).toBeInTheDocument();
  });

})
