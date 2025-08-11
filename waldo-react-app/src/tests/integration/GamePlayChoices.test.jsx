import '../setup.components.js';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import createTestRouter from '../testUtils/testRouter.jsx';
import { capitalize } from '../../utils/stringUtils.js';

describe('GamePlayChoices component', () => {

  const testRouter = createTestRouter(['/']);

  it('renders the buttons with difficulty labels from the images via /api/images', async () => {
    render(<RouterProvider router={testRouter} />);
    
    await waitFor(async () => {
      const response = await fetch('/api/images');
      const data = await response.json();
      const imageTitlesAndDifficulties = data.images.map((img) => {
        return({ title: capitalize(img.title), difficulty: img.difficulty });
      });
      const difficultyTexts = {
        'easy': 'easy',
        'medium': 'med',
        'difficult': 'diff',
        'very_difficult': 'v.diff'
      };
      
      imageTitlesAndDifficulties.forEach((titleAndDiff) => {
        const button = screen.getByRole('button', { name: titleAndDiff.title });
        const diffLabel = button.parentElement?.querySelector('div[class*="text-[0.6rem]"]');
        expect(button).toBeInTheDocument();
        expect(diffLabel.textContent).toContain(difficultyTexts[titleAndDiff.difficulty]);
      })
      
    })
  })

})