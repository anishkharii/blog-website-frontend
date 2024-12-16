import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Background from "../LoginPage/Background";
const SignupPage = ({ onTriggerNotification}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    title: "Mr",
    email: "",
    password: "",
    role: "user",
  });

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
      const res = await fetch("http://localhost:8080/add-author", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      onTriggerNotification({
        type: data.status ? "success" : "error",
        message: data.msg,
        duration: 5000,
      });
      if (data.status === true) {
        navigate(`/otp-verification/${data.data.id}`);
      }
    }catch(err){
      onTriggerNotification({
        type: "error",
        message: err.message,
        duration: 5000,
      });
      console.log(err);
    }
    
  }
  return (
    <div className="text-white text-center  flex flex-col md:items-center md:justify-center h-[120vh] md:h-[90vh] w-10/12 md:w-auto mt-10 md:mt-auto  mx-auto">
      <Background top={-200} left={250} />
      <div className=" border border-white/20 bg-[#09090b]  rounded-lg p-5">
     

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
          href="/privacy-policy"
          className=" underline underline-offset-2 hover:text-white/50  transition-all"
        >
          Privacy Policy
        </a>
        .
      </p>

      <div className="flex gap-5 flex-col items-center justify-center text-white/10 md:flex-row text-[10px] mt-3">
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
          <option value="Author" className="text-white">Author</option>
          <option value="Admin"  disabled>Admin</option>
        </select>
      </div>
    </div>
  );
};

export default SignupPage;
