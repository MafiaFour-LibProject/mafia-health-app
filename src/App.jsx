import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import SuperAdminLayout from "./layouts/SuperAdminLayout";

// Public (Unregistered Users) Pages
import Home from "./pages/common/Home";
import FacilityDetails from "./pages/common/FacilityDetails";

// Authentication Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmailNotice from "./pages/auth/VerifyEmailNotice";
import VerifyEmailToken from "./pages/auth/VerifyEmailToken";

// Superadmin Pages
import SuperadminDashboard from "./pages/superadmin/SuperadminDashboard";
import SuperadminFacilities from "./pages/superadmin/SuperadminFacilities";
import SuperadminUsers from "./pages/superadmin/SuperadminUsers";
import Analytics from "./pages/superadmin/Analytics";
// import AddFacility from "./pages/superadmin/AddFacility";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminReviews from "./pages/admin/AdminReviews";
// import EditAdminProfile from "./pages/admin/EditAdminProfile";

// User Pages
import UserDashboard from "./pages/user/UserDashboard";
import UserAppointments from "./pages/user/UserAppointments";
// import EditUserProfile from "./pages/user/EditUserProfile";

// Review Components
import ReviewList from "./pages/reviews/ReviewList";

// Empty/Fallback
import EmptyState from "./components/EmptyState";

function App() {
  const router = createBrowserRouter([
    // Public Routes (Unregistered)
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "facilities/:id", element: <FacilityDetails /> },
        { path: "*", element: <EmptyState message="Page not found" /> },
      ],
    },

    // Auth Routes
    {
      path: "/auth",
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "verify-email", element: <VerifyEmailNotice /> },
      ],
    },

    { path: "/verify-email/:token", element: <VerifyEmailToken /> },

    // User Routes
    {
      path: "/user",
      element: <UserLayout />,
      children: [
        { index: true, element: <UserDashboard /> },
        { path: "appointments", element: <UserAppointments /> },
        // { path: "edit-profile", element: <EditUserProfile /> },
        { path: "reviews", element: <ReviewList /> },
      ],
    },

    // Admin Routes (Facility Admin)
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: "appointments", element: <AdminAppointments /> },
        { path: "reviews", element: <AdminReviews /> },
        { path: "profile", element: <AdminProfile /> },
        // { path: "edit-profile", element: <EditAdminProfile /> },
      ],
    },

    // Superadmin Routes
    {
      path: "/superadmin",
      element: <SuperAdminLayout />,
      children: [
        { index: true, element: <SuperadminDashboard /> },
        { path: "facilities", element: <SuperadminFacilities /> },
        // { path: "add-facility", element: <AddFacility /> },
        { path: "users", element: <SuperadminUsers /> },
        { path: "analytics", element: <Analytics /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
