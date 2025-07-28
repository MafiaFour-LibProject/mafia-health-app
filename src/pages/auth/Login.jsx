import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { ApiLogin } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = new URLSearchParams(location.search).get("redirect");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const payload = {
        email: data.email,
        password: data.password,
      };

      const res = await ApiLogin(payload);
      const token = res.data.token;
      const user = res.data.user;
      login(token, user);

      if (!token) {
        toast.error("Unauthorized, please login");
        return;
      }

      toast.success("Login successful!");

      if (redirectTo) {
        navigate(redirectTo);
      } else {
        switch (user.role) {
          case "user":
            navigate("/user");
            break;
          case "facility_admin":
            navigate("/admin");
            break;
          case "superadmin":
            navigate("/superadmin");
            break;
          default:
            toast.warn("Unknown role. Redirecting to home.");
            navigate("/");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error?.response?.data?.message || error?.message || "Login failed."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-black/100 z-0"></div>

      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/gradient.jpg')" }}
      ></div>

      <div className="bg-white/80 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto z-10 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login Here
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center mb-6 cursor-pointer">
            <a
              onClick={() => navigate("/auth/forgot-password")}
              className="text-sm text-blue-700 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 mt-5 font-bold rounded-md transition transform ${
              isSubmitting
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-500 hover:scale-105"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Log In"}
          </button>

          <div className="flex items-center justify-center mb-6 pt-5">
            <p className="text-sm text-gray-700 mr-1">New User?</p>
            <a
              onClick={() => navigate("/auth/signup")}
              className="text-sm text-blue-700 hover:underline font-semibold cursor-pointer"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
