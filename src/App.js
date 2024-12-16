import LoginPage from "./Components/LoginPage/LoginPage";
import Navbar from "./Components/Navbar/Navbar";
import OtpVerificationPage from "./Components/SignupPage/OtpVerificationPage";
import SignupPage from "./Components/SignupPage/SignupPage";
import HomePage from "./Components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogsPage from "./Components/MainPages/BlogsPage";
import ContactPage from "./Components/MainPages/ContactPage";
import AboutUsPage from "./Components/MainPages/AboutUsPage";
import PrivacyPolicy from "./Components/MainPages/PrivacyPolicy";
import TermsAndConditions from "./Components/MainPages/TermsAndConditions";
import { useState } from "react";
import useNotification from "./Hooks/use-notification";
import SignOut from "./Components/SignOut";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {NotificationComponent, TriggerNotification} = useNotification();
  
  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} onTriggerNotification={TriggerNotification} setIsLoggedIn={setIsLoggedIn} />
      {NotificationComponent}
      <Routes>
        <Route path="/logIn" element={<LoginPage onTriggerNotification={TriggerNotification} />} />
        <Route path="/signUp" element={<SignupPage onTriggerNotification={TriggerNotification}/>} />
        <Route path="/otp-verification/:id" element={<OtpVerificationPage onTriggerNotification={TriggerNotification} />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/sign-out" element={<SignOut setIsLoggedIn={setIsLoggedIn} onTriggerNotification={TriggerNotification} />} />
        <Route
          path="/"
          element={
            <HomePage setIsLoggedIn={setIsLoggedIn} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
