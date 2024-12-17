import React, { useState } from "react";
import OtpComponent from "./OtpComponent";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Background from "../LoginPage/Background";

const OtpVerificationPage = ({ onTriggerNotification }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const id = useParams().id;
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/verify-user/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });
      const data = await res.json();
      console.log(data)
      if (!data.status) {
        onTriggerNotification({
          type: "error",
          message: data.msg,
          duration: 2500,
        });
        return;
      }
      onTriggerNotification({
        type: "success",
        message: data.msg,
        duration: 5000,
      });
      navigate(`/login`);
    } catch (err) {
      onTriggerNotification({
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
      <div className=" border border-white/20 bg-[#09090b] rounded-lg p-10 flex flex-col ">
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
