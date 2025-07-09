import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterProvider } from "react-router-dom";
import createTestRouter from "../../utils/testRouter.jsx";

describe('Request Password Reset', () => {
  const testRouter = createTestRouter(['/request-reset-password']);
  
  it('/request-reset-password route loads the form', async () => {
    render(<RouterProvider router={testRouter} />)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Reset password/i })).toBeInTheDocument();
    })
  })
  
  it('shows error when email does not exist', async () => {
    const user = userEvent.setup();
    
    // Mock unsuccessful fetch
    const mockUnsuccessfulFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({
        message: `Failed to find user with nonexistent@example.com`
      })
    });
    global.fetch = mockUnsuccessfulFetch;
    
    render(<RouterProvider router={testRouter} />)
    
    await waitFor(() => {
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
    const user = userEvent.setup();
    
    // Mock successful fetch
    const mockSuccessfulFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        message: "Password reset email sent"
      })
    });
    global.fetch = mockSuccessfulFetch;
    
    render(<RouterProvider router={testRouter} />)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Reset password/i })).toBeInTheDocument();
    })
    
    const emailInput = screen.getByPlaceholderText('Your email address');
    await user.type(emailInput, 'existing@example.com');
    
    const submitButton = screen.getByRole('button', { name: /Reset password/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Password reset email sent')).toBeInTheDocument();
    });
  });
});