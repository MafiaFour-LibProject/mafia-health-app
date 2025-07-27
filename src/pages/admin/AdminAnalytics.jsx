import { useEffect, useState } from "react";
import { getFacilityAnalytics } from "../../services/analyticsService";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getFacilityAnalytics();
        setAnalytics(res.data);
      } catch (err) {
        toast.error("Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-2 text-sac-state-secondary">
        Facility Analytics
      </h1>
      <h2 className="text-unt-deep mb-6">
        Get key insights into your facility’s performance and engagement.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Total Appointments
          </h2>
          <p className="text-3xl font-bold text-green-700">
            {analytics.totalAppointments}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Total Services
          </h2>
          <p className="text-3xl font-bold text-green-700">
            {analytics.totalServices}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Average Rating
          </h2>
          <p className="text-3xl font-bold text-yellow-600">
            {analytics.averageRating?.[0]?.avgRating?.toFixed(2) ?? "0.00"} ★
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">
          Appointments By Month
        </h2>
        <ul className="space-y-2">
          {analytics.appointmentsByMonth?.map((month) => (
            <li
              key={month._id}
              className="flex justify-between text-gray-700 border-b py-1"
            >
              <span>{month.month}</span>
              <span className="font-semibold">{month.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminAnalytics;
