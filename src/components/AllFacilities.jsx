//Lists all facilities, with search + filter and a button to sign up

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { getAllFacilities } from "../services/facilityService";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const type = ["hospital", "pharmacy"];

const AllFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleView = (id) => {
    navigate(`/facility/${id}`);
  };

  const handleRemove = (id) => {
    const confirmed = confirm("Are you sure you want to remove this facility?");
    if (confirmed) {
      setFacilities((prev) => prev.filter((f) => f.id !== id));
    }
  };

  const handleViewUsers = () => {
    navigate("/superadmin/users");
  };

  const fetchFacilities = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllFacilities();
      console.log("fetched data:", data);
      setFacilities(data);
    } catch (err) {
      console.log("Error fetching facilities:", err);
      setError("Failed to load facilities. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-700">
          SuperAdmin Dashboard
        </h1>
        <button
          onClick={handleViewUsers}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          View Users
        </button>
      </div>

      <div className="overflow-x-auto shadow border rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-green-100 text-green-700">
            <tr>
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Location</th>
              <th className="text-left py-3 px-4">Type</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {facilities.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No facilities onboarded yet.
                </td>
              </tr>
            ) : (
              facilities.map((facility) => (
                <tr
                  key={facility.id}
                  className="border-t hover:bg-green-50 transition"
                >
                  <td className="py-3 px-4">{facility.name}</td>
                  <td className="py-3 px-4">{facility.location}</td>
                  <td className="py-3 px-4 capitalize">{facility.type}</td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      onClick={() => handleView(facility.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleRemove(facility.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllFacilities;
