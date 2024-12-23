import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
const Input = ({ label, forgotRequired, eyeRequired=true, type, className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  if (type === "password") {
    return (
      <div className="flex flex-col px-2 text-left">
        <div className="flex justify-between pb-1">
          {label && <label htmlFor={label}>{label}</label>}
          {forgotRequired && (
            <Link
              to="/forgot-password"
              className="  text-white/80 text-sm hover:text-white hover:underline transition-all"
            >
              Forgot Your Password?
            </Link>
          )}
        </div>
        <div
          className={` ${className} ${
            isFocused && "border-white"
          } flex items-center justify-start  rounded-md p-1 overflow-hidden bg-[#060607] border border-white/20  `}
        >
          <input
            {...props}
            type={showPassword ? "text" : "password"}
            className={` bg-transparent outline-none w-full m-1 text-white/80 `}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoComplete="off"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className=" hover:cursor-pointer hover:text-white/80"
          >
            {eyeRequired && (showPassword ? <Eye className="m-1" /> : <EyeOff className="m-1" />)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-2 text-left">
      {label && <label htmlFor={label}>{label}</label>}
      <input
        {...props}
        type={type}
        className={`${className} transition-all duration-200 outline-none focus:border-white p-2 rounded-md  bg-[#060607] border border-white/20  `}
      />
    </div>
  );
};

export default Input;
