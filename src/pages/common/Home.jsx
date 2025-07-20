import { Link } from "react-router-dom";
import { Calendar, MapPin, Search } from "lucide-react";
import FacilityGrid from "../../components/FacilityGrid";

const Home = () => {
  return (
    <div>
      <div
        className="relative min-h-[70vh] md:min-h-[90vh] w-full bg-cover bg-center flex flex-col"
        style={{ backgroundImage: "url('/images/home-hero-image-4.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-blue-900/60 to-black/80 z-0"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 py-4 md:px-16 md:py-8 w-full">
          <span className="text-white text-2xl font-extrabold tracking-widest mb-4 md:mb-0 drop-shadow-lg">
            MaFia
          </span>
          <div className="flex gap-3">
            <Link to="/auth/signup">
              <button className="bg-white/80 text-green-700 font-semibold py-2 px-6 rounded-lg shadow hover:bg-green-100 transition text-base backdrop-blur">
                Sign up
              </button>
            </Link>
            <Link to="/auth/login">
              <button className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-green-700 transition text-base">
                Log in
              </button>
            </Link>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center md:items-start justify-center px-6 md:px-16 py-10 w-full flex-1 mt-3">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-xl max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold drop-shadow mb-6 text-white">
              My Access to Fast <br />
              and Immediate Aid
            </h1>
            <p className="text-center md:text-left text-xl md:text-2xl mb-4 max-w-2xl text-white/90">
              Quickly find{" "}
              <span className="text-green-300 font-bold">
                hospitals and pharmacies
              </span>{" "}
              in Accra that provide critical medications, vaccines, and tests.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center py-16 bg-gradient-to-br from-white via-green-50 to-blue-50 mx-auto mt-12 rounded-3xl shadow-2xl max-w-6xl">
        <h3 className="mb-12 text-3xl md:text-5xl font-extrabold text-green-800 drop-shadow-sm">
          How MAFIA Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4 md:px-10">
          <div className="flex flex-col justify-center items-center gap-4 bg-white/80 rounded-2xl shadow-lg p-8 hover:scale-105 transition">
            <div className="rounded-full bg-orange-100 p-4 mb-2 shadow">
              <Search className="size-7 text-orange-500" />
            </div>
            <h4 className="font-bold text-lg text-orange-700">Search</h4>
            <p className="text-gray-600">
              Quickly search for life-saving medicines, vaccines or emergency
              tests near you.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 bg-white/80 rounded-2xl shadow-lg p-8 hover:scale-105 transition">
            <div className="rounded-full bg-purple-100 p-4 mb-2 shadow">
              <MapPin className="size-7 text-purple-600" />
            </div>
            <h4 className="font-bold text-lg text-purple-700">Find</h4>
            <p className="text-gray-600">
              Locate hospitals and pharmacies in Accra with availability in
              real-time.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 bg-white/80 rounded-2xl shadow-lg p-8 hover:scale-105 transition">
            <div className="rounded-full bg-amber-100 p-4 mb-2 shadow">
              <Calendar className="size-7 text-amber-500" />
            </div>
            <h4 className="font-bold text-lg text-amber-700">Book</h4>
            <p className="text-gray-600">
              Reserve appointments, ask questions, or get directions all from
              one place.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <FacilityGrid showSearch />
      </div>
    </div>
  );
};

export default Home;
