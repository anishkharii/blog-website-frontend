import React, { useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../../Contexts/NotificationContext";

const ForgotPassPassPage = () => {
  const navigate = useNavigate();
  const {TriggerNotification} = useNotification();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const id = useParams().id;

  const handleError = (message) => {
    TriggerNotification({
      type: "error",
      message,
      duration: 3500,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password1 || !password2) {
      handleError("Please fill all the fields.");
      return;
    }
    if (password1 !== password2) {
      handleError("Passwords do not match.");
      return;
    }
    if (password1.length < 8) {
      handleError("Password must be at least 8 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password1)) {
      handleError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password1)) {
      handleError("Password must contain at least one lowercase letter.");
      return;
    }
    if (!/\d/.test(password1)) {
      handleError("Password must contain at least one number.");
      return;
    }
    if (!/[@$!%*?&]/.test(password1)) {
      handleError("Password must contain at least one special character.");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/forgot-password/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password:password1 }),
        }
      );

      const data = await res.json();
      if (data.status) {
        TriggerNotification({
          type: "success",
          message: data.msg,
          duration: 3500,
        });
        navigate(`/login`);
      }
    } catch (err) {
      handleError("Something went wrong. Please try again.");
      console.log(err);
    }
  };
  return (
    <div className="text-white text-center  flex flex-col items-center justify-center h-[80vh] max-w-md mx-auto">
      <div className=" border border-white/20 bg-[#060607] rounded-lg p-10 flex flex-col z-50 ">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="text-lg mb-5">Make strong Password</p>
        <Input
          type="password"
          placeholder="Password"
          name="password1"
          label="Password"
          eyeRequired={false}
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          name="password2"
          label="Password Again"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        {}
        <Button onClick={handleSubmit}>Verify</Button>
      </div>
    </div>
  );
};

export default ForgotPassPassPage;
