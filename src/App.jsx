import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";

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
import SuperAdminDashboard from "./pages/superadmin/SuperadminDashboard";
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
import AllFacilities from "./components/AllFacilities";
import SuperAdminFacilityView from "./pages/superadmin/SuperAdminFacilityView";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import ProtectedRoute from "./ProtectedRoute";
import AboutUs from "./pages/AboutUs";

function App() {
  const router = createBrowserRouter([
    // Public Routes
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "facilities/:facilityId", element: <FacilityDetails /> },
        { path: "all-facilities", element: <AllFacilities /> },
        { path: "/about-us", element: <AboutUs /> },
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
    { path: "/verify-email", element: <VerifyEmailToken /> },

    // User Routes
    {
      element: <ProtectedRoute roles={["user"]} />,
      children: [
        {
          path: "/user",
          element: <UserLayout />,
          children: [
            { index: true, element: <UserDashboard /> },
            { path: "appointments", element: <UserAppointments /> },
            { path: "reviews", element: <ReviewList /> },
            { path: "user-page", element: <Home /> },
            { path: "facilities/:facilityId", element: <FacilityDetails /> },
          ],
        },
      ],
    },

    // Admin Routes
    {
      element: <ProtectedRoute roles={["facility_admin"]} />,
      children: [
        {
          path: "/admin",
          element: <AdminLayout />,
          children: [
            { index: true, element: <AdminDashboard /> },
            { path: "appointments", element: <AdminAppointments /> },
            { path: "reviews/:facilityId", element: <AdminReviews /> },
            { path: "profile", element: <AdminProfile /> },
            { path: "settings", element: <AdminSettingsPage /> },
          ],
        },
      ],
    },

    // Superadmin Routes
    {
      element: <ProtectedRoute roles={["superadmin"]} />,
      children: [
        {
          path: "/superadmin",
          element: <SuperAdminLayout />,
          children: [
            { index: true, element: <SuperAdminDashboard /> },
            { path: "facilities/:id", element: <SuperAdminFacilityView /> },
            { path: "facilities", element: <SuperadminFacilities /> },
            { path: "users", element: <SuperadminUsers /> },
            { path: "analytics", element: <Analytics /> },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <NuqsAdapter>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={3000} />
      </NuqsAdapter>
    </>
  );
}

export default App;
