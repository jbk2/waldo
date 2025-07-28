import { createMemoryRouter } from "react-router-dom";
import App from "../../App";
import HomePage from "../../routes/HomePage";
import SignIn from "../../routes/auth/SignIn";
import SignUp from "../../routes/auth/SignUp";
import RequestResetPassword from "../../routes/auth/RequestResetPassword";
import ResetPassword from "../../routes/auth/ResetPassword";
import CompetitionBoard from "../../routes/CompetitionBoard";
import UIProvider from "../../contexts/UIContext";
import AuthProvider from "../../contexts/AuthContext";
import GamesProvider from "../../contexts/GamesContext";
import GameProvider from "../../contexts/GameContext";

function TestAppWrapper() {
  return(
    <UIProvider>
      <AuthProvider>
        <GamesProvider>
          <GameProvider>
            <App />
          </GameProvider>
        </GamesProvider>
      </AuthProvider>
    </UIProvider>
  )
}

const routes = [
  {
    path: '/',
    element: <TestAppWrapper />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/sign-in', element: <SignIn />},
      { path: '/sign-up', element: <SignUp />},
      { path: '/request-reset-password', element: <RequestResetPassword />},
      { path: '/reset-password', element: <ResetPassword />},
      { path: '/competition-board', element: <CompetitionBoard /> },
    ]
  }
];

// provides a test router with all required context for integration tests to use
export default function createTestRouter(initialEntries = ['/']) {
  return createMemoryRouter(routes, { initialEntries });
}