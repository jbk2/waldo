import '../../../setup.integration.js';
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { RouterProvider } from "react-router-dom";
import createTestRouter from "../../../testUtils/testRouter.jsx";
import { testDatabase } from "../../../testUtils/railsTestDatabaseAPI.js";

describe('Sign In integration', () => {
  let userFixtures;
  let user;
  beforeEach(async () => {
    await testDatabase.loadUserFixtures();
    const fixtureData = await testDatabase.getUserFixtures();
    userFixtures = fixtureData.users;
    const testRouter = createTestRouter(['/sign-in']);
    render(<RouterProvider router={testRouter} />)
    user = userEvent.setup();
  });

  afterEach(async () => {
    cleanup();
    await testDatabase.cleanup();
  });

  it('renders the sign in form', async () => {
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    });
  });

  it('successfully signs in with valid credentials', async () => {
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    })
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    // Use first fixture user with known password
    if (!userFixtures || userFixtures.length === 0) {
      throw new Error('No fixture users loaded. Check if fixtures are being loaded properly.');
    }
    await user.type(emailInput, userFixtures[0].email_address);
    await user.type(passwordInput, 'Password12!'); // Same assword hardcoded in fixtures
    
    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Successfully signed in')).toBeInTheDocument();
    });
  });

  it('shows error with invalid credentials', async () => {
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    })
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    await user.type(emailInput, 'wrong@example.com');
    await user.type(passwordInput, 'WrongPassword123!');
    
    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
    });
  });

  it('navigates to home page after successful sign in', async () => {
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    })
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    await user.type(emailInput, 'existing@test.com');
    await user.type(passwordInput, 'Password123!');
    
    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    await user.click(submitButton);
    
    // Wait for navigation to home page
    await waitFor(() => {
      expect(screen.getByText('Where\'s Waldo?')).toBeInTheDocument();
    });
  });
});