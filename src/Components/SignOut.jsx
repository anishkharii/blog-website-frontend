import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignOut = ({ setIsLoggedIn, onTriggerNotification }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user token and related data from localStorage
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");

    // Update logged-in state
    setIsLoggedIn(false);

    // Trigger a notification
    onTriggerNotification({
      type: "info",
      message: "You have successfully logged out.",
      duration: 3000,
    });

    // Redirect to the home page
    navigate("/");
  }, [setIsLoggedIn, onTriggerNotification, navigate]);

  return null; // No UI required for this component
};

export default SignOut;
