import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children})=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    useEffect(() => {
        const checkAuthentication = async () => {
          const id = localStorage.getItem("id");
          const token = localStorage.getItem("token");
          if (!id || !token) {
            setIsAuthenticated(false);
            return;
          }
          try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${id}`,{
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }
            }); 
            const data = await res.json();
            console.log(data);
            if(!data.status){
              setIsAuthenticated(false);
              return;
            }
            setUserDetails({
              name:data.user.fname+" "+data.user.lname,
              email:data.user.email,
              role:data.user.role
            })
            setIsAuthenticated(true);
          } catch (err) {
            console.error("Authentication check failed:", err);
            setIsAuthenticated(false);
          }
        };
    
        checkAuthentication();
      }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, userDetails, setUserDetails}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = ()=> useContext(AuthContext);