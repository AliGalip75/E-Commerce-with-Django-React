import { Navigate } from "react-router-dom";
import { LocalStorageManager } from "@/utils/localStorageManager";

const PrivateRoute = ({ children }) => {
  const accessToken = LocalStorageManager.getAccessToken();

  return accessToken ? children : <Navigate to="/accounts/login" />;
};

export default PrivateRoute;
