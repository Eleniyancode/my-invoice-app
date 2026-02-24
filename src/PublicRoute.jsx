import { useAuth } from "./context/useAuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PublicRoute;
