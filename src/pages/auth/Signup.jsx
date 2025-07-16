import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ApiSignup } from "../../services/authService";
import { toast } from "react-toastify";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      fullName: data.fullName,
      contact: data.contact,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    setIsSubmitting(true);

    try {
      const res = await ApiSignup(payload);
      localStorage.setItem("unverifiedEmail", payload.email);
      toast.success("User registered successfully");
      navigate("/auth/verify-email");
    } catch (error) {
      toast.error(error?.message || "Oops! An error occurred.");
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
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up Here</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              {...register("fullName", { required: "Full name is required" })}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-400"
            />
            {errors?.fullName && (
              <span className="text-red-600">{errors.fullName.message}</span>
            )}
          </div>

          {/* Facility Input */}
          {/* <div className="mb-4">
            <label
              htmlFor="institution"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Name of Facility
            </label>
            <input
              type="text"
              id="institution"
              {...register("institution", { required: "Facility is required" })}
              placeholder="Enter your facility"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-400"
            />
            {errors?.institution && (
              <span className="text-red-600">{errors.institution.message}</span>
            )}
          </div> */}

          {/* Email Input */}
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
            {errors?.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Contact
            </label>
            <input
              type="number"
              id="contact"
              {...register("contact", { required: "Contact is required" })}
              placeholder="Enter your contact"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-400"
            />
            {errors?.contact && (
              <span className="text-red-600">{errors.contact.message}</span>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
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
            {errors?.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirm your password",
              })}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-400"
            />
            {errors?.confirmPassword && (
              <span className="text-red-600">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isError}
            className={`w-full text-white font-semibold py-2 px-6 rounded ${
              isError
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-500"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
