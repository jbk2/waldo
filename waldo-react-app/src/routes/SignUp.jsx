import AuthLayout from "./AuthLayout";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const { signOut } = useOutletContext();

  return(
    <AuthLayout title="Welcome to Waldo" subtitle="Please sign up to play">
      <form onSubmit={signOut} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          name="email_address"
          className="input input-sm"
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="input input-sm"
          minLength="8"
          pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).+$"
          title="Must have at least; 8 chars, x1 capital letter, x1 digit, x1 special char"
          required
        />
        <input
          type="password"
          placeholder="Password confirmation "
          name="password_confirmation"
          className="input input-sm"
          minLength="8"
          required
        />
        <button
          type="submit"
          className="hover:cursor-pointer btn btn-sm w-fit"
        >
          Sign Up
        </button>
      </form>
      <button
        type="button"
        className="hover:cursor-pointer link mt-4"
        onClick={() => navigate('/sign-in')}
      >
       Have an account already? Sign In
      </button>
    </AuthLayout>
  )
}