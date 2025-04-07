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
              className="  text-secondary/80 text-sm hover:text-accent hover:underline transition-all"
            >
              Forgot Your Password?
            </Link>
          )}
        </div>
        <div
          className={` ${className} ${
            isFocused && "border-border"
          } flex items-center justify-start  rounded-md p-1 overflow-hidden bg-primary border border-border/20  `}
        >
          <input
            {...props}
            type={showPassword ? "text" : "password"}
            className={` bg-transparent outline-none w-full m-1 text-secondary/80 `}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoComplete="off"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className=" hover:cursor-pointer hover:text-secondary/80"
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
        className={`${className} disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 outline-none focus:border-border p-2 rounded-md  bg-primary border border-secondary/20  `}
      />
    </div>
  );
};

export default Input;
