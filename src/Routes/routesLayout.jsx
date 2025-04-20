import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/AllComponents";

export const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <Outlet />
      </div>
    </div>
  );
};

export const AuthLayout = () => {
  return <Outlet />;
};
