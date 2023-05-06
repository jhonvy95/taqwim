import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks/useAuthStore";

const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();
  enum AuthStatus {
    AUTHENTICATED = "authenticated",
    NOT_AUTHENTICATED = "not-authenticated",
    CHECKING = "checking",
  }

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {status === AuthStatus.NOT_AUTHENTICATED ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
export default AppRouter;
