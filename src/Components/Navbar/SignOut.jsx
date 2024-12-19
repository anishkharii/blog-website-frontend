import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignOut = ({ setIsAuthenticated, onTriggerNotification }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user token and related data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    // Update logged-in state
    setIsAuthenticated(false);

    // Trigger a notification
    onTriggerNotification({
      type: "info",
      message: "You have successfully logged out.",
      duration: 3000,
    });

    // Redirect to the home page
    navigate("/");
  }, [setIsAuthenticated, onTriggerNotification, navigate]);

  return null; // No UI required for this component
};

export default SignOut;
