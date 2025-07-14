// Reusable forgot password component for all role types with inputs (Enter email address, submit)


const ForgotPassword = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/Drug1.jpg')" }}
    >
      <div className="bg-white/50 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Forgot Password?</h2>

        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 font-semibold"
          >
            Reset Password
          </button>

          {/*  To login or registration */}
          <div className="flex items-center justify-center mb-6 pt-5 gap-1">
            <p className="block text-sm font-semibold text-gray-700 mb-1">
              Remembered your password?
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

export default ForgotPassword;
