// Userdashboard. Cards showing profile and appointments, and a button to edit profile via a modal

import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          User Dashboard
        </h1>

        <div className="flex flex-wrap gap-4 mb-10">
          <button
            onClick={() => navigate("/user/appointments")}
            className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition text-sm md:text-base shadow"
          >
            View Your Appointments
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition text-sm md:text-base shadow"
          >
            Browse Facilities
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <p className="text-gray-500 text-sm md:text-base">
            Welcome Username to your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
