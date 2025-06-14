import AuthLayout from "./AuthLayout";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useOutletContext();

  return(
    <AuthLayout title="Welcome to Waldo" subtitle="Sign in to play">
      <form onSubmit={signIn} className="flex flex-col gap-4">
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
        <div className="flex mt-1">
          <button
            type="submit"
            className="hover:cursor-pointer btn btn-sm w-fit"
          >
            Sign In
          </button>
          <button
            type="button"
            className="hover:cursor-pointer ml-4 text-xs self-end pb-[1px]"
            onClick={() => navigate('/request-reset-password')}
          >
            Forgotten password?
          </button>
        </div>
      </form>
      <button
        type="button"
        className="hover:cursor-pointer link mt-4"
        onClick={() => navigate('/sign-up')}
      >
       Don't have an account? Sign Up
      </button>
    </AuthLayout>
  )
}