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
import NotFound from "./Components/NotFound";
import ForgotPassMailPage from "./Components/ForgotPasswordPage/ForgotPassMailPage";
import ForgotPassPassPage from "./Components/ForgotPasswordPage/ForgotPassPassPage";
import { AuthProvider, useAuth } from "./Hooks/useAuth";
import { useNotification } from "./Hooks/useNotification";
import Button from "./Components/UI/Button";

function AppContent() {
  const [authOtp, setAuthOtp] = useState(false);
  const [authForgot, setAuthForgot] = useState(false);
  const { isAuthenticated } = useAuth();
  const { TriggerNotification } = useNotification();
  
  const PrivateOtpRoute = () => {
    return authOtp ? <Outlet /> : <Navigate to="/signUp" />;
  };
  const PrivateUserRoute = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/logIn" />;
  };
  const PrivateForgotRoute = () => {
    return authForgot ? <Outlet /> : <Navigate to="/logIn" />;
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/logIn"
          element={
            <LoginPage onAuthForgot={setAuthForgot} onAuthOtp={setAuthOtp} />
          }
        />
        <Route path="/signUp" element={<SignupPage onAuthOtp={setAuthOtp} />} />
        <Route path="/otp-verification" element={<PrivateOtpRoute />}>
          <Route
            path="/otp-verification/:id/:type"
            element={<OtpVerificationPage onAuthForgot={setAuthForgot} />}
          />
        </Route>
        <Route
          path="/forgot-password"
          element={<ForgotPassMailPage onAuthOtp={setAuthOtp} />}
        />
        <Route path="/forgot-password/:id" element={<PrivateForgotRoute />}>
          <Route path="/forgot-password/:id" element={<ForgotPassPassPage />} />
        </Route>
        <Route path="/" element={<PrivateUserRoute />}>
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/sign-out" element={<SignOut />} />
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  useEffect(() => {
    async function startServer() {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/wakeUp`);
      const data = await res.json();
      console.log(data.msg)
    }
    startServer();
  }, []);
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
