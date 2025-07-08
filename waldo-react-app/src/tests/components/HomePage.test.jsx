import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, } from '@testing-library/react';
import HomePage from '../../routes/HomePage';
import { useNavigate, useOutletContext } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useOutletContext: vi.fn()
}));

describe('HomePage component', () => {
  const mockedNavigation = vi.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockedNavigation);
  });
  
  it('redirects to sign-in when not logged in', async () => {
    useOutletContext.mockReturnValue({loggedIn: false});
    render(<HomePage />);    
    expect(mockedNavigation).toHaveBeenCalledWith('/sign-in');
  });
  
        
  it('renders Game when logged in', () => {
    useOutletContext.mockReturnValue({ 
      loggedIn: true,
      showAlert: vi.fn(),
      characters: [],
      setCharacters: vi.fn()
    });
    render(<HomePage />);
    expect(screen.getByTestId('game-section')).toBeInTheDocument();
  });
});