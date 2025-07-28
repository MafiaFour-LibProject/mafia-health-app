import { useNavigate } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
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
      className="group cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-cyan-100 overflow-hidden h-full flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={facility.images?.[0]?.url ?? defaultImage}
          alt={facility.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-darkBlue-800">
            {facility.name}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              facility.type === "hospital"
                ? "bg-blue-50 text-blue-700"
                : "bg-cyan-50 text-cyan-700"
            }`}
          >
            {facility.type.charAt(0).toUpperCase() + facility.type.slice(1)}
          </span>
        </div>

        <div className="flex items-start gap-2 mb-4">
          <MapPin className="flex-shrink-0 mt-0.5 size-5 text-sac-state-secondary " />
          <p className="text-sac-state-secondary  text-sm">
            {facility.location?.address || "Unknown address"},{" "}
            {facility.location?.city || "Unknown city"}
          </p>
        </div>

        <div className="mt-auto">
          <div className="inline-flex items-center justify-between w-full px-4 py-2 bg-unt-deep hover:bg-sac-state-secondary text-white border border-gray-200 rounded-md transition-all group-hover:border-darkCyan-300">
            <span className="text-sm text-darkBlue-700">View Details</span>
            <ArrowRight className="size-4 text-white group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;
