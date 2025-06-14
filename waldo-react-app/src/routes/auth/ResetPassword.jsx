import { useState, useEffect } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import AuthLayout from "./AuthLayout";

export default function ResetPassword() {
  const { resetPassword } = useOutletContext();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  
  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value)
  }

  useEffect(() => {
    setPasswordsMatch(
      password === passwordConfirmation &&
      password.length >= 8 &&
      passwordConfirmation.length >= 8
    );
  }, [password, passwordConfirmation])

  return(
    <AuthLayout title="Welcome to Waldo" subtitle="Enter your new password">
      <form onSubmit={(e) => resetPassword(e, token)} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="New password"
          name="new_password"
          value={password}
          onChange={handlePasswordChange}
          className="input input-sm"
          minLength="8"
          pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).+$"
          title="Must have at least; 8 chars, x1 capital letter, x1 digit, x1 special char"
          required
        />
        <input
          type="password"
          placeholder="New password confirmation "
          name="new_password_confirmation"
          value={passwordConfirmation}
          onChange={handlePasswordConfirmationChange}
          className="input input-sm"
          minLength="8"
          pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).+$"
          required
        />
        {passwordConfirmation && passwordConfirmation.length >= 8 && !passwordsMatch && (
          <p className="text-red-500 text-sm">Passwords do not match</p>
        )}
        <button
          type="submit"
          className="hover:cursor-pointer btn btn-sm w-fit"
          disabled={!passwordsMatch}
        >
          Reset password
        </button>
      </form>
    </AuthLayout>
  )
}