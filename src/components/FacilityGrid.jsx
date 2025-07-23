import { useState, useEffect } from "react";
import { RefreshCcw, Search, Filter } from "lucide-react";
import { getAllFacilities } from "../services/facilityService";
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
      const activeFacilities = data.filter((f) => f.isActive);
      setAllFacilities(activeFacilities);
      setFilteredFacilities(activeFacilities);
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
  if (error) return <p className="text-red-400 text-center">{error}</p>;

  return (
    <div className="py-12 px-4 md:px-10 bg-white min-h-[60vh]">
      <div className="bg-gray-50 rounded-xl shadow-md w-full max-w-6xl mx-auto mb-10 p-6 border border-gray-200">
        <form className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-darkBlue-600" />
            </div>
            <input
              type="text"
              placeholder="Search facilities"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-darkBlue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-darkBlue-600" />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-darkBlue-500 focus:border-transparent appearance-none"
            >
              <option value="">All Facility Types</option>
              {type.map((t) => (
                <option key={t} value={t} className="bg-white">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <button
              type="button"
              onClick={handleResetFilters}
              className="bg-white hover:bg-gray-700/80 text-gray-900 px-5 py-2.5 rounded-lg flex items-center gap-2 border border-gray-700/50 hover:border-gray-200/70 cursor-pointer hover:text-white transition-all duration-300"
            >
              <RefreshCcw className="size-5" />
              Reset
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-15">
        {filteredFacilities.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="inline-flex flex-col items-center justify-center bg-gray-50 rounded-xl p-8 border border-gray-200">
              <p className="text-xl text-darkBlue-800 mb-2">
                No facilities found
              </p>
              <p className="text-gray-600">Try adjusting your search filters</p>
            </div>
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
