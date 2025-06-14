import AuthLayout from "./AuthLayout";
import { useOutletContext } from "react-router-dom";

export default function requestResetPassword() {
  const { requestPasswordReset } = useOutletContext();

  return(
    <AuthLayout title="Welcome to Waldo" subtitle="Enter your email to reset your password">
      <form
        onSubmit={requestPasswordReset}
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
    </AuthLayout>
  )
}