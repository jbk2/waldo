import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ScoreBoard from '../../components/ScoreBoard';

describe('ScoreBoard component', () => {
  
  it('contains a time reading text', () => {
    render(<ScoreBoard />)
    expect(screen.getByText(/Elapsed time/)).toBeInTheDocument();
  })
  
  // it('is actually counting time', async () => {
  //   render(<ScoreBoard />)
  //   const initialText = screen.getByText(/Elapsed time/).textContent;

  //   await waitFor(() => {
  //     const updatedText = screen.getByText(/Elapsed time/).textContent;
  //     expect(updatedText).not.toBe(initialText);
  //   }, { timeout: 2000 } )
  // })
})