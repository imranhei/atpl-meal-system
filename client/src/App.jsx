import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import CheckAuth from "./components/common/check-auth";
import UserLayout from "./components/user-view/layout";
import Home from "./pages/user-view/home";
import TodayMeals from "./pages/user-view/day-wise-meal";
import Meal from "./pages/user-view/meal";
import EmployeeLeave from "./pages/user-view/leave";
import EmployeeSetting from "./pages/user-view/setting";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { LoaderCircle } from "lucide-react";
import Attendance from "./pages/user-view/attendance";

function App() {
  const { isAuthenticated, user, isLoadingAuth } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token"); //if i don't have any subdomain pass this token
    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        dispatch(checkAuth(parsedToken));
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
  }, [dispatch]);

  if (isLoadingAuth) {
    return (
      // <div className="flex items-center justify-center min-w-screen min-h-screen">
      //   <div className="flex flex-col space-y-3">
      //     <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      //     <div className="space-y-2">
      //       <Skeleton className="h-4 w-[250px]" />
      //       <Skeleton className="h-4 w-[200px]" />
      //     </div>
      //   </div>
      // </div>
      <div className="flex items-center justify-center min-w-screen min-h-screen">
        <LoaderCircle size={48} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gradient-to-tl overflow-x-hidden from-amber-100 to-cyan-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/employee"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <UserLayout />
            </CheckAuth>
          }
        >
          <Route path="attendance" element={<Attendance />} />
          <Route path="meal" element={<Meal />} />
          <Route path="leave" element={<EmployeeLeave />} />
          <Route path="setting" element={<EmployeeSetting />} />
          <Route path="day-wise-meal" element={<TodayMeals />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
