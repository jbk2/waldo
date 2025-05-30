export default function SignIn({ handleSignIn, setAlert }) {

  const handleSubmit = (e) => {
    e.preventDefault();
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

  return(
    <>
    <div className="pt-40">
      <h1>Welcome to Waldo</h1>
      <p>Please sign in to play - This is signIn form component</p>
    </div>
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" name="email_address" />
        <input type="password" placeholder="Password" name="password" />
        <button type="submit">Sign In</button>
        <a href="/users/new">Sign Up</a>
      </form>
    </div>
    </>

  )
}