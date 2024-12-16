import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Background from "./Background";

const LoginPage = ({ onTriggerNotification }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!data.status) {
        if (data.type === "otp") {
          onTriggerNotification({
            type: "info",
            message: data.msg,
            duration: 3500,
          });
          navigate(`/otp-verification/${data.id}`);
          return;
        }
        onTriggerNotification({
          type: "error",
          message: data.msg,
          duration: 3500,
        });
        return;
      }
      const userToken = data.token;
      const userId = data.id;
      localStorage.setItem("userToken", userToken);
      localStorage.setItem("userId", userId);
      onTriggerNotification({
        type: "success",
        message: data.msg,
        duration: 3500,
      })
      navigate("/");
    } catch (err) {
      onTriggerNotification({
        type: "error",
        message: "Something went wrong. Please try later.",
        duration: 3500,
      });
      console.log(err);
    }
  }

  return (
    <div className="text-white text-center  flex flex-col items-center justify-center h-[80vh] max-w-md mx-auto">
      <Background top={-200} left={-200} />
      <div className=" border border-white/20 bg-[#09090b] rounded-lg p-5">
        <div className=" text-left">
          <h2 className="text-2xl font-bold pb-2">Login</h2>
          <p className="text-sm text-white/60">
            Enter your email below to login to your account
          </p>
        </div>
        <form className="flex flex-col gap-5 pt-10">
          <Input
            type="email"
            label="Email"
            name="email"
            value={email}
            placeholder="m@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            label="Password"
            forgotRequired={true}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" onClick={handleSubmit}>
            Login
          </Button>
          <p className="text-sm">
            Don't have an account?{" "}
            <a
              href="/signup"
              className=" underline underline-offset-2 hover:text-white/50  transition-all"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
      <p className="text-sm pt-5 px-8">
        By clicking continue, you agree to our{" "}
        <a
          href="#/"
          className=" underline underline-offset-2 hover:text-white/50  transition-all"
        >
          Terms and Conditions
        </a>{" "}
        and{" "}
        <a
          href="#/"
          className=" underline underline-offset-2 hover:text-white/50  transition-all"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default LoginPage;
