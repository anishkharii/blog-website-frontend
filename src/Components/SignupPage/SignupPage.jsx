import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Logo from "../Navbar/Logo";
import Loading from "../Loading";
import { ArrowLeft } from "lucide-react";
import { useNotification } from "../../Contexts/NotificationContext";
import { useSignup } from "../../Hooks/useUserActions"
import { useDispatch, useSelector } from "react-redux";
import { setOtpRequired } from "../../Redux/authSlice";

const roleTabs = ["user", "author"];

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { otpRequired } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    title: "Mr",
    email: "",
    password: "",
    role: "user",
  });

  const { mutate: signup, isPending: isLoading } = useSignup();

 
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    signup(formData); 
  }

  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center justify-center bg-gradient-to-r from-primary via-light_accent to-primary text-center text-secondary">
      {isLoading && <Loading />}

      <div className="relative z-50 rounded-lg border border-border bg-primary p-5 shadow-2xl shadow-shadow md:p-10">
        <div className="mb-5 flex flex-col md:flex-row items-start md:items-center md:gap-32 justify-start ">
          <div
            className="flex cursor-pointer text-muted transition-all hover:text-secondary"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
            Back
          </div>
          <Logo size="large" />
        </div>

        <div className="text-left">
          <h2 className="pb-2 text-2xl text-accent">Sign Up</h2>
          <p className="text-sm text-muted">Create your new account</p>
        </div>

        <form className="flex flex-col gap-5 pt-10" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 md:flex-row">
            <div>
              <label className="block text-sm text-muted mb-1">Title</label>
              <select
                name="title"
                onChange={handleChange}
                className="rounded-lg border border-border bg-background p-2"
              >
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
              </select>
            </div>

            <Input
              type="text"
              label="First Name"
              name="fname"
              placeholder="John"
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              label="Last Name"
              name="lname"
              placeholder="Doe"
              onChange={handleChange}
              required
            />
          </div>

          <Input
            type="email"
            label="Email"
            name="email"
            placeholder="m@example.com"
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            label="Password"
            name="password"
            onChange={handleChange}
            required
          />

          {/* Role Tabs */}
          <div className="flex gap-3">
            {roleTabs.map((role) => (
              <button
                key={role}
                type="button"
                className={`px-4 py-2 rounded-full text-sm border ${
                  formData.role === role
                    ? "bg-accent text-white border-accent"
                    : "bg-background text-muted border-border"
                }`}
                onClick={() => setFormData((prev) => ({ ...prev, role }))}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>

          <Button type="submit">Continue</Button>
        </form>

        <p className="pt-5 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="underline underline-offset-2 transition-all hover:text-accent"
          >
            Sign In
          </a>
        </p>
      </div>

      <p className="z-50 px-8 pt-5 text-sm">
        By clicking continue, you agree to our{" "}
        <a className="underline hover:text-accent" href="#">
          Terms and Conditions
        </a>{" "}
        and{" "}
        <a className="underline hover:text-accent" href="#">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default SignupPage;
