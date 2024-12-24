import React from "react";
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";
import AuthorPage from "./AuthorPage";
import { useAuth } from "../../Hooks/useAuth";

const HomePage = () => {
  const userId = localStorage.getItem("id");
  const {userDetails} = useAuth();
  const role = userDetails.role;
  if (role === "admin") {
    return <AdminPage />;
  }
  if (role === "author") {
    return <AuthorPage />;
  } else {
    return (
      <>
        {role === "admin" ? (
          <AdminPage />
        ) : (
          <UserPage
          />
        )}
      </>
    );
  }
};

export default HomePage;
