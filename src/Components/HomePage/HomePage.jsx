import React from "react";
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";

const HomePage = ({ setIsAuthenticated, userDetails, isAdmin }) => {
  const userId = localStorage.getItem("id");

  return (
    <>
      {isAdmin ? (
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
};

export default HomePage;
