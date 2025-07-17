// Facility admin dashboard. Lists all services(servicesCard). Button to go to appointments. Button to add service via a modal

import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        <div className="flex flex-wrap gap-4 mb-10">
          <button
            onClick={() => navigate("/admin/appointments")}
            className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition text-sm md:text-base shadow"
          >
            View Appointments
          </button>
          <button
            onClick={() => navigate("/admin/reviews")}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition text-sm md:text-base shadow"
          >
            View Reviews
          </button>
          <button className="bg-gray-300 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-400 transition text-sm md:text-base shadow">
            Add Service
          </button>
        </div>

        {/* Placeholder Content */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <p className="text-gray-500 text-sm md:text-base">
            Welcome to the admin dashboard. Use the buttons above to manage
            facility-related services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
