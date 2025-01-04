import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { HomePage } from "../Components/AllComponents";

export const PrivateOtpRoute = () => {
  const { authOtp } = useAuth();
  return authOtp ? <Outlet /> : <Navigate to="/signUp" />;
};

export const PrivateForgotRoute = () => {
  const { authForgot } = useAuth();
  return authForgot ? <Outlet /> : <Navigate to="/logIn" />;
};

export const PrivateAdminRoute = () => {
  const { userDetails } = useAuth();
  return userDetails.role === "admin" ? <Outlet /> : <HomePage/>;
};

export const PrivateLoggedInRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/logIn" />;
}