import React, { useState } from "react";
import OtpComponent from "./OtpComponent";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import { useVerifyUser } from "../../Hooks/useUserActions";

const OtpVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const {mutate:verifyOtp} = useVerifyUser();

  async function handleSubmit(e) {
    e.preventDefault();
    verifyOtp({otp, type:location.state.from, id:location.state.id});
  }
  return (
    <div className="text-secondary text-center shadow-2xl shadow-shadow  flex flex-col items-center justify-center h-[80vh] max-w-md mx-auto">

      <div className=" border border-white/20 bg-primary rounded-lg p-10 flex flex-col z-50 ">
        <h1 className="text-3xl font-bold">OTP Verification</h1>
        <p className=" mb-5">
          OTP has been sent to your email. Please verify it.
        </p>

        <OtpComponent length={4} onOtp={setOtp} />
        <Button onClick={handleSubmit}>Verify</Button>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
