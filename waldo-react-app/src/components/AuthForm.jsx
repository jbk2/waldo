import { useState } from "react";

export default function AuthForm({ handleSignIn, showAlert }) {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      // user create & session new
      fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email_address: e.target.email_address.value,
            password: e.target.password.value,
            password_confirmation: e.target.password_confirmation.value,
          },
        }),
      })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setIsSignUp(false);
          showAlert(data.notice);
        } else {
          showAlert(
            data.errors
              ? data.errors.join(", ")
              : "Sign up failed, fetch response not ok, and was no JSON response errors object"
          );
        }
      })
      .catch((err) => {
        showAlert(err.message || "Sign up failed, fetch threw an error, and there was no err.message object");
      });
    } else {
      // Sign in - session new
      fetch("/api/session", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: e.target.email_address.value,
          password: e.target.password.value,
        }),
      })
      .then(async res => {
        const data = await res.json();
        if(res.ok) {
          handleSignIn(data);
          showAlert(data.notice);
        } else {
          showAlert(data.error || "Sign in failed, fetch response not ok, and was no JSON response errors object");
        }
      })
      .catch((err) => {
        showAlert(err.message || "Sign in failed, fetch threw an error, and there was no err.message object");
      });
    }
  };

  return (
    <div className="card top-[10vh] pt-6 w-80 z-60 bg-base-100 shadow-md mx-auto">
      <div data-testid="auth-form" className="card-title flex flex-col">
        <h1 className="text-xl font-bold -mb-1">Welcome to Waldo</h1>
        <div>
          {isSignUp ? (
            <p className="font-medium text-sm">Please sign up to play</p>
          ) : (
            <p className="font-light text-sm">Please sign in to play</p>
          )}
        </div>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {isSignUp && (
            <input
              type="password"
              placeholder="Password confirmation "
              name="password_confirmation"
              className="input input-sm"
              minLength="8"
              required
            />
          )}
          <button
            type="submit"
            className="hover:cursor-pointer btn btn-sm w-fit"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <button
          type="button"
          className="hover:cursor-pointer link mt-4"
          onClick={() => setIsSignUp((prev) => !prev)}
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}
