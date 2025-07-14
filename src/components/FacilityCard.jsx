import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleFacility } from "../services/facilityService";
import { Loader, MapPin, Clock, Building2 } from "lucide-react";

const FacilityCard = () => {
  const { id } = useParams();
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleFacilityDetails = async () => {
      try {
        const data = await getSingleFacility(id);
        setFacility(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSingleFacilityDetails();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-40 text-green-600">
        <Loader className="animate-spin" />
      </div>
    );

  if (error) return <p className="text-red-500 text-sm">Error: {error}</p>;

  if (!facility)
    return <p className="text-gray-600 text-sm">Facility not found</p>;

  return (
    <div className="w-full space-y-6 text-gray-800">
      <div>
        <h1 className="text-2xl font-semibold text-green-600 mb-1">
          {facility.name}
        </h1>
        <p className="text-sm text-gray-500">Welcome to our facility</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <img
          src={facility.image}
          alt={`${facility.name} image`}
          className="w-full h-100 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/home-hero-image.jpg";
          }}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Building2 size={18} className="text-green-600" />
          <span className="text-sm font-medium text-gray-600">Type:</span>
          <span className="text-sm">{facility.type}</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin size={18} className="text-green-600" />
          <span className="text-sm font-medium text-gray-600">Location:</span>
          <span className="text-sm">{facility.location}</span>
        </div>

        <div className="flex items-center gap-3">
          <Clock size={18} className="text-green-600" />
          <span className="text-sm font-medium text-gray-600">Opens:</span>
          <span className="text-sm">{facility.openingHours}</span>
        </div>

        <div className="flex items-center gap-3">
          <Clock size={18} className="text-red-400" />
          <span className="text-sm font-medium text-gray-600">Closes:</span>
          <span className="text-sm">{facility.closingHours}</span>
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;
