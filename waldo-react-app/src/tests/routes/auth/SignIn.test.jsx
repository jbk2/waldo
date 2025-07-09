import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import { RouterProvider } from "react-router-dom";
import createTestRouter from "../../utils/testRouter";

const mockFailedAuthFetchOnce = () => {
  fetch.mockResolvedValueOnce({
    ok: false,
    json: async () => ({ error: "Not authenticated" })
  });
}

const mockSuccessfulAuthFetchOnce = () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      message: "Successfully logged in",
      user: {},
      authenticated: true
    })
  });
}

vi.stubGlobal('fetch', vi.fn())  // to mock the auto auth fetch on load

describe('SignIn route integration', () => {
  it('renders sign-in page when visiting /sign-in directly', async () => {    
    
    vi.clearAllMocks();
    mockFailedAuthFetchOnce()  
    
    const testRouter = createTestRouter();
    render(
      <RouterProvider router={testRouter} />
    );
    
    // Wait for App.jsx useEffect auth check to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    // navigate to /sign-in
    await act(async () => {
      testRouter.navigate('/sign-in');
    });
    // Now check for SignIn content
    await waitFor(() => {
      expect(screen.getByText('Sign in to play')).toBeInTheDocument();
    });
  });
});

describe("With valid credentials submitted to SignIn form", () => {
  it("routes to '/' and renders Game component", async () => {
    vi.clearAllMocks();
    mockFailedAuthFetchOnce()
    
    const testRouter = createTestRouter(['/sign-in']);
    
    render(<RouterProvider router={testRouter} />);

    // Wait for sign-in form to be rendered
    await waitFor(() => {
      expect(screen.getByText('Sign in to play')).toBeInTheDocument();
    });

    mockSuccessfulAuthFetchOnce();

    // Fill out form fields
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'one@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'Password12!' }
    });

    // get & submit the form
    const form = screen.getByRole('button', { name: /sign in/i }).closest('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByTestId('game-section')).toBeInTheDocument();
    });
  })
})