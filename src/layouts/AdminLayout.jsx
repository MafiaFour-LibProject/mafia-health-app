import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> {/* Note: we need to adjust it to be admin-specific */}
      <main className="flex-grow my-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
