import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const { pathname } = location;
  // const publicRoutes = ["/login", "/register"];

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin" || user?.role === "super-admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/employee/dashboard" />;
      }
    }
  }

  const authRoutes = ["admin", "employee"];
  // check pathname includes any value of auth routes
  const isAuthRoute = authRoutes.some((route) => pathname.includes(route));
  if (!isAuthenticated && isAuthRoute) {

    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (pathname.includes("auth/login") || pathname.includes("auth/register"))
  ) {
    if (user?.role === "admin" || user?.role === "super-admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/employee/dashboard" />;
    }
  }

  // if (
  //   isAuthenticated &&
  //   (location.pathname.includes("auth/login") ||
  //     location.pathname.includes("auth/register"))
  // ) {
  //   if (user?.role === "admin" || user?.role === "super-admin") {
  //     return <Navigate to="/dashboard" />;
  //   } else {
  //     return <Navigate to="/" />;
  //   }
  // }

  if (
    isAuthenticated &&
    (user?.role === "admin" || user?.role === "super-admin") &&
    location.pathname === "/"
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
