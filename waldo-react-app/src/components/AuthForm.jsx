import { useState } from "react";

export default function AuthForm({ handleSignIn, showAlert, token }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);

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
          showAlert(
            err.message ||
              "Sign up failed, fetch threw an error, and there was no err.message object"
          );
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
        .then(async (res) => {
          const data = await res.json();
          if (res.ok) {
            handleSignIn(data);
            showAlert(data.notice);
          } else {
            showAlert(
              data.error ||
                "Sign in failed, fetch response not ok, and was no JSON response errors object"
            );
          }
        })
        .catch((err) => {
          showAlert(
            err.message ||
              "Sign in failed, fetch threw an error, and there was no err.message object"
          );
        });
    }
  };

  const handlePasswordResetRequest = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email')
    console.log("just submitted password reset form", formData.get("email"));
    // request to rails server to send password reset email, with link including token
    // load password fields form with token
    fetch("/api/passwords", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email_address: email
      })
    })
    .then(async (res) => {
      const data = await res.json();
      if(res.ok) {
        setIsPasswordEdit(false);
        showAlert("Password reset email sent successfully");
      } else {
        showAlert(
          data.error ||
            "Password reset request failed, fetch response not ok, and was no JSON response errors object"
        );
      }
    })
    .catch((err) => {
      showAlert(
        err.message ||
          "Sign in failed, fetch threw an error, and there was no err.message object"
      );
    }) 
  };

  const handlePasswordResetSubmission = (e) => {
    // submit token ad password value to rails password update action, if success route to login screen.
  }

  return (
    <>
      <div className="card top-[10vh] pt-6 w-80 z-60 bg-base-100 shadow-md mx-auto">
        <div data-testid="auth-form" className="card-title flex flex-col">
          <h1 className="text-xl font-bold -mb-1">Welcome to Waldo</h1>
          <div>
            {isPasswordEdit ? (
              <p className="font-medium text-sm">
                Submit your email to reset password
              </p>
            ) : isSignUp ? (
              <p className="font-medium text-sm">Please sign up to play</p>
            ) : (
              <p className="font-light text-sm">Please sign in to play</p>
            )}
          </div>
        </div>
        <div className="card-body">
          {isPasswordEdit ? (
            <form
              onSubmit={handlePasswordResetRequest}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                placeholder="Your email address"
                name="email"
                className="input input-sm"
                required
              />
              <button
                type="submit"
                className="hover:cursor-pointer btn btn-sm w-fit"
              >
                Reset password
              </button>
            </form>
          ) : (
            <>
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
                <div className="flex mt-1">
                  <button
                    type="submit"
                    className="hover:cursor-pointer btn btn-sm w-fit"
                  >
                    {isSignUp ? "Sign Up" : "Sign In"}
                  </button>
                  <button
                    type="button"
                    className="hover:cursor-pointer ml-4 text-xs self-end pb-[1px]"
                    onClick={() => setIsPasswordEdit(true)}
                  >
                    Forgotten password?
                  </button>
                </div>
              </form>
              <button
                type="button"
                className="hover:cursor-pointer link mt-4"
                onClick={() => setIsSignUp((prev) => !prev)}
              >
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
