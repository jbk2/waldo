import { describe, it, expect, beforeEach, afterEach, } from "vitest";
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterProvider } from "react-router-dom";
import createTestRouter from "../../utils/testRouter.jsx";
import { testDatabase } from "../../utils/testDatabase.js";

describe('Request Password Reset', () => {
  let userFixtures;
  let user;

  beforeEach(async () => {
    const testRouter = createTestRouter(['/request-reset-password']);
    render(<RouterProvider router={testRouter} />)
    user = userEvent.setup();
  });

  afterEach(async () => {
    cleanup();
    await testDatabase.cleanup();
  });
  
  // should not be able to reach this route unless you were signed in!!!!!!!!

  it('/request-reset-password route loads the form', async () => {
    await waitFor(() => {
      expect(screen.getByText(/Enter your email to reset your password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Reset password/i })).toBeInTheDocument();
    })
  })
  
  it('shows error when email does not exist', async () => {
    await waitFor(() => {
      expect(screen.getByText(/Enter your email to reset your password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Reset password/i })).toBeInTheDocument();
    })
    
    const emailInput = screen.getByPlaceholderText('Your email address');
    await user.type(emailInput, 'nonexistent@example.com');
    
    const submitButton = screen.getByRole('button', { name: /Reset password/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to find user with nonexistent@example.com')).toBeInTheDocument();
    });
  });
  
  it('shows success message when email exists', async () => {
    await testDatabase.loadUserFixtures();
    const fixtureData = await testDatabase.getUserFixtures();
    userFixtures = fixtureData.users;

    await waitFor(() => {
      expect(screen.getByText(/Enter your email to reset your password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Reset password/i })).toBeInTheDocument();
    })
    
    const emailInput = screen.getByPlaceholderText('Your email address');
    await user.type(emailInput, userFixtures[0].email_address);
    
    const submitButton = screen.getByRole('button', { name: /Reset password/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Password reset email sent')).toBeInTheDocument();
    });
  });
});