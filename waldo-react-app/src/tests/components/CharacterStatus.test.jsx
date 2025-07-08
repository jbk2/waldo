import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CharacterStatus from '../../components/CharacterStatus';

describe('CharacterStatus component', () => {
  const characters = [{}, {}, {}]

  it('contains images for each character', () => {
    render(<CharacterStatus characters={characters}/>)
    const images = screen.getAllByRole('img')
    expect(images.length).toBe(3)
  })
  
  it('contains for each character', () => {
    render(<CharacterStatus characters={characters}/>)
    const charStatuses = screen.getAllByRole('status')
    expect(charStatuses.length).toBe(3)
  })
})