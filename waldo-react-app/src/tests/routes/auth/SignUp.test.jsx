import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { RouterProvider } from "react-router-dom";
import createTestRouter from "../../utils/testRouter.jsx";

// Mock fetch to simulate the API response

describe('Signing Up a new user', () => {
  const testRouter = createTestRouter(['/sign-up']);
  
  it('/sign-up route loads the sign up form', async () => {
    render(<RouterProvider router={testRouter} />)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    })
  })
  
  it('shows error when passwords do not match', async () => {
    const user = userEvent.setup();
    
    // Mock unsuccessful fetch
    const mockUnsuccessfulFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 422,
      json: async () => ({
        message: ["Password confirmation doesn't match Password"]
      })
    });
    global.fetch = mockUnsuccessfulFetch;
    
    render(<RouterProvider router={testRouter} />)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    })
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const passwordConfInput = screen.getByPlaceholderText('Password confirmation');
    
    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'Password123!');
    await user.type(passwordConfInput, 'DifferentPassword123!');
    
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Password confirmation doesn\'t match Password')).toBeInTheDocument();
    });
  });

  it('successfully creates user with valid form data', async () => {
    const user = userEvent.setup();
    
    // Mock successful fetch
    const mockSuccessfulFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        message: "User created successfully",
        user: { id: 1, email_address: 'test@test.com' }
      })
    });
    global.fetch = mockSuccessfulFetch;
    
    render(<RouterProvider router={testRouter} />)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    })
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const passwordConfInput = screen.getByPlaceholderText('Password confirmation');
    
    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'Password123!');
    await user.type(passwordConfInput, 'Password123!');
    
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('User created successfully')).toBeInTheDocument();
    });
  });

})