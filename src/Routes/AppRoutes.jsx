import { BrowserRouter, Routes } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import authRoutes from "./authRoutes";
import generalRoutes from "./generalRoutes";
import adminRoutes from "./adminRoutes";
import blogRoutes from "./blogRoutes";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {authRoutes}
        {blogRoutes}
        {generalRoutes}
        {adminRoutes}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;