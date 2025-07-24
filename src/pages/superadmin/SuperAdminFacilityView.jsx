import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleFacility } from "../../services/facilityService";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const SuperAdminFacilityView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const { data } = await getSingleFacility(id);
        setFacility(data);
      } catch (err) {
        console.error("Error fetching facility:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFacility();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (!facility)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md">
          <p className="font-bold">Facility not found</p>
          <p>The requested facility could not be loaded.</p>
        </div>
      </div>
    );

  const {
    name,
    description,
    location,
    contact,
    hours,
    type,
    rating,
    isActive,
    images,
    services,
  } = facility;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 text-blue-600 hover:text-blue-800 transition-colors"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span className="font-medium">Back to Dashboard</span>
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
              <p className="text-blue-600 font-medium">{type}</p>
            </div>
            <div
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isActive
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Description
              </h2>
              <p className="text-gray-700">{description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Location
                </h2>
                <p className="text-gray-700">
                  {location?.address}, {location?.city}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Coordinates: {location?.coordinates?.latitude},{" "}
                  {location?.coordinates?.longitude}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Contact
                </h2>
                <p className="text-gray-700">Email: {contact?.email}</p>
                <p className="text-gray-700">Phone: {contact?.phone}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Rating
              </h2>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(rating?.average || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-700">
                  {rating?.average?.toFixed(1) || "N/A"} ({rating?.count || 0}{" "}
                  reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Operating Hours
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(hours || {}).map(([day, time]) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </span>
                    <span className="text-gray-600">
                      {time.open} - {time.close}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {services?.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Services
                </h2>
                <div className="space-y-3">
                  {services.map((s, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700">
                        {typeof s.name === "string"
                          ? s.name
                          : JSON.stringify(s.name)}
                      </span>
                      <span className="font-medium text-blue-600">
                        {typeof s.price === "object"
                          ? `${s.price.amount ?? ""} ${s.price.currency ?? ""}`
                          : s.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {images?.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Images</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="group relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={img.url}
                    alt={img.alt || "Facility"}
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-white text-sm truncate">
                      {img.alt || "Facility image"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminFacilityView;
