import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/AllComponents";

export const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export const AuthLayout = () => {
  return <Outlet />;
};
