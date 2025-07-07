import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from '../../components/Navbar';

describe('NavBar component', ()=> {
  const characters = [
    { name: 'Waldo', startX: 0.5, startY: 0.5, endX: 0.6, endY: 0.6 },
    { name: 'Odlaw', startX: 0.7, startY: 0.7, endX: 0.8, endY: 0.8 },
    { name: 'Wizard', startX: 0.9, startY: 0.9, endX: 1.0, endY: 1.0 },
  ];
  const logOut = vi.fn();

  vi.mock('react-router-dom', () => ({
    useNavigate: () => vi.fn()
  }));

  it('renders the CharacterStatus component', () => {
    render(<Navbar characters={characters} loggedIn={false} logOut={logOut} />);
    expect(screen.getByTestId('character-status-col')).toBeInTheDocument();
  });

  it('has a typemark', () => {
    render(<Navbar characters={characters} loggedIn={false} logOut={logOut} />);
    expect(screen.getByTestId('typemark-col')).toBeInTheDocument();
  });
  

  it('renders the ScoreBoard component', () => {
    render(<Navbar characters={characters} loggedIn={false} logOut={logOut} />);
    expect(screen.getByTestId('scoreboard-col')).toBeInTheDocument();
  });

})
