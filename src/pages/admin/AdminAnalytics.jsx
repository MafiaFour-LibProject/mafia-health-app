import { useEffect, useState } from "react";
import { getFacilityAnalytics } from "../../services/analyticsService";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

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
        {analytics.appointmentsByMonth?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.appointmentsByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No data available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;
