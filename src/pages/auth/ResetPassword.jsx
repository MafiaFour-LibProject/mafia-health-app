// Reusable reset password component for all role types with inputs (Enter new password, Confirm new password, Reset Password button)

import React from "react";

const ResetPassword = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/gradient.jpg')" }}
    >
      {/* Form container with transparent background */}
      <div className="bg-white/50 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Reset Password
        </h2>

        <form>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-semibold text-gray-800 mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter your new password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-400"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-800 mb-1"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your new password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-400"
            />
          </div>

          {/* This section is for the action button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 font-semibold"
          >
            Set New Password
          </button>

          {/* Link back to login */}
          <div className="flex items-center justify-center mb-6 pt-5 gap-1">
            <p className="block text-sm font-semibold text-gray-700 mb-1">
              Done resetting?
            </p>
            <a href="#" className="text-sm text-blue-700 hover:underline">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
