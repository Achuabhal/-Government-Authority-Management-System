// src/components/ProtectedRoute.tsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "../lib/api"; // your axios instance

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/check"); // send JWT via cookie or header
        setIsAuthenticated(response.data.authenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>; // spinner/loading

  return isAuthenticated ? (
    children // render AdminLayout
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
