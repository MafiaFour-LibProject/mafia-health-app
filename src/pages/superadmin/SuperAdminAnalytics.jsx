import { useEffect, useState } from "react";
import { getSuperAdminOverview } from "../../services/analyticsService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Loader from "../../components/Loader";

const COLORS = ["#00853e", "#66c68c", "#a3d5b0", "#f5f5f5", "#8884d8"];

const SuperAdminAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const result = await getSuperAdminOverview();
        setData(result);
      } catch (error) {
        console.error("Analytics fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader />
      </div>
    );
  }

  if (!data) {
    return (
      <p className="text-center text-gray-600 mt-10">
        No analytics data available
      </p>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#043927] mb-2">
          Analytics Overview
        </h1>
        <p className="text-gray-600">
          System-wide statistics for facilities, users, and appointments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold text-[#043927] mb-2">
            Total Facilities
          </h2>
          <p className="text-2xl font-bold text-[#00853e]">
            {data.totalFacilities}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold text-[#043927] mb-2">
            Total Users
          </h2>
          <p className="text-2xl font-bold text-[#00853e]">{data.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold text-[#043927] mb-2">
            Total Appointments
          </h2>
          <p className="text-2xl font-bold text-[#00853e]">
            {data.totalAppointments}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Facilities By Type - Pie */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-[#043927] mb-4">
            Facilities by Type
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.facilitiesByType}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.facilitiesByType.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Appointments By Status - Bar */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-[#043927] mb-4">
            Appointments by Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.appointmentsByStatus}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#00853e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Registrations */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-lg font-semibold text-[#043927] mb-4">
          Monthly Registrations
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.monthlyRegistrations}>
            <XAxis dataKey="_id" tickFormatter={(month) => `Month ${month}`} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#66c68c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SuperAdminAnalytics;
