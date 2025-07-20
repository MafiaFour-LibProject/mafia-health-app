import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllFacilities } from "../services/facilityService";
import { RefreshCcw } from "lucide-react";
import Loader from "./Loader";
import FacilityCard from "./FacilityCard";

const type = ["hospital", "pharmacy"];

const FacilityGrid = () => {
  const [allFacilities, setAllFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const data = await getAllFacilities();
      setAllFacilities(data);
      setFilteredFacilities(data);
    } catch (err) {
      setError("Failed to load facilities. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedType, allFacilities]);

  const applyFilters = () => {
    let result = allFacilities;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.location?.city?.toLowerCase().includes(q) ||
          f.location?.address?.toLowerCase().includes(q)
      );
    }

    if (selectedType) {
      result = result.filter((f) => f.type === selectedType);
    }

    setFilteredFacilities(result);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedType("");
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="py-12 px-4 md:px-10 bg-gradient-to-br from-white via-green-50 to-blue-50 min-h-[60vh]">
      {/* Filter Bar */}
      <div className="bg-white/90 backdrop-blur rounded-xl shadow-lg w-full max-w-5xl mx-auto mb-10 p-6 border border-green-100">
        <form className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search facilities, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-base border border-gray-200 rounded-lg bg-white text-gray-900 shadow-sm focus:ring-green-600 focus:border-green-600 placeholder:text-sm"
            />
          </div>
          <div className="flex-1">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 text-base border border-gray-200 rounded-lg bg-white text-gray-700 shadow-sm focus:ring-green-600 focus:border-green-600"
            >
              <option value="">Select facility type</option>
              {type.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleResetFilters}
              className="bg-white border border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-2 px-5 rounded-lg shadow-sm transition text-base flex items-center gap-2"
            >
              <RefreshCcw className="size-4" /> Reset
            </button>
          </div>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {filteredFacilities.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg py-12">
            No facilities found.
          </div>
        ) : (
          filteredFacilities.map((facility) => (
            <FacilityCard key={facility._id} facility={facility} />
          ))
        )}
      </div>
    </div>
  );
};

export default FacilityGrid;
