import { Route } from "react-router-dom";
import {
  HomePage,
  ContactPage,
  AboutUsPage,
  PrivacyPolicy,
  TermsAndConditions,
  SignOut,
  NotFound,
} from "../Components/AllComponents";
import Profile from "../Components/Navbar/Profile";
import { PrivateLoggedInRoute } from "./privateRoutes";

const generalRoutes = (
  <>
    <Route path="/" element={<HomePage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/about" element={<AboutUsPage />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
    <Route path="/sign-out" element={<SignOut />} />
    <Route path="*" element={<NotFound />} />
    <Route path="/profile" element={<PrivateLoggedInRoute />} >

    <Route path="/profile" element={<Profile />} />

    </Route>
  </>
);

export default generalRoutes;
