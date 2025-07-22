import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const FacilityCard = ({ facility }) => {
  const navigate = useNavigate();
  const defaultImage = "/images/hero-image-3.jpg";

  const { user } = useAuth();

  const handleClick = () => {
    if (user) {
      if (user.role === "user") {
        navigate(`/user/facilities/${facility._id}`);
        return;
      }
    }

    navigate(`/facilities/${facility._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer facility-card bg-white border border-green-200 hover:border-green-300 hover:-translate-y-1 hover:shadow-xl transition transform duration-300 rounded-xl">
      <img
        src={facility.images?.[0]?.url ?? defaultImage}
        alt={facility.name}
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <div className="px-5 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h3 className="mt-4 text-base font-bold text-gray-700">
            {facility.name}
          </h3>
          <span className="bg-orange-200 px-3 py-1 rounded-full text-orange-500 text-xs font-semibold border border-orange-300">
            {facility.type}
          </span>
        </div>

        <div className="flex items-center gap-x-2 mt-2">
          <MapPin className="size-5 text-green-600" />
          <p className="text-gray-500 text-sm">
            {facility.location?.address || "Unknown address"},{" "}
            {facility.location?.city || "Unknown city"}
          </p>
        </div>

        <div className="flex justify-center items-center border border-gray-200 py-2 mt-4 rounded hover:border-green-300 cursor-pointer">
          <MapPin className="size-4 text-gray-600 mr-2" />
          <p className="text-sm">View on map</p>
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;
