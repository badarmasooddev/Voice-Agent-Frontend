import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const authUser = JSON.parse(localStorage.getItem("auth-user"));
  const hasConfigsSaved = JSON.parse(localStorage.getItem("configs-saved")) || false;

  if (!authUser) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!hasConfigsSaved) {
    return <Navigate to="/on-boarding" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
