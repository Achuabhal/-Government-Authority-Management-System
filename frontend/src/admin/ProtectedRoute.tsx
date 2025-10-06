import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = localStorage.getItem('bvp.admin.loggedIn') === 'true';
  const adminEmail = localStorage.getItem('bvp.admin.email');

  if (!isLoggedIn || !adminEmail) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
