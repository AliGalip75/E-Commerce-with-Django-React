import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { accessToken } = useAuth();

  return accessToken ? children : <Navigate to="/accounts/login" />;
};

export default PrivateRoute;
