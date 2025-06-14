import AuthLayout from "./AuthLayout";
import { useOutletContext } from "react-router-dom";

export default function ResetPassword() {
  const { resetPassword } = useOutletContext();

  return(
    <AuthLayout title="Welcome to Waldo" subtitle="Enter your new password">
      <form onSubmit={resetPassword} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="New password"
          name="password"
          className="input input-sm"
          minLength="8"
          pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).+$"
          title="Must have at least; 8 chars, x1 capital letter, x1 digit, x1 special char"
          required
        />
        <input
          type="password"
          placeholder="New password confirmation "
          name="password_confirmation"
          className="input input-sm"
          minLength="8"
          required
        />
        <button
          type="submit"
          className="hover:cursor-pointer btn btn-sm w-fit"
        >
          "Reset password"
        </button>
      </form>
    </AuthLayout>
  )
}