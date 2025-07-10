import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SuperadminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> {/* We need to adjust it to be superadmin-specific */}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SuperadminLayout;
