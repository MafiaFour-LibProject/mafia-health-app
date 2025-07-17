//Lists all facilities, with search + filter and a button to sign up

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { getAllFacilities } from "../../services/facilityService";
import { Calendar, MapPin, RefreshCcw, Search } from "lucide-react";

const type = ["hospital", "pharmacy"];

const Home = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const defaultImage = "/images/hero-image-3.jpg";

  const fetchFacilities = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (searchTerm) {
        params.q = searchTerm;
      }
      if (selectedType) {
        params.type = selectedType;
      }

      const data = await getAllFacilities(params);
      console.log("fetched data:", data);

      const facilitiesArray = data;

      if (!Array.isArray(facilitiesArray)) {
        throw new Error("Expected an array of facilities");
      }
      setFacilities(facilitiesArray);
    } catch (err) {
      console.log("Error fetching facilities:", err);
      setError("Failed to load facilities. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleSearch = () => {
    fetchFacilities();
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    fetchFacilities();
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div
        className="relative min-h-[70vh] md:min-h-[90vh] w-full bg-cover bg-center flex flex-col"
        style={{ backgroundImage: "url('/images/home-hero-image-4.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70 z-0"></div>
        {/* Nav */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-4 py-3 md:px-10 md:py-6 w-full">
          <span className="text-white text-lg font-bold mb-2 md:mb-0">
            Logo
          </span>
          <div className="flex gap-1">
            <Link to="/auth/signup">
              <button className="bg-white text-gree-600 font-semibold py-1 px-4 rounded-md shadow hover:bg-green-100 transition text-sm md:text-base">
                Sign up
              </button>
            </Link>
            <Link to="/auth/login">
              <button className="bg-green-600 text-white font-semibold py-1 px-4 rounded-md shadow hover:bg-green-700 transition text-sm md:text-base">
                Log in
              </button>
            </Link>
          </div>
        </div>
        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center md:items-start justify-center px-4 md:px-10 py-6 w-full flex-1 mt-3">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold drop-shadow-sm mb-5 text-white max-w-xl">
            My Access to Fast <br />
            and Immediate Aid
          </h1>
          <p className="text-center md:text-start text-xl md:text-2xl mb-3 max-w-2xl text-white">
            Quickly find{" "}
            <span className="text-green-500 ">hospitals and pharmacies</span> in
            Accra that provide critical medications, vaccines, and tests.
          </p>
          {/* <button className="flex items-center gap-x-2 bg-green-600 text-white py-2 px-4 rounded-full mt-3 hover:bg-green-800 hover:text-white transition cursor-pointer w-fit">
            <MapPin />
            Get Facilities Nearby
          </button> */}
          <div className="input-container bg-white p-5 shadow-lg mt-16 border border-green-200 w-full max-w-3xl rounded-lg">
            <form className="flex flex-col gap-4 md:flex-row md:gap-6 w-full">
              <div className="md:flex-1">
                {/* <label
                  htmlFor="searchTerm"
                  className="block text-sm font-medium text-gray-800 mb-2"
                >
                  What's your emergency?
                </label> */}
                <input
                  type="text"
                  id="searchTerm"
                  placeholder="Search medications, vaccines, conditions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 shadow-sm focus:ring-green-600 focus:border-green-600 transition placeholder:text-[12px]"
                />
              </div>
              <div className="md:flex-1">
                {/* <label
                  htmlFor="typeFilter"
                  className="block text-sm font-medium text-gray-800 mb-2"
                >
                  Select the facility type
                </label> */}
                <select
                  id="typeFilter"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-2 py-3 text-sm border border-gray-300 rounded-md bg-white text-gray-500 shadow-sm focus:ring-green-600 focus:border-green-600 transition text-[12px] "
                >
                  <option value="">Select facility type</option>
                  {type.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 md:gap-3 mt-1 md:mt-0">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="bg-white border border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-1 px-3 md:px-7 rounded-md shadow-sm transition cursor-pointer text-sm md:text-base"
                >
                  <RefreshCcw />
                </button>
                <button
                  type="button"
                  onClick={handleSearch}
                  className="bg-green-600 w-full text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-green-700 transition cursor-pointer text-sm md:text-base"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center py-10 md:py-15 bg-white mx-10 mt-10 shadow-2xl">
        <h3 className="mb-8 text-2xl md:text-4xl font-extrabold text-green-800 drop-shadow-sm">
          How MAFIA Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl px-4 md:px-10">
          <div className="flex flex-col justify-center items-center gap-2 mb-4 shadow-2xl p-6">
            <div className="rounded-full flex gap-x-2 bg-orange-200 px-3 py-2 font-semibold items-center justify-center">
              <Search className="size-5" />
              <p>Search</p>
            </div>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              quod vitae incidunt illum voluptates exercitationem, tempore eum
              eligendi recusandae eos.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 mb-4 shadow-2xl p-6">
            <div className="rounded-full flex gap-x-2 bg-purple-200 px-3 py-2 font-semibold items-center justify-center">
              <MapPin className="size-5" />
              <p>Find</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              quod vitae incidunt illum voluptates exercitationem, tempore eum
              eligendi recusandae eos.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 mb-4 shadow-2xl p-6">
            <div className="rounded-full flex gap-x-2 bg-amber-200 px-3 py-2 font-semibold items-center justify-center">
              <Calendar className="size-5" />
              <p>Book</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              quod vitae incidunt illum voluptates exercitationem, tempore eum
              eligendi recusandae eos.
            </p>
          </div>
        </div>
      </div>

      <div className="bottom flex flex-col gap-10 md:grid md:grid-cols-2 xl:grid-cols-4 xl:p-12 p-10 md:p-20 bg-white">
        {facilities.map((f) => (
          <Link to={`/facilities/${f._id}`} key={f._id}>
            <div className="facility-card bg-white  border border-green-200 hover:border-green-300 hover:-translate-y-1 hover:shadow-xl transition transform duration-500 rounded-xl">
              <img
                src={f.images?.[0]?.url ?? defaultImage}
                alt={f.name}
                className="w-full h-50 object-cover rounded-t-xl"
              />
              <div className="px-5 py-5">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <h3 className="mt-4 text-l font-bold text-gray-700 text-nowrap">
                    {f.name}
                  </h3>
                  <div className="flex flex-row gap-x-1 mt-4 items-center">
                    <p className="bg-orange-200 px-3 py-1 rounded-full text-orange-400 text-sm border border-orange-300 font-semibold text-[10px]">
                      {f.type}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row gap-x-1 mt-2 items-center justify-center md:justify-normal">
                  <MapPin className="size-5 text-green-600" />
                  <p className="text-gray-500 font-semibold">
                    {f.location?.address || "Unknown address"},{" "}
                    {f.location?.city || "Unknown city"}
                  </p>
                </div>

                <div
                  className="flex flex-row gap-x-1 mt-4 justify-center items-center border border-gray-200 py-2 hover:bg hover:border-2 hover:border-green-200"
                  y-2
                >
                  <MapPin className="size-4 text-gray-600" />
                  <p className="text-[14px]">View on map</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
