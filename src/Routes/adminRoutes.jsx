import { Route } from "react-router-dom";
import AdminPage from "../Components/HomePage/AdminPage";
import { PrivateAdminRoute } from "./privateRoutes";

const adminRoutes = (
  <Route path="/dashboard" element={<PrivateAdminRoute />}>
    <Route path="/dashboard" element={<AdminPage />} />
  </Route>
);

export default adminRoutes;
