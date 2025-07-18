import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterProvider } from "react-router-dom";
import createTestRouter from "../../utils/testRouter.jsx";
import { testDatabase } from "../../utils/testDatabase.js";

describe('Reset password functionality with a valid token', () => {
  let user;

  beforeEach(async () => {
    await testDatabase.loadUserFixtures();
    const fixtureData = await testDatabase.getUserFixtures();
    const userFixtures = fixtureData.users;
    const tokenData = await testDatabase.generatePasswordResetToken(userFixtures[0].email_address);
    const validToken = tokenData.token;
    const testRouter = createTestRouter([`/reset-password?token=${validToken}`]);
    render(<RouterProvider router={testRouter} />)
    user = userEvent.setup();
  });

  afterEach(async () => {
    cleanup();
    await testDatabase.cleanup();
  });
  
// should not be able to reach this route unless you were signed in!!!!!!!!

  it('/reset-password route loads the form', async () => {
    await waitFor(() => {
      expect(screen.getByText(/Enter your new password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Reset Password/i })).toBeInTheDocument();
    })
  })
  
  it('shows client-side error when passwords do not match', async () => {
    await waitFor(() => {
      expect(screen.getByText(/Enter your new password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Reset password/i })).toBeInTheDocument();
    })
    
    const passwordInput = screen.getByPlaceholderText('New password');
    const passwordConfInput = screen.getByPlaceholderText('New password confirmation');
    
    await user.type(passwordInput, 'ValidPassword123!');
    await user.type(passwordConfInput, 'DifferentPassword123!');
    
    // Check that client-side error message appears
    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
    
    // Check that submit button is disabled
    const submitButton = screen.getByRole('button', { name: /Reset password/i });
    expect(submitButton).toBeDisabled();
  });

  it('shows success message when password is reset successfully', async () => {
    await waitFor(() => {
      expect(screen.getByText(/Enter your new password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Reset Password/i })).toBeInTheDocument();
    })

    const passwordInput = screen.getByPlaceholderText('New password');
    const passwordConfInput = screen.getByPlaceholderText('New password confirmation');
    
    await user.type(passwordInput, 'NewPassword123!');
    await user.type(passwordConfInput, 'NewPassword123!');
    
    const submitButton = screen.getByRole('button', { name: /Reset Password/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Password has been successfully reset')).toBeInTheDocument();
    });
  });
});



describe('Reset password functionality with an invalid token', () => {
  it('shows error with invalid token', async () => {
    const testRouter = createTestRouter([`/reset-password?token=invalidToken}`]);
    render(<RouterProvider router={testRouter} />)
    const user = userEvent.setup();
    
    await waitFor(() => {
      expect(screen.getByText(/Enter your new password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Reset Password/i })).toBeInTheDocument();
    })
    
    const passwordInput = screen.getByPlaceholderText('New password');
    const passwordConfInput = screen.getByPlaceholderText('New password confirmation');
    
    await user.type(passwordInput, 'NewPassword123!');
    await user.type(passwordConfInput, 'NewPassword123!');
    
    const submitButton = screen.getByRole('button', { name: /Reset Password/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Unexpected Application Error!')).toBeInTheDocument();
    });
  });



});