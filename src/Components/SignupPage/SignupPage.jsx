import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Background from "../LoginPage/Background";
import Loading from "../Loading";
import { useAuth } from "../../Hooks/useAuth";
const SignupPage = ({ onAuthOtp, isAuthenticated}) => {
  const navigate = useNavigate();
  const {TriggerNotification} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    title: "Mr",
    email: "",
    password: "",
    role: "user",
  });
  isAuthenticated && navigate('/');

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try{
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/add-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      console.log(data);
      TriggerNotification({
        type: data.status ? "success" : "error",
        message: data.msg,
        duration: 5000,
      });
      if (data.status === true) {
        onAuthOtp(true);
        navigate(`/otp-verification/${data.data.id}/signup`);
      }
    }catch(err){
      TriggerNotification({
        type: "error",
        message: err.message,
        duration: 5000,
      });
      console.log(err);
    }
    finally{
      setIsLoading(false);
    }
    
  }
  return (
    <div className="text-white text-center  flex flex-col md:items-center md:justify-center h-[120vh] md:h-[90vh] w-10/12 md:w-auto mt-10 md:mt-auto  mx-auto">
      <Background />
      {isLoading && <Loading/>}
      <div className="z-50 border border-white/20 bg-[#060607]  rounded-lg p-5">
     

        <div className=" text-left">
          <h2 className="text-2xl font-bold pb-2">Sign Up</h2>
          <p className="text-sm text-white/60">
            Enter your details to create your account
          </p>
        </div>
        <form className="flex flex-col gap-5 pt-10">
          <div className="flex gap-5 flex-col md:flex-row">
            <div>
              <label
                htmlFor="title"
                className=" text-left block text-sm font-medium leading-6 text-white"
              >
                Title
              </label>
              <select
                name="title"
                onChange={handleChange}
                className=" border border-white/20 bg-[#09090b] rounded-lg p-2 w-[95%] md:w-auto"
              >
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
              </select>
            </div>

            <Input
              type="text"
              name="fname"
              label="First Name"
              placeholder="John"
              onChange={handleChange}
            />

            <Input
              type="text"
              label="Last Name"
              name="lname"
              placeholder="Doe"
              onChange={handleChange}
            />
          </div>

          <Input
            type="email"
            name="email"
            label="Email"
            autoComplete="email"
            placeholder="m@example.com"
            onChange={handleChange}
          />

          <Input
            type="password"
            name="password"
            label="Password"
            autoComplete="password"
            onChange={handleChange}
          />

          <Button onClick={handleSubmit}>Continue</Button>
        </form>

        <p className="text-sm pt-5 px-8">
          Already have an account?{" "}
          <a
            href="/login"
            className=" underline underline-offset-2 hover:text-white/50  transition-all"
          >
            Sign In
          </a>
        </p>
      </div>

      <p className="text-sm pt-5 px-8 z-50">
        By clicking continue, you agree to our{" "}
        <a
          href="#/"
          className=" underline underline-offset-2 hover:text-white/50  transition-all"
        >
          Terms and Conditions
        </a>{" "}
        and{" "}
        <a
          href="/privacy-policy"
          className=" underline underline-offset-2 hover:text-white/50  transition-all"
        >
          Privacy Policy
        </a>
        .
      </p>

      <div className="flex gap-5 flex-col items-center justify-center text-white/20 md:flex-row text-[10px] mt-3 z-50">
        <label
          htmlFor="title"
        >
          To change you role
        </label>
        <select
          name="role"
          onChange={handleChange}
          className=" border border-white/10 bg-[#09090b] rounded-lg p-2  md:w-auto"
        >
          <option value="user" className="text-white">User</option>
          <option value="author" className="text-white">Author</option>
          <option value="admin"  disabled>Admin</option>
        </select>
      </div>
    </div>
  );
};

export default SignupPage;
