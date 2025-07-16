import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import {
  verifyEmailToken,
  resendVerificationEmail,
} from "../../services/authService";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setStatus("error");
        setMessage("Invalid or missing token.");
        return;
      }

      try {
        await verifyEmailToken(token);
        setStatus("success");
        setMessage("Your email has been successfully verified!");
        setTimeout(() => navigate("/auth/login"), 3000);
      } catch (err) {
        setStatus("error");
        setMessage(err.message || "Verification failed.");
      }
    };

    verify();
  }, []);

  const handleResend = async () => {
    try {
      await resendVerificationEmail();
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

        <p className="text-lg text-gray-700 mb-8">
          {status === "verifying" && "Verifying your email..."}
          {status === "success" && message}
          {status === "error" && message}
        </p>

        <div className="flex flex-col items-center justify-center gap-4">
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

export default VerifyEmail;
