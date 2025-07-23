import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Search,
  Bot,
  X,
  SendHorizonal,
  RotateCcw,
} from "lucide-react";
import FacilityGrid from "../../components/FacilityGrid";
import {
  getNearbyFacilities,
  queryChatbot,
} from "../../services/facilityService";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const Home = () => {
  const [nearbyFacilities, setNearbyFacilities] = useState([]);
  const [loadingNearby, setLoadingNearby] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);

  const { user, logout } = useAuth();

  useEffect(() => {
    console.log(user);
  }, []);

  const handleLocateNearby = () => {
    setLoadingNearby(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const facilities = await getNearbyFacilities(latitude, longitude);
          setNearbyFacilities(facilities);
        } catch (error) {
          console.error("Error fetching nearby facilities:", error);
          setLocationError("Could not fetch nearby facilities.");
        } finally {
          setLoadingNearby(false);
        }
      },
      (error) => {
        setLocationError("Location access denied.");
        setLoadingNearby(false);
      }
    );
  };

  const handleResetNearby = () => {
    setNearbyFacilities([]);
    setLocationError(null);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatLoading(true);
    setChatResponse("");
    setChatError(null);

    try {
      const res = await queryChatbot(chatInput);
      setChatResponse(res?.response || "No response from chatbot.");
    } catch (err) {
      setChatError("Error connecting to chatbot.");
    } finally {
      setChatLoading(false);
    }
  };

  const handleLogout = () => logout();

  return (
    <div className="relative">
      <div
        className="relative min-h-[70vh] md:min-h-[90vh] w-full bg-cover bg-center flex flex-col"
        style={{ backgroundImage: "url('/images/home-hero-image-4.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70 z-0"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-4 py-3 md:px-10 md:py-6 w-full">
          <span className="text-white text-lg font-bold mb-2 md:mb-0">
            Logo
          </span>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-green-600 text-white font-semibold py-1 px-4 rounded-md shadow hover:bg-green-700 transition text-sm md:text-base"
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-1">
              <Link to="/auth/signup">
                <button className="bg-white text-green-600 font-semibold py-1 px-4 rounded-md shadow hover:bg-green-100 transition text-sm md:text-base">
                  Sign up
                </button>
              </Link>
              <Link to="/auth/login">
                <button className="bg-green-600 text-white font-semibold py-1 px-4 rounded-md shadow hover:bg-green-700 transition text-sm md:text-base">
                  Log in
                </button>
              </Link>
            </div>
          )}
        </div>

        <div className="relative z-10 flex flex-col items-center md:items-start justify-center px-4 md:px-10 py-6 w-full flex-1 mt-3">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold drop-shadow-sm mb-5 text-white max-w-xl">
            My Access to Fast <br /> and Immediate Aid
          </h1>
          <p className="text-center md:text-start text-xl md:text-2xl mb-3 max-w-2xl text-white">
            Quickly find{" "}
            <span className="text-green-500">hospitals and pharmacies</span> in
            Accra that provide critical medications, vaccines, and tests.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center py-10 md:py-15 bg-white mx-4 md:mx-10 mt-10 shadow-2xl">
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
            <div className="rounded-full flex gap-x-2 bg-amber-200 px-3 py-2 font-semibold items-center justify-center">
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

      <div className="bg-gray-100 px-4 md:px-10 py-8 rounded-xl shadow-lg mt-10 mx-4 md:mx-10">
        <h2 className="text-xl font-semibold mb-4 text-green-800 text-center">
          Find Facilities Near You
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleLocateNearby}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            Locate Nearby
          </button>
          <button
            onClick={handleResetNearby}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
        {loadingNearby && (
          <p className="text-center text-gray-600 mt-3">
            Finding facilities near you...
          </p>
        )}
        {locationError && (
          <p className="text-center text-red-500 mt-2">{locationError}</p>
        )}
      </div>

      {nearbyFacilities.length > 0 ? (
        <div className="px-4 md:px-10 mt-10">
          <h2 className="text-2xl font-bold mb-4 text-green-800">
            Facilities Near You
          </h2>
          <FacilityGrid facilities={nearbyFacilities} />
        </div>
      ) : (
        <FacilityGrid showSearch />
      )}

      {!showChatbot && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setShowChatbot(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-lg transition"
          >
            <Bot className="w-5 h-5" />
            <span className="hidden md:inline">Chat with AI</span>
          </button>
        </div>
      )}

      {showChatbot && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-full bg-white rounded-lg shadow-lg flex flex-col border border-gray-300">
          <div className="flex justify-between items-center bg-green-600 text-white px-4 py-2 rounded-t-lg">
            <h2 className="font-semibold">AI Assistant</h2>
            <button onClick={() => setShowChatbot(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-3 h-60 overflow-y-auto text-sm text-gray-800 border-b border-gray-200">
            {chatLoading ? (
              <p className="text-gray-400">Loading...</p>
            ) : chatError ? (
              <p className="text-red-500">{chatError}</p>
            ) : chatResponse ? (
              <p>{chatResponse}</p>
            ) : (
              <p className="text-gray-400">
                Ask me anything about healthcare access!
              </p>
            )}
          </div>

          <form
            onSubmit={handleChatSubmit}
            className="flex p-2 gap-2 items-center"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Don't rely solely on AI responses..."
              className="flex-1 border border-gray-300 px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm"
            >
              <SendHorizonal className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
