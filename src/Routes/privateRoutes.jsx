import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { HomePage } from "../Components/AllComponents";
import { useSelector } from "react-redux";

export const PrivateOtpRoute = () => {
  const {otpRequired} = useSelector(state=>state.auth)
  return otpRequired ? <Outlet /> : <Navigate to="/signUp" />;
};

export const PrivateForgotRoute = () => {
  const { authForgot } = useAuth();
  return authForgot ? <Outlet /> : <Navigate to="/logIn" />;
};

export const PrivateAdminRoute = () => {
  const user = useSelector(state=> state.auth.user)
  return user.role === "admin" ? <Outlet /> : <HomePage/>;
};

export const PrivateLoggedInRoute = () => {
  const {isAuthenticated} = useSelector(state=>state.auth)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}