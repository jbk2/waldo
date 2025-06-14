import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '/src/App'
import HomePage from '/src/routes/HomePage'
import SignIn from './routes/auth/SignIn'
import SignUp from './routes/auth/SignUp'
import RequestResetPassword from './routes/auth/RequestResetPassword'
import ResetPassword from './routes/auth/ResetPassword'
import CompetitionBoard from '/src/routes/CompetitionBoard'


const router = createBrowserRouter([
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
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
