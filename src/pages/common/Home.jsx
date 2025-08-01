import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Search,
  Bot,
  X,
  SendHorizonal,
  RotateCcw,
  Menu,
} from "lucide-react";
import FacilityGrid from "../../components/FacilityGrid";
import {
  getNearbyFacilities,
  queryChatbot,
} from "../../services/facilityService";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

const Home = () => {
  const [nearbyFacilities, setNearbyFacilities] = useState([]);
  const [loadingNearby, setLoadingNearby] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
        console.log("Latitude", latitude, "Longitude", longitude);
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
        className="relative min-h-[70vh] md:min-h-[95vh] w-full bg-cover bg-center flex flex-col"
        style={{ backgroundImage: "url('/images/home-hero-image-4.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70 z-0"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-4 py-3 md:px-4 md:py-3 w-full">
          <div className="flex items-center justify-between w-full md:w-auto">
            <img
              className="w-50 h-20 object-cover"
              src="/images/codeblue-logo-2.png"
              alt="Code Blue Logo"
            />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          <div
            className={`mt-2 md:mt-0 w-full md:w-auto flex-col md:flex-row md:flex items-center justify-end gap-2 transition-all duration-300 ease-in-out overflow-hidden md:overflow-visible ${
              menuOpen ? "flex" : "hidden md:flex"
            }`}
          >
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-transparent border border-white text-white font-semibold py-1 px-4 rounded-md shadow hover:bg-green-700 transition text-sm md:text-base"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col md:flex-row gap-2 md:gap-1 w-full md:w-auto">
                <Link to="/auth/signup">
                  <button className="bg-unt-deep text-white font-semibold py-1 px-4 rounded-md shadow hover:bg-sac-state-secondary hover:text-white cursor-pointer transition text-sm md:text-base w-full md:w-auto">
                    Sign up
                  </button>
                </Link>
                <Link to="/auth/login">
                  <button className="bg-transparent text-white border border-white font-semibold py-1 px-4 rounded-md shadow hover:bg-white cursor-pointer hover:text-black transition text-sm md:text-base w-full md:w-auto">
                    Log in
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center md:items-start justify-center px-4 md:px-10 py-6 w-full flex-1 mt-3">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold drop-shadow-sm mb-5 text-white max-w-xl">
            Your Access to Fast <br /> and Immediate Aid
          </h1>
          <p className="text-center md:text-start text-xl md:text-2xl mb-3 max-w-2xl text-white">
            Quickly find{" "}
            <span className="text-green-500 font-extrabold">
              hospitals and pharmacies
            </span>{" "}
            in Accra that provide critical medications, vaccines, and tests.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-br from-darkBlue-900 to-darkCyan-800 py-16 md:py-24 px-4 md:px-10 mx-4 md:mx-10 rounded-2xl shadow-2xl transform transition-all hover:shadow-3xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-cyan-300 blur-xl"></div>
          <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-blue-400 blur-xl"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <div className="flex flex-col gap-y-4 items-center justify-center">
            <QuestionMarkCircleIcon className="size-12 text-sac-state-secondary" />
            <h3 className="mb-12 text-3xl md:text-5xl bg-clip-text text-sac-state-secondary font-extrabold">
              How CodeBlue Works
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl px-4">
            <div className="group relative bg-white bg-opacity-50 backdrop-blur-md rounded-xl p-8 border border-unt-border hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-cyan-500/10 to-green-600/10"></div>
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="rounded-full flex gap-x-2 bg-unt-deep px-4 py-3 font-semibold items-center justify-center shadow-lg">
                  <Search className="size-5 text-cyan-100" />
                  <p className="text-gray-100">Search</p>
                </div>
                <p className="text-sac-state-secondary mt-2 leading-relaxed">
                  Quickly search for life-saving medicines, vaccines or
                  emergency tests near you.
                </p>
              </div>
            </div>

            <div className="group relative bg-white bg-opacity-50 backdrop-blur-md rounded-xl p-8 border border-unt-border hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-cyan-500/10 to-green-600/10"></div>
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="rounded-full flex gap-x-2 bg-unt-deep px-6 py-3 font-semibold items-center justify-center shadow-lg">
                  <MapPin className="size-5 text-cyan-100" />
                  <p className="text-gray-100">Find</p>
                </div>
                <p className="text-sac-state-secondary  mt-2 leading-relaxed">
                  Locate hospitals and pharmacies in Accra with availability in
                  real-time.
                </p>
              </div>
            </div>

            <div className="group relative bg-white bg-opacity-50 backdrop-blur-md rounded-xl p-8 border border-unt-border hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-cyan-500/10 to-green-600/10"></div>
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="rounded-full flex gap-x-2 bg-unt-deep px-6 py-3 font-semibold items-center justify-center shadow-lg">
                  <Calendar className="size-5 text-cyan-100" />
                  <p className="text-gray-100">Book</p>
                </div>
                <p className="text-sac-state-secondary mt-2 leading-relaxed">
                  Reserve appointments, ask questions, or get directions all
                  from one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-darkBlue-900/80 to-darkCyan-800/80 px-6 md:px-8 py-8 rounded-xl shadow-2xl mt-10 mx-4 md:mx-10 backdrop-blur-sm border border-unt-border overflow-hidden">
        <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-cyan-400/10 blur-xl"></div>

        <h2 className="text-xl md:text-2xl mb-6 text-center bg-clip-text text-sac-state-secondary font-extrabold">
          Looking for meds, vaccines, or tests? Find nearby facilities that have
          them <br />
          No more hopping all over town.
        </h2>

        {loadingNearby && (
          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-900/30 text-cyan-200">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-cyan-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Finding facilities near you...
            </div>
          </div>
        )}

        {locationError && (
          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center px-4 py-2 rounded-lg bg-red-900/40 text-red-200 border border-red-700/50">
              <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
              {locationError}
            </div>
          </div>
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
            className="flex items-center gap-2 bg-unt-deep hover:bg-sac-state-secondary cursor-pointer text-white px-6 py-2 rounded-full shadow-lg transition"
          >
            <Bot className="w-5 h-5" />
            <span className="hidden md:inline">CodeBlue AI</span>
          </button>
        </div>
      )}

      {showChatbot && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-full bg-white rounded-lg shadow-lg flex flex-col border border-gray-300">
          <div className="flex justify-between items-center bg-green-800 text-white px-4 py-2 rounded-t-lg">
            <h2 className="font-semibold">AI Assistant</h2>
            <button onClick={() => setShowChatbot(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-3 h-60 overflow-y-auto text-sm text-green-800 border-b border-gray-200">
            {chatLoading ? (
              <p className="text-gray-400">Loading...</p>
            ) : chatError ? (
              <p className="text-gray-500">{chatError}</p>
            ) : chatResponse ? (
              <p>{chatResponse}</p>
            ) : (
              <p className="text-sac-state-secondary">
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
              className="flex-1 border border-gray-300 px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
              type="submit"
              className="bg-green-800 hover:bg-green-900 text-white px-3 py-1 rounded-md text-sm"
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
