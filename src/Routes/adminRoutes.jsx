import { Route } from "react-router-dom";
import { PrivateAdminRoute } from "./privateRoutes";
import AdminPage from "../Components/AdminPages/AdminPage";
import ManageBlogs from "../Components/AdminPages/ManageBlogs";
import ManageUsers from "../Components/AdminPages/ManageUsers";

const adminRoutes = (
  <Route path="/" element={<PrivateAdminRoute />}>
    <Route path="/dashboard" element={<AdminPage />} />
    <Route path='/manage-blogs' element={<ManageBlogs/>}/>
    <Route path='/manage-users' element={<ManageUsers/>}/>
  </Route>
);

export default adminRoutes;
