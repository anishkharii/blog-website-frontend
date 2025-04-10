import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Loading from "../Loading";
import { useNotification } from "../../Contexts/NotificationContext";
import { useLogin, useGetUser } from "../../Hooks/useUserActions";
import { useSelector } from "react-redux";
import Logo from "../Navbar/Logo";
import { ArrowLeft, StepBack } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isPending: isLoading } = useLogin();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center justify-center bg-gradient-to-r from-primary via-light_accent to-primary text-center text-secondary">
      {isLoading && <Loading />}

      <div className="relative z-50 rounded-lg border border-border bg-primary p-5 shadow-2xl shadow-shadow md:p-10">
        <div className="mb-5 flex items-center justify-start gap-5">
          <div
            className="flex cursor-pointer text-muted transition-all hover:text-secondary"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
            Back
          </div>
          <Logo size="large" />
          <p></p>
        </div>
        <div className="text-left">
          <h2 className="pb-2 text-2xl text-accent">Login</h2>
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
              className="underline underline-offset-2 transition-all hover:text-accent"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
      <p className="z-50 px-8 pt-5 text-sm">
        By clicking continue, you agree to our{" "}
        <a
          href="#/"
          className="underline underline-offset-2 transition-all hover:text-accent"
        >
          Terms and Conditions
        </a>{" "}
        and{" "}
        <a
          href="#/"
          className="underline underline-offset-2 transition-all hover:text-accent"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default LoginPage;
