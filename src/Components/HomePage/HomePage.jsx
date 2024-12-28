import React from "react";
import AdminPage from "../AdminPages/AdminPage";
import UserPage from "../UserPages/UserPage";
import AuthorPage from "../AuthorPages/AuthorPage";
import { useAuth } from "../../Contexts/AuthContext";

const HomePage = () => {
  const userId = localStorage.getItem("id");
  const { userDetails } = useAuth();
  const role = userDetails.role;
  if (role === "admin") {
    return <AdminPage />;
  }
  if (role === "author") {
    return <AuthorPage />;
  } else {
    return <UserPage />;
  }
};

export default HomePage;
