

const VerifyEmail = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/Drug1.jpg')" }}
    >
      <div className="bg-white/50 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto text-center"> 
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Verify Your Email</h2>

        {/*  verification message */}
        <p className="text-lg text-gray-700 mb-8">
          A verification email has been sent. Please check your inbox.
        </p>

        {/*  Resend email button or direct link to login */}
        <div className="flex flex-col items-center justify-center gap-4">
          <button
            type="button" 
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 font-semibold"
          >
            Resend Verification Email
          </button>

          {/* Link back to login */}
          <div className="flex items-center justify-center pt-2 gap-1">
            <p className="block text-sm font-semibold text-gray-700 mb-1">
              Already verified or want to login?
            </p>
            <a href="#" className="text-sm text-blue-700 hover:underline">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
