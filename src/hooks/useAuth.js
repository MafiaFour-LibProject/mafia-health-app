// Custom hook for getting auth context
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
  return useContext(AuthContext);
};
