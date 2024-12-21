import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Outlet,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  Navbar,
  OtpVerificationPage,
  BlogsPage,
  ContactPage,
  AboutUsPage,
  PrivacyPolicy,
  TermsAndConditions,
  SignOut,
  HomePage,
} from "./Components/AllComponents";
import  useNotification  from './Hooks/use-notification';
import NotFound from "./Components/NotFound";
import ForgotPassMailPage from "./Components/ForgotPasswordPage/ForgotPassMailPage";
import ForgotPassPassPage from "./Components/ForgotPasswordPage/ForgotPassPassPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [isLoading, setIsLoading] = useState(true); 
  const [isAdmin, setIsAdmin] = useState(false);
  const { NotificationComponent, TriggerNotification } = useNotification();
  const [authOtp, setAuthOtp] = useState(false);
  const [authForgot, setAuthForgot] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });

  useEffect(() => {
    const checkAuthentication = async () => {
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      if (!id || !token) {
        setIsAuthenticated(false);
        setIsLoading(false); 
        return;
      }
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }); 
        const data = await res.json();
        if(!data.status){
          setIsAuthenticated(false);
          setIsLoading(false); 
          return;
        }
        setUserDetails({
          name:data.user.fname+" "+data.user.lname,
          email:data.user.email
        })
        setIsAuthenticated(true);
        setIsAdmin(data.user.role === "admin");
      } catch (err) {
        console.error("Authentication check failed:", err);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false); 
      }
    };

    checkAuthentication();
  }, [isAuthenticated]);

  const PrivateOtpRoute = ({ authOtp, ...props }) => {
    return authOtp ? <Outlet /> : <Navigate to="/signUp" />;
  };
  const PrivateUserRoute = ({ isAuthenticated, ...props }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/logIn" />;
  };

  const PrivateForgotRoute = ({authForgot, ...props})=>{
    return authForgot? <Outlet/> :<Navigate to='/logIn'/>
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>; 
  }

  return (
    <BrowserRouter>
      <Navbar
        userDetails={userDetails}
        isAuthenticated={isAuthenticated}
        onTriggerNotification={TriggerNotification}
      />
      {NotificationComponent}
      <Routes>
        <Route
          path="/logIn"
          element={
            <LoginPage
              onTriggerNotification={TriggerNotification}
              onAuthForgot={setAuthForgot}
              onAuthOtp={setAuthOtp}
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          path="/signUp"
          element={
            <SignupPage
              onTriggerNotification={TriggerNotification}
              isAuthenticated={isAuthenticated}
              onAuthOtp={setAuthOtp}
            />
          }
        />
        <Route
          path="/otp-verification"
          element={<PrivateOtpRoute authOtp={authOtp} />}
        >
          <Route
            path="/otp-verification/:id/:type"
            element={
              <OtpVerificationPage
                onAuthForgot={setAuthForgot}
                onTriggerNotification={TriggerNotification}
              />
            }
          />
        </Route>
        <Route
            path="/forgot-password"
            element={
              <ForgotPassMailPage
                onAuthOtp={setAuthOtp}
                onTriggerNotification={TriggerNotification}
              />
            }
          />
        <Route
          path="/forgot-password/:id"
          element={<PrivateForgotRoute authForgot={authForgot}  />}
        >
        <Route
          path="/forgot-password/:id"
          element={<ForgotPassPassPage onTriggerNotification={TriggerNotification}/>}
          />
        </Route>
        <Route
          path="/"
          element={<PrivateUserRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route
            path="/sign-out"
            element={
              <SignOut
                setIsAuthenticated={setIsAuthenticated}
                onTriggerNotification={TriggerNotification}
              />
            }
          />
          <Route
            path="/"
            element={
              <HomePage
                setIsAuthenticated={setIsAuthenticated}
                userDetails={userDetails}
                isAdmin={isAdmin}
              />
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
