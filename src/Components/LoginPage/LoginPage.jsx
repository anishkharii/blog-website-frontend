import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Background from "./Background";
import Loading from "../Loading";
import { useAuth } from "../../Contexts/AuthContext";
import { useNotification } from "../../Contexts/NotificationContext";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../services/userServices";
import { useLogin, useGetUser } from "../../Hooks/useUserActions";

const LoginPage = () => {
  const navigate = useNavigate();
  const {TriggerNotification} = useNotification();3
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {mutate:login} = useLogin();
  const {mutate:userData} = useGetUser();

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   try {
  //     setIsLoading(true);
  //     const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await res.json();
  //     if (!data.status) {
  //       if (data.type === "otp") {
  //         TriggerNotification({
  //           type: "info",
  //           message: data.msg,
  //           duration: 3500,
  //         });
  //         setAuthOtp(true);
  //         navigate(`/otp-verification/${data.id}/signup`);
  //         return;
  //       }
  //       TriggerNotification({
  //         type: "error",
  //         message: data.msg,
  //         duration: 3500,
  //       });
  //       return;
  //     }

  //     const {token, id} = data;
  //     localStorage.setItem("token", token);
  //     localStorage.setItem("id", id);
  //     TriggerNotification({
  //       type: "success",
  //       message: data.msg,
  //       duration: 3500,
  //     })
  //     setIsAuthenticated(true);
  //     navigate("/");
  //   } catch (err) {
  //     TriggerNotification({
  //       type: "error",
  //       message: "Something went wrong. Please try later.",
  //       duration: 3500,
  //     });
  //     console.log(err);
  //   }
  //   finally {
  //     setIsLoading(false);
  //   }
  // }
  const dispatch = useDispatch();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    login({email, password});
    userData({id:localStorage.getItem("id"), token:localStorage.getItem("token")});
    
  }

  return (
    <div className=" text-secondary mt-16 text-center flex flex-col items-center justify-center h-[80vh] max-w-md mx-auto overflow-x-hidden">
      {isLoading && <Loading/>}
      <div className="border border-white/20 bg-primary rounded-lg p-5 md:p-10 z-50 shadow-2xl shadow-shadow">
        <div className="text-left">
          <h2 className="text-2xl text-accent font-bold pb-2">Login</h2>
          <p className="text-sm text-muted">
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
              className="underline underline-offset-2 hover:text-accent transition-all"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
      <p className="text-sm pt-5 px-8 z-50">
        By clicking continue, you agree to our{" "}
        <a
          href="#/"
          className="underline underline-offset-2 hover:text-accent transition-all"
        >
          Terms and Conditions
        </a>{" "}
        and{" "}
        <a
          href="#/"
          className="underline underline-offset-2 hover:text-accent transition-all"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default LoginPage;
