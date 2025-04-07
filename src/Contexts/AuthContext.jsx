import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    fname: "",
    lname: "",
    image: "",
    email: "",
    role: "",
  }); 
  const [authOtp, setAuthOtp] = useState(false);
  const [authForgot, setAuthForgot] = useState(false);
  const [loading, setLoading] = useState(true); 

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  useEffect(() => {
    const checkAuthentication = async () => {
      console.log("Checking authentication...");
      if (!id || !token) {
        setIsAuthenticated(false);
        setLoading(false); 
        setUserDetails({
          name: "",
          fname: "",
          lname: "",
          image: "",
          email: "",
          role: "",
        })
        return;
      }
      try {
        
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/users/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (!data.status) {
          setIsAuthenticated(false);
          setLoading(false); 
          return;
        }
        setUserDetails({
          name: data.user.fname + " " + data.user.lname,
          fname: data.user.fname,
          lname: data.user.lname,
          email: data.user.email,
          role: data.user.role,
          image: data.user.image,
        });

        setIsAuthenticated(true);
      } catch (err) {
        console.error("Authentication check failed:", err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); 
      }
    };

    checkAuthentication();
  }, [isAuthenticated, setIsAuthenticated, setUserDetails, id, token]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userDetails,
        setUserDetails,
        authOtp,
        setAuthOtp,
        authForgot,
        setAuthForgot,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
