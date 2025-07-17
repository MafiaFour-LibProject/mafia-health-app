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

  if (loading) return <div className="p-6">Loading...</div>;
  if (!facility)
    return <div className="p-6 text-red-600">Facility not found</div>;

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
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-blue-600 hover:underline"
      >
        <ArrowLeftIcon className="w-5 h-5" /> Back to Dashboard
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-blue-900">{name}</h1>
          <p className="text-gray-700 mb-4">{description}</p>

          <div className="mb-4">
            <h2 className="font-semibold text-gray-800">Type</h2>
            <p className="text-gray-600">{type}</p>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold text-gray-800">Location</h2>
            <p>
              {location?.address}, {location?.city}
            </p>
            <p className="text-sm text-gray-500">
              Lat: {location?.coordinates?.latitude}, Lng:{" "}
              {location?.coordinates?.longitude}
            </p>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold text-gray-800">Contact</h2>
            <p>Email: {contact?.email}</p>
            <p>Phone: {contact?.phone}</p>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold text-gray-800">Status</h2>
            <p className={isActive ? "text-green-600" : "text-red-600"}>
              {isActive ? "Active" : "Inactive"}
            </p>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold text-gray-800">Rating</h2>
            <p>
              {rating?.average ?? "N/A"} ({rating?.count ?? 0} reviews)
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-gray-800 mb-2">Operating Hours</h2>
          <ul className="space-y-1 text-sm">
            {Object.entries(hours || {}).map(([day, time]) => (
              <li key={day}>
                <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong>{" "}
                {time.open} - {time.close}
              </li>
            ))}
          </ul>

          {services?.length > 0 && (
            <div className="mt-6">
              <h2 className="font-semibold text-gray-800">Services</h2>
              <ul className="list-disc ml-5 mt-2">
                {services.map((s, index) => (
                  <li key={index}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {images?.length > 0 && (
        <div className="mt-8">
          <h2 className="font-semibold text-gray-800 mb-2">Images</h2>
          <div className="flex gap-4 flex-wrap">
            {images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={img.alt || "Facility"}
                className="w-40 h-32 object-cover rounded shadow"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminFacilityView;
