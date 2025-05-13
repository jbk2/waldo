import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Game from '../../components/Game';

describe('Game component', ()=> {
  it('has an image', () => {
    render(<Game />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

})

