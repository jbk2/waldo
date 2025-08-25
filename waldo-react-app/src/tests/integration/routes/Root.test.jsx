import '../../setup.integration.js';
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import userEvent from '@testing-library/user-event';
import { render, screen, cleanup } from '@testing-library/react';
import { RouterProvider } from "react-router-dom";
import createTestRouter from "../../testUtils/testRouter.jsx";
import { testDatabase } from "../../testUtils/railsTestDatabaseAPI.js";


describe("root '/' page integration test", () => {
  let user;
  let testRouter;

  beforeEach(async () => {
    await testDatabase.loadTestImages();
    user = userEvent.setup();
    testRouter = createTestRouter(['/']);
    render(<RouterProvider router={testRouter} />)
  });

  afterEach(async () => {
    cleanup();
    await testDatabase.cleanup();
  });


  it('allows user to select and start a game', async () => {
    testRouter.navigate('/')
    const proceedBtn = await screen.findByRole('button', { name: /Proceed to app/ });
    await user.click(proceedBtn)

    const placeholderImage = await screen.findByRole('img', { name: /placeholderImage/ });
    expect(placeholderImage).toBeInTheDocument();

    const startGameDialog = await screen.findByTestId('startGameDialog');
    expect(startGameDialog).toBeInTheDocument();

    const cakeFactoryBtn = await screen.findByRole('button', { name: 'Cake-factory' })
    expect(cakeFactoryBtn).toBeInTheDocument();
    await user.click(cakeFactoryBtn);
    
    // Note: In the test environment, the onLoad event doesn't fire for external URLs,
    // so the loading overlay remains visible. In a real browser, this would disappear
    // when the image loads. For now, we just test that the loading overlay appears
    // and that the game image is present and clickable.
    const loadingText = await screen.findByText('Loading game image...');
    await screen.findByText('Please wait while a high-resolution image loads');
    expect(loadingText).toBeInTheDocument();
    
    const gameSection = await screen.findByTestId('game-section');
    const gameImage = gameSection.querySelector('img[name="cake-factory"]');
    expect(gameImage).toBeInTheDocument();

    // User can interact with the game image
    await user.click(gameImage);
  });

});