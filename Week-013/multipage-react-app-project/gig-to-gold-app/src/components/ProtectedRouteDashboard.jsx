import { Navigate, useLocation } from "react-router";

export default function ProtectedRouteDashboard({ isLoggedIn, children }) {
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
