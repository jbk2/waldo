import { useState } from 'react';

export default function SignIn({ handleSignIn, setAlert }) {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      // user create & session new
      fetch("/api/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email_address: e.target.email_address.value,
            password: e.target.password.value,
            password_confirmation: e.target.password_confirmation.value
          }
        })
      })
      .then(async res => {
        const data = await res.json();
        if (res.ok) {
          setIsSignUp(false)
          setAlert(data.notice)
        } else {
          setAlert(data.errors
            ? data.errors.join(', ')
            : "Sign up failed, and no errors object in JSON response"
          )
        }
      })
      .catch(err => {
        setAlert(err.message || "Sign up failed, was no err.message object");
      })
      // in response must set isSignUp to false to render Sign in UI
    } else {
      // Sign in - session new
      fetch('/api/session', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: e.target.email_address.value,
          password: e.target.password.value,
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          handleSignIn(data);
        } else {
          setAlert(data.error || "Sign in failed, was no data.error object");
        }
      })
      .catch(err => {
        setAlert(err.message || "Sign in failed, was no err.message object");
      });
    }

  }

  return(
    <>
    <div className="pt-40 mb-6">
      <h1 className='text-xl font-bold'>Welcome to Waldo</h1>
      {isSignUp
        ? <p>Please sign up to play</p>
        : <p>Please sign in to play</p>
      }
    </div>
    <div className='border-2 border-emerald-100 w-fit rounded'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder="Email" name="email_address" />
        <input type="password" placeholder="Password" name="password" />
        {isSignUp && (
          <input type="password" placeholder="Password confirmation " name="password_confirmation" />
        )}
        <button type="submit" className='hover:cursor-pointer btn w-20'>{isSignUp ? "Sign Up" : "Sign In" }</button>
      </form>
      <button type="button" className='hover:cursor-pointer btn' onClick={() => setIsSignUp((prev) => !prev)}>
        {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
      </button>
    </div>
    </>

  )
}