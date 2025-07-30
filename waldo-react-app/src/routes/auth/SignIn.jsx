import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { GameContext } from "../../contexts/GameContext";
import AuthLayout from "./AuthLayout";
import { useNavigate, useLocation } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const { setGameCompletedLength } = useContext(GameContext);
  const { state } = useLocation();

  const handleSignIn = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formEmail = formData.get('email_address');
    const newUsersEmail = state?.user?.email_address;
    const newUser = newUsersEmail ? true : false;
    
    function emailsMatch(email1, email2) {
      return email1 === email2
    }
    
    // Handle sign-in flow for users with preserved game state:
    // - New signup signin: Verify new user & log in emails match to pass on nextRoute & pastGameTime state
    // - Existing user signin: Allow sign-in and pass nextRoute and pastGameTime in state on
    if(state) {
      if(!newUser || newUser && emailsMatch(formEmail, newUsersEmail)) {
        signIn(formData, navigate, state);
      }
    } else {
      setGameCompletedLength(null);
      signIn(formData, navigate);
    }
  };

  return(
    <AuthLayout title="Welcome to Waldo" subtitle="Sign in to play">
      <form onSubmit={handleSignIn} className="flex flex-col gap-4">
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