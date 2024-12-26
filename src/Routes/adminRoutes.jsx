import { Route } from "react-router-dom";
import { PrivateAdminRoute } from "./privateRoutes";
import AdminPage from "../Components/AdminPages/AdminPage";

const adminRoutes = (
  <Route path="/dashboard" element={<PrivateAdminRoute />}>
    <Route path="/dashboard" element={<AdminPage />} />
  </Route>
);

export default adminRoutes;
