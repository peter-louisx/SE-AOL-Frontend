import { Navigate } from "react-router-dom";
import { getCookie } from "./auth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("token"); // or use your auth logic
  const token = getCookie("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
