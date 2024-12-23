import React from "react";
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";
import AuthorPage from "./AuthorPage";

const HomePage = ({ setIsAuthenticated, userDetails, role }) => {
  const userId = localStorage.getItem("id");

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
            setIsAuthenticated={setIsAuthenticated}
            userId={userId}
            userDetails={userDetails}
          />
        )}
      </>
    );
  }
};

export default HomePage;
