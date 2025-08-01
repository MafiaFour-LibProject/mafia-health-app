import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidebarUser from "../components/SidebarUser";
import { useState } from "react";

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar />{" "} */}
      <SidebarUser
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <main
        className={`flex-1 px-8 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        } `}
      >
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default UserLayout;
