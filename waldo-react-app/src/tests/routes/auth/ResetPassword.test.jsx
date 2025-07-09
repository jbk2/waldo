import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterProvider } from "react-router-dom";
import createTestRouter from "../../utils/testRouter.jsx";

describe('Reset Password', () => {
  const testRouter = createTestRouter(['/reset-password']);
  
  it('/reset-password route loads the form', async () => {
    render(<RouterProvider router={testRouter} />)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Reset Password/i })).toBeInTheDocument();
    })
  })
  
  it('shows error when passwords do not match', async () => {
    const user = userEvent.setup();
    
    // Mock unsuccessful fetch
    const mockUnsuccessfulFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 422,
      json: async () => ({
        message: ["Passwords did not match"]
      })
    });
    global.fetch = mockUnsuccessfulFetch;
    
    render(<RouterProvider router={testRouter} />)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Reset Password/i })).toBeInTheDocument();
    })
    
    const passwordInput = screen.getByPlaceholderText('New password');
    const passwordConfInput = screen.getByPlaceholderText('New password confirmation');
    
    await user.type(passwordInput, 'NewPassword123!');
    await user.type(passwordConfInput, 'DifferentPassword123!');
    
    const submitButton = screen.getByRole('button', { name: /Reset Password/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Passwords did not match')).toBeInTheDocument();
    });
  });
  
  it('shows client-side error when passwords do not match', async () => {
    const user = userEvent.setup();
    
    render(<RouterProvider router={testRouter} />)
    
    await waitFor(() => {
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
    const user = userEvent.setup();
    
    // Mock successful fetch
    const mockSuccessfulFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        message: "Password has been successfully reset"
      })
    });
    global.fetch = mockSuccessfulFetch;
    
    render(<RouterProvider router={testRouter} />)
    
    await waitFor(() => {
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