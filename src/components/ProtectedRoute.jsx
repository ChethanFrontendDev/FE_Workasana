import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

export default function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await api.get("/auth/me"); // backend verifies token
        setIsValid(true);
      } catch (err) {
        setIsValid(false);
      }
    };

    verifyUser();
  }, []);

  if (isValid === null) return <div>Checking authentication...</div>;

  return isValid ? children : <Navigate to="/" replace />;
}

// import { Navigate, Outlet } from "react-router-dom";
// import useFetch from "../hooks/useFetch";

// export default function ProtectedRoute() {
//   const { data, error, loading } = useFetch("/auth/me");

//   if (loading) return <div>Checking auth...</div>;
//   if (error) return <Navigate to="/login" replace />;

//   return <Outlet />;
// }
