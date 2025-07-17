import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmailToken } from "../../services/authService";

const VerifyEmailToken = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
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

    if (token) verify();
  }, [token, navigate]);

  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
      <p>
        {status === "verifying" && "Verifying your email..."}
        {status === "success" && message}
        {status === "error" && message}
      </p>
    </div>
  );
};

export default VerifyEmailToken;
