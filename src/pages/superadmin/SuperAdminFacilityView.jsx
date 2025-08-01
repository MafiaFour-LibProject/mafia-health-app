import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleFacility } from "../../services/facilityService";
import {
  ArrowLeftIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";

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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00853e]"></div>
      </div>
    );

  if (!facility)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 max-w-md rounded-lg shadow-sm">
          <h3 className="font-bold text-lg mb-1">Facility Not Found</h3>
          <p className="text-gray-600">
            The requested facility could not be loaded. Please try again.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-[#00853e] hover:text-[#006f34] font-medium flex items-center gap-1"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Dashboard
          </button>
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
        className="flex items-center gap-2 mb-8 text-[#00853e] hover:text-[#006f34] transition-colors"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span className="font-medium">Back to Dashboard</span>
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#00853e]/5 to-[#a3d5b0]/10 p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#043927]">{name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <span className="bg-[#a3d5b0] text-[#043927] text-sm font-medium px-3 py-1 rounded-full">
                  {type}
                </span>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-xs border border-gray-200">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) =>
                  i < Math.floor(rating?.average || 0) ? (
                    <SolidStarIcon
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                    />
                  ) : (
                    <StarIcon key={i} className="w-5 h-5 text-gray-300" />
                  )
                )}
              </div>
              <span className="text-gray-700 font-medium">
                {rating?.average?.toFixed(1) || "N/A"}{" "}
                <span className="text-gray-400">({rating?.count || 0})</span>
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-[#f8faf9] p-5 rounded-xl border border-[#a3d5b0]/30">
              <h2 className="text-lg font-semibold text-[#043927] mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#00853e] rounded-full"></span>
                Facility Description
              </h2>
              <p className="text-gray-700">
                {description || "No description provided"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#f8faf9] p-5 rounded-xl border border-[#a3d5b0]/30">
                <h2 className="text-lg font-semibold text-[#043927] mb-3 flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-[#00853e]" />
                  Location
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-700">{location?.address}</p>
                  <p className="text-gray-700">{location?.city}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Coordinates: {location?.coordinates?.latitude},{" "}
                    {location?.coordinates?.longitude}
                  </p>
                </div>
              </div>

              <div className="bg-[#f8faf9] p-5 rounded-xl border border-[#a3d5b0]/30">
                <h2 className="text-lg font-semibold text-[#043927] mb-3 flex items-center gap-2">
                  <EnvelopeIcon className="w-5 h-5 text-[#00853e]" />
                  Contact
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-700 flex items-center gap-2">
                    <PhoneIcon className="w-4 h-4" />
                    {contact?.phone || "Not provided"}
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <EnvelopeIcon className="w-4 h-4" />
                    {contact?.email || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#f8faf9] p-5 rounded-xl border border-[#a3d5b0]/30">
              <h2 className="text-lg font-semibold text-[#043927] mb-3 flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-[#00853e]" />
                Operating Hours
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(hours || {}).map(([day, time]) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </span>
                    <span className="text-gray-600 bg-white px-2 py-1 rounded text-sm">
                      {time.open} - {time.close}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {services?.length > 0 && (
              <div className="bg-[#f8faf9] p-5 rounded-xl border border-[#a3d5b0]/30">
                <h2 className="text-lg font-semibold text-[#043927] mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#00853e] rounded-full"></span>
                  Services Offered
                </h2>
                <div className="divide-y divide-[#a3d5b0]/30">
                  {services.map((s, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 first:pt-0 last:pb-0"
                    >
                      <span className="text-gray-700">
                        {typeof s.name === "string"
                          ? s.name
                          : JSON.stringify(s.name)}
                      </span>
                      <span className="font-medium text-[#00853e]">
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
          <div className="border-t border-gray-200 p-6 bg-[#f8faf9]">
            <h2 className="text-lg font-semibold text-[#043927] mb-4">
              Facility Images
            </h2>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-sm">
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
