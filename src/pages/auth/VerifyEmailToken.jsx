import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyEmailToken } from "../../services/authService";

const VerifyEmailToken = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("token");
      console.log("Token from URL:", token);
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

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/Drug1.jpg')" }}
    >
      <div className="bg-white/50 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Email Verification
        </h2>

        <p className="text-lg text-gray-700 mb-4">
          {status === "verifying" && "Verifying your email..."}
          {status === "success" && message}
          {status === "error" && message}
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailToken;
