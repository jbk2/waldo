import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { UIContext } from '../../contexts/UIContext';
import { GameContext } from '../../contexts/GameContext';
import App from '../../App';

export default function createTestRouter() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/sign-in', element: <div data-testid="signin-page">Sign In</div> },
        { path: '/sign-up', element: <div data-testid="signup-page">Sign Up</div> },
        { path: '/request-reset-password', element: <div data-testid="request-reset-page">Request Reset</div> },
        { path: '/reset-password', element: <div data-testid="reset-password-page">Reset Password</div> },
      ]
    }
  ]);

  return (
    <UIContext>
      <AuthContext>
        <GameContext>
          <RouterProvider router={router} />
        </GameContext>
      </AuthContext>
    </UIContext>
  );
} 