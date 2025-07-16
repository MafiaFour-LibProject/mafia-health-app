import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
