import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllFacilities } from "../services/facilityService";
import Loader from "./Loader";
import { Calendar, MapPin, RefreshCcw, Search } from "lucide-react";

const typeOptions = ["hospital", "pharmacy"];
const defaultImage = "/images/hero-image-3.jpg";

const AllFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const fetchFacilities = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (searchTerm) params.q = searchTerm;
      if (selectedType) params.type = selectedType;

      const response = await getAllFacilities(params);
      const facilitiesArray = response.data;

      if (!Array.isArray(facilitiesArray)) {
        throw new Error("Expected an array of facilities");
      }

      setFacilities(facilitiesArray);
    } catch (err) {
      console.error("Error fetching facilities:", err);
      setError("Failed to load facilities. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleSearch = () => fetchFacilities();

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    fetchFacilities();
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6">
      {/* Search & Filter Form */}
      <div className="bg-white p-5 shadow-lg mt-16 border border-green-200 max-w-3xl mx-auto rounded-lg">
        <form className="flex flex-col gap-4 md:flex-row md:gap-6">
          <input
            type="text"
            id="searchTerm"
            placeholder="Search medications, vaccines, conditions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:flex-1 w-full px-4 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 shadow-sm focus:ring-green-600 focus:border-green-600 placeholder:text-sm"
          />

          <select
            id="typeFilter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="md:flex-1 w-full px-2 py-2.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 shadow-sm focus:ring-green-600 focus:border-green-600"
          >
            <option value="">Select facility type</option>
            {typeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <div className="flex gap-2 md:gap-3">
            <button
              type="button"
              onClick={handleResetFilters}
              className="bg-white border border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-2 px-3 rounded-md shadow-sm transition"
            >
              <RefreshCcw className="size-4" />
            </button>
            <button
              type="button"
              onClick={handleSearch}
              className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-green-700 transition"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* How It Works */}
      <div className="text-center py-16 bg-white mt-10 shadow-2xl">
        <h3 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-8">
          How MAFIA Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
          {[
            { icon: <Search className="size-5" />, label: "Search" },
            { icon: <MapPin className="size-5" />, label: "Find" },
            { icon: <Calendar className="size-5" />, label: "Book" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 shadow-2xl p-6"
            >
              <div className="rounded-full flex gap-x-2 bg-green-100 px-3 py-2 font-semibold items-center">
                {icon}
                <p>{label}</p>
              </div>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
                quod vitae incidunt illum voluptates exercitationem.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 px-6 py-12 bg-white">
        {facilities.map((f) => (
          <Link to={`/facilities/${f._id}`} key={f._id}>
            <div className="bg-white border border-green-200 hover:border-green-300 rounded-xl overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl">
              <img
                src={f.images?.[0]?.url ?? defaultImage}
                alt={f.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-700">{f.name}</h3>
                  <span className="bg-orange-100 text-orange-500 text-xs font-semibold px-3 py-1 rounded-full border border-orange-300">
                    {f.type}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 gap-1">
                  <MapPin className="size-4 text-green-600" />
                  <p>
                    {f.location?.address || "Unknown address"},{" "}
                    {f.location?.city || "Unknown city"}
                  </p>
                </div>
                <div className="flex items-center justify-center mt-4 py-2 border border-gray-200 hover:bg-gray-50 transition">
                  <MapPin className="size-4 text-gray-600" />
                  <p className="ml-2 text-sm text-gray-700">View on map</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllFacilities;
