import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin } from "lucide-react";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <main className="flex-grow mb-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
