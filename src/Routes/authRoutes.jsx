import { Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  OtpVerificationPage,
  ForgotPassMailPage,
  ForgotPassPassPage,
} from "../Components/AllComponents";
import { PrivateOtpRoute, PrivateForgotRoute } from "./privateRoutes";

const authRoutes = (
  <>
    <Route
      path="/logIn"
      element={<LoginPage />}
    />
    <Route
      path="/signUp"
      element={<SignupPage />}
    />
    <Route path="/otp-verification" element={<PrivateOtpRoute />}>
      <Route
        path="/otp-verification/:id/:type"
        element={<OtpVerificationPage />}
      />
    </Route>
    <Route
      path="/forgot-password"
      element={<ForgotPassMailPage />}
    />
    <Route path="/forgot-password/:id" element={<PrivateForgotRoute />}>
      <Route path="/forgot-password/:id" element={<ForgotPassPassPage />} />
    </Route>
  </>
);

export default authRoutes;
