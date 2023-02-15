import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuth } from "../../services/user.service";

const PrivateRoute = () => {
  const loginStatus = isAuth();
  const { pathname } = useLocation();

  return loginStatus ? (
    <Outlet />
  ) : (
    <Navigate to="/logowanie" state={{ from: pathname }} replace />
  );
};

export default PrivateRoute;
