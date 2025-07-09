import { createMemoryRouter } from "react-router-dom";
import App from "../../App";
import HomePage from "../../routes/HomePage";
import SignIn from "../../routes/auth/SignIn";
import SignUp from "../../routes/auth/SignUp";
import RequestResetPassword from "../../routes/auth/RequestResetPassword";
import ResetPassword from "../../routes/auth/ResetPassword";
import CompetitionBoard from "../../routes/CompetitionBoard";

const routes = [
  {
    path: '/',
    element: <App />,
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

export default function createTestRouter(initialEntries = ['/']) {
  return createMemoryRouter(routes, { initialEntries });
}