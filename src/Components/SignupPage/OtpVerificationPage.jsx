import React, { useState } from "react";
import OtpComponent from "./OtpComponent";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Background from "../LoginPage/Background";

const OtpVerificationPage = ({  onAuthForgot}) => {
  const navigate = useNavigate();
  const {TriggerNotification} = useAuth();
  const [otp, setOtp] = useState("");

  const id = useParams().id;
  const type = useParams().type;
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/verify-user/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, type }),
      });
      const data = await res.json();
      console.log(data)
      if (!data.status) {
        TriggerNotification({
          type: "error",
          message: data.msg,
          duration: 2500,
        });
        return;
      }
     
      TriggerNotification({
        type: "success",
        message: data.msg,
        duration: 5000,
      });
      if(type==='forgot'){
        onAuthForgot(true);
        navigate(`/forgot-password/${id}`);
      }
      else{
        navigate('/login');
      }
    } catch (err) {
      TriggerNotification({
        type: "error",
        message: "Something went wrong. Please try again.",
        duration: 5000,
      });
      console.log(err);
    }
  }
  return (
    <div className="text-white text-center  flex flex-col items-center justify-center h-[80vh] max-w-md mx-auto">
      <Background top={-100} left={-100} />
      <div className=" border border-white/20 bg-[#060607] rounded-lg p-10 flex flex-col z-50 ">
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
