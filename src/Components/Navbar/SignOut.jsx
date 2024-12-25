import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { useNotification } from "../../Contexts/NotificationContext";

const SignOut = () => {
  const navigate = useNavigate();
  const {setIsAuthenticated} = useAuth();
  const {TriggerNotification} = useNotification();

  useEffect(() => {
    // Clear user token and related data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    // Update logged-in state
    setIsAuthenticated(false);

    // Trigger a notification
    TriggerNotification({
      type: "info",
      message: "You have successfully logged out.",
      duration: 3000,
    });

    // Redirect to the home page
    navigate("/");
  }, [setIsAuthenticated, TriggerNotification, navigate]);

  return null; // No UI required for this component
};

export default SignOut;
