import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ApiLogin } from "../../services/authService";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      console.log("Login response:", res);

      const token = res?.data?.token;
      const user = res?.data?.user;

      if (!token || !user) {
        toast.error("Login succeeded but no token or user returned.");
        return;
      }

      localStorage.setItem("token", token);
      console.log("Token saved:", localStorage.getItem("token"));
      localStorage.setItem("name", user.name);
      localStorage.setItem("email", user.email);

      toast.success("Login successful!");

      if (user.role === "user") {
        navigate("/user");
      } else if (user.role === "facility_admin") {
        navigate("/admin");
      } else if (user.role === "superadmin") {
        navigate("/superadmin");
      } else {
        toast.warn("Unknown role. Redirecting to home.");
        navigate("/");
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

  const isError = Object.keys(errors).length > 0;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/Drug1.jpg')" }}
    >
      <div className="bg-white/50 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
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
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-400/50 bg-transparent text-gray-700 placeholder-gray-500"
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
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-400 bg-transparent text-gray-700 placeholder-gray-500"
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
            disabled={isSubmitting || isError}
            className={`w-full py-2 mt-5 font-bold rounded-md transition transform ${
              isSubmitting || isError
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-500 hover:scale-105 "
            }`}
          >
            {isSubmitting ? "Submitting..." : "Log In"}
          </button>

          <div className="flex items-center justify-center mb-6 pt-5">
            <p className="block text-sm font-semibold text-gray-700 mb-1 mr-1 ">
              New User?
            </p>
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