import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import {
  LoginPage,
  SignupPage,
  OtpVerificationPage,
  ForgotPassMailPage,
  ForgotPassPassPage,
  HomePage,
  ContactPage,
  AboutUsPage,
  PrivacyPolicy,
  TermsAndConditions,
  SignOut,
  NotFound,
  BlogsPage,
} from '../Components/AllComponents';

import AddBlog from "../Components/BlogPages/AddBlog";
import UpdateBlog from "../Components/BlogPages/UpdateBlog";
import Profile from "../Components/Navbar/Profile";
import AdminPage from "../Components/AdminPages/AdminPage";
import ManageBlogs from "../Components/AdminPages/ManageBlogs";
import ManageUsers from "../Components/AdminPages/ManageUsers";
import MyBlogs from "../Components/AuthorPages/MyBlogs";

import {
  PrivateOtpRoute,
  PrivateForgotRoute,
  PrivateLoggedInRoute,
  PrivateAdminRoute
} from "./privateRoutes";
import { AuthLayout, MainLayout } from "./routesLayout";
import { useAutoLogin } from "../Hooks/useUserActions";
import BlogPage from "../Components/BlogPages/BlogPage";
import Loading from "../Components/Loading";
import { useSelector } from "react-redux";

const AppRouter = () => {
  const user = useSelector(state=>state.auth)
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const {mutate:login, isLoading}=useAutoLogin();

  useEffect(() => {
    if (id && token) {
      
      login({ id, token });
    }
  }, [id, token, login]);

  if(isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      {isLoading && <Loading/>}
      <Routes>
        {/* Auth Layout (No Navbar) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignupPage />} />

          <Route path="/otp-verification" element={<PrivateOtpRoute />}>
            <Route path="/otp-verification" element={<OtpVerificationPage />} />
          </Route>

          <Route path="/forgot-password" element={<ForgotPassMailPage />} />
          <Route path="/forgot-password/:id" element={<PrivateForgotRoute />}>
            <Route path="/forgot-password/:id" element={<ForgotPassPassPage />} />
          </Route>
        </Route>

        {/* Main Layout (With Navbar) */}
        <Route element={<MainLayout />}>
          {/* General Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/sign-out" element={<SignOut />} />
          <Route path="*" element={<NotFound />} />

          {/* Profile (Private) */}
          <Route path="/profile" element={<PrivateLoggedInRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Blogs */}
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/update-blog/:id" element={<UpdateBlog />} />

          {/* Author Routes */}
          <Route path="/my-blogs" element={<MyBlogs />} />

          {/* Admin Routes */}
          <Route path="/" element={<PrivateAdminRoute />}>
            <Route path="/dashboard" element={<AdminPage />} />
            <Route path="/manage-blogs" element={<ManageBlogs />} />
            <Route path="/manage-users" element={<ManageUsers />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
