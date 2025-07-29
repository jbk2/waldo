import '../../../setup.integration.js';
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { RouterProvider } from "react-router-dom";
import createTestRouter from "../../../testUtils/testRouter.jsx";
import { testDatabase } from "../../../testUtils/railsTestDatabaseAPI.js";

describe('Sign Up integration', () => {
  let user;

  beforeEach(async () => {
    const testRouter = createTestRouter(['/sign-up']);
    render(<RouterProvider router={testRouter} />)
    user = userEvent.setup();
  });

  afterEach(async () => {
    cleanup();
    await testDatabase.cleanup();
  });

  it('renders the sign up form', async () => {
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    });
  });
  
  it('shows error when passwords do not match', async () => {
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    })
    
    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const passwordConfInput = screen.getByPlaceholderText('Password confirmation');
    
    await user.type(usernameInput, 'testuser123');
    await user.type(emailInput, 'testuser123@example.com');
    await user.type(passwordInput, 'Password12!');
    await user.type(passwordConfInput, 'DifferentPassword12!');
    
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Password confirmation doesn\'t match Password')).toBeInTheDocument();
    });
  });

  it('successfully creates user with valid form data', async () => {
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    })
    
    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const passwordConfInput = screen.getByPlaceholderText('Password confirmation');
    
    // Use unique data to avoid conflicts
    await user.type(usernameInput, 'newuser456');
    await user.type(emailInput, 'newuser456@example.com');
    await user.type(passwordInput, 'Password12!');
    await user.type(passwordConfInput, 'Password12!');
    
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      // Check for any success message or navigation
      expect(screen.getByText(/successfully|welcome|created/i)).toBeInTheDocument();
    });
  });

  it('shows error when email is already taken', async () => {
    await testDatabase.loadUserFixtures();
    const fixtureData = await testDatabase.getUserFixtures();
    const userFixtures = fixtureData.users;
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    })
    
    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const passwordConfInput = screen.getByPlaceholderText('Password confirmation');
    
    // Use fixture data that already exists
    await user.type(usernameInput, 'newusername789');
    await user.type(emailInput, userFixtures[0].email_address); // Use existing email
    await user.type(passwordInput, 'Password123!');
    await user.type(passwordConfInput, 'Password123!');
    
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Email address has already been taken')).toBeInTheDocument();
    });
  });
});