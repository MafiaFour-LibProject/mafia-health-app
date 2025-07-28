import { useState, useEffect } from "react";
import { RefreshCcw, Search, Filter } from "lucide-react";
import { getAllFacilities } from "../services/facilityService";
import Loader from "./Loader";
import FacilityCard from "./FacilityCard";
import { searchServices } from "../services/serviceService";
import { parseAsFloat, parseAsString, useQueryStates } from "nuqs";
import { useDebounce } from "@uidotdev/usehooks";

const type = ["hospital", "pharmacy"];

const FacilityGrid = () => {
  const [allFacilities, setAllFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [queries, setQueries] = useQueryStates({
    query: parseAsString.withDefault(""),
    lat: parseAsFloat.withDefault(0),
    lng: parseAsFloat.withDefault(0),
  });

  const debouncedSearchTerm = useDebounce(queries.query, 500);

  // Get geolocation on first load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setQueries({
          lat: latitude,
          lng: longitude,
        });
      },
      (error) => {
        console.error("Location access denied or failed.", error);
        setLoading(false);
      }
    );
  }, []);

  // Fetch facilities on search or type change
  useEffect(() => {
    fetchFacilities();
  }, [debouncedSearchTerm, selectedType]);

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      let facilities = [];

      if (debouncedSearchTerm.trim()) {
        const response = await searchServices(queries);
        const serviceMatches = response.data.services || [];

        // Deduplicate by facility._id
        const matchedFacilities = serviceMatches
          .filter((s) => s.isActive && s.facility)
          .map((s) => s.facility);

        const uniqueFacilities = Array.from(
          new Map(matchedFacilities.map((f) => [f._id, f])).values()
        );

        facilities = uniqueFacilities;
      } else {
        const response = await getAllFacilities();
        const data = response || [];
        facilities = data.filter((f) => f.isActive);
      }

      const finalList = selectedType
        ? facilities.filter((f) => f.type === selectedType)
        : facilities;

      setAllFacilities(facilities);
      setFilteredFacilities(finalList);
      setError(null);
    } catch (err) {
      console.error("Error fetching facilities:", err);
      setError("Failed to load facilities. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setQueries({
      query: e.target.value,
    });
  };

  const handleResetFilters = () => {
    setQueries({ query: "" });
    setSelectedType("");
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-400 text-center">{error}</p>;

  return (
    <div className="py-12 px-2 md:px-10 bg-white min-h-[60vh]">
      <div className="bg-gray-50 rounded-xl shadow-md w-full max-w-6xl mx-auto mb-10 p-6 border border-gray-200">
        <form className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-sac-state-secondary" />
            </div>
            <input
              type="text"
              placeholder="Search services...e.g. 'rabies vaccine'"
              value={queries.query}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white border border-unt-border rounded-lg text-sac-state-secondary placeholder-sac-state-secondary focus:outline-none focus:ring-2 focus:ring-darkBlue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-sac-state-secondary" />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sac-state-secondary focus:outline-none focus:ring-2 focus:ring-darkBlue-500 focus:border-transparent appearance-none"
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
              className="bg-white hover:bg-sac-state-secondary text-sac-state-secondary px-5 py-2.5 rounded-lg flex items-center gap-2 border border-gray-700/50 hover:border-gray-200/70 cursor-pointer hover:text-white transition-all duration-300"
            >
              <RefreshCcw className="size-5" />
              Reset
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 max-w-7xl mx-10">
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
