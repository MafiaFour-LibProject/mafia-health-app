import { Link } from "react-router-dom";
import { Calendar, MapPin, Search } from "lucide-react";
import FacilityGrid from "../../components/FacilityGrid";
import { getNearbyFacilities } from "../../services/facilityService";
import { useState } from "react";
import { queryChatbot } from "../../services/facilityService";

const Home = () => {
  const [nearbyFacilities, setNearbyFacilities] = useState([]);
  const [loadingNearby, setLoadingNearby] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);

  const handleLocateNearby = () => {
    setLoadingNearby(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User location:", latitude, longitude);
        try {
          const facilities = await getNearbyFacilities(latitude, longitude);
          setNearbyFacilities(facilities);
        } catch (error) {
          console.error("Error fetching nearby facilities:", error);
          setLocationError("Could not fetch facilities.");
        } finally {
          setLoadingNearby(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationError("Location access denied.");
        setLoadingNearby(false);
      }
    );
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    setChatLoading(true);
    setChatError(null);
    setChatResponse("");

    try {
      const res = await queryChatbot(chatInput);
      setChatResponse(res?.response || "No response from chatbot");
    } catch (err) {
      setChatError(err.message);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div>
      <div
        className="relative min-h-[70vh] md:min-h-[90vh] w-full bg-cover bg-center flex flex-col"
        style={{ backgroundImage: "url('/images/home-hero-image-4.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70 z-0"></div>

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
              Quickly search for life-saving medicines, vaccines or emergency
              tests near you.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 mb-4 shadow-2xl p-6">
            <div className="rounded-full flex gap-x-2 bg-purple-200 px-3 py-2 font-semibold items-center justify-center">
              <MapPin className="size-5" />
              <p>Find</p>
            </div>
            <p>
              Locate hospitals and pharmacies in Accra with availability in
              real-time.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 mb-4 shadow-2xl p-6">
            <div className="rounded-full flex gap-x-2 bg-amber-200 px-y3 py-2 font-semibold items-center justify-center">
              <Calendar className="size-5" />
              <p>Book</p>
            </div>
            <p>
              Reserve appointments, ask questions, or get directions all from
              one place.
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={handleLocateNearby}
        className="mt-4 bg-green-600 text-white font-semibold py-2 px-6 rounded-md shadow hover:bg-green-700 transition"
      >
        Locate a facility nearby
      </button>
      {loadingNearby && (
        <p className="text-white mt-2">Finding facilities near you...</p>
      )}
      {locationError && <p className="text-red-400 mt-2">{locationError}</p>}

      <FacilityGrid showSearch />
      {nearbyFacilities.length > 0 && (
        <div className="px-4 md:px-10 mt-10">
          <h2 className="text-2xl font-bold mb-4 text-green-800">
            Facilities Near You
          </h2>
          <FacilityGrid facilities={nearbyFacilities} />
        </div>
      )}
    </div>
  );
};

export default Home;
