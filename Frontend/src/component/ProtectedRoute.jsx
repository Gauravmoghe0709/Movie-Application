import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, fetchCurrentUser } = useContext(AuthContext);
  const [checking, setChecking] = useState(true);
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      if (!user) {
        const u = await fetchCurrentUser();
        if (mounted) setCurrentUser(u);
      } else {
        setCurrentUser(user);
      }
      if (mounted) setChecking(false);
    };
    check();
    return () => { mounted = false };
  }, [user, fetchCurrentUser]);

  if (checking) return <div className="min-h-screen flex items-center justify-center">Checking authentication...</div>;

  if (!currentUser) return <Navigate to="/login" />;

  if (role && currentUser.role !== role) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
