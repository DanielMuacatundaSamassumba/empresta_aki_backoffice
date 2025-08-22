
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }:any) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export  {PublicRoute}
