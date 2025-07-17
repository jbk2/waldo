import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AuthLayout from "./AuthLayout";

export default function RequestResetPassword() {
  const navigate = useNavigate();
  const { requestResetPassword } = useContext(AuthContext);

  const handleRequestResetPassword = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    requestResetPassword(formData, navigate);
  }

  return(
    <AuthLayout title="Welcome to Waldo" subtitle="Enter your email to reset your password">
      <form
        onSubmit={handleRequestResetPassword}
        className="flex flex-col gap-3"
      >
        <input
          type="email"
          placeholder="Your email address"
          name="email_address"
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