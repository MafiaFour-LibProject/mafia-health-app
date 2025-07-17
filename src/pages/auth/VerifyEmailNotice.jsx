import { Link } from "react-router-dom";
import { useState } from "react";
import { resendVerificationEmail } from "../../services/authService";

const VerifyEmailNotice = () => {
  const [message, setMessage] = useState("");

  const handleResend = async () => {
    const email = localStorage.getItem("unverifiedEmail");
    if (!email) {
      setMessage("Email not found. Please sign up again.");
      return;
    }

    try {
      await resendVerificationEmail(email);
      setMessage("Verification email resent. Please check your inbox.");
    } catch (err) {
      setMessage(err.message || "Failed to resend verification email.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/Drug1.jpg')" }}
    >
      <div className="bg-white/50 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Verify Your Email
        </h2>

        <p className="text-lg text-gray-700 mb-4">
          A verification email has been sent. Please check your inbox.
        </p>

        {message && <p className="text-sm text-green-700">{message}</p>}

        <div className="flex flex-col items-center justify-center gap-4 mt-4">
          <button
            type="button"
            onClick={handleResend}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 font-semibold"
          >
            Resend Verification Email
          </button>

          <div className="flex items-center justify-center pt-2 gap-1">
            <p className="block text-sm font-semibold text-gray-700 mb-1">
              Already verified or want to login?
            </p>
            <Link
              to="/auth/login"
              className="text-sm text-blue-700 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailNotice;
