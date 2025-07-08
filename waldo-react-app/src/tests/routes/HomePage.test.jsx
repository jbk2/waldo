import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from '../../routes/HomePage';
import SignIn from '../../routes/auth/SignIn';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';

function TestOutlet({ loggedIn = false }) {
  return (
    <Outlet context={{
      showAlert: () => {},
      characters: [
        { name: 'Waldo', startX: 0.5, startY: 0.5, endX: 0.6, endY: 0.6, clicked: false },
        { name: 'Odlaw', startX: 0.7, startY: 0.7, endX: 0.8, endY: 0.8, clicked: false },
        { name: 'Wizard', startX: 0.9, startY: 0.9, endX: 1.0, endY: 1.0, clicked: false },
      ],
      setCharacters: () => {},
      loggedIn: loggedIn,
      signIn: () => {},
      signUp: () => {},
      requestResetPassword: () => {},
      resetPassword: () => {}
    }} />
  );
}

describe('HomePage route integration', () => {
  it('redirects to sign-in when not logged in', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<TestOutlet loggedIn={false} />}>
            <Route index element={<HomePage />} />
            <Route path='sign-in' element={<SignIn />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });
  });

  it('shows the game when logged in', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<TestOutlet loggedIn={true} />}>
            <Route index element={<HomePage />} />
            <Route path='sign-in' element={<SignIn />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('game-section')).toBeInTheDocument();
    });
  });
});