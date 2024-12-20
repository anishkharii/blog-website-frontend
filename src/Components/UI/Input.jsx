import React from "react";
import { Link } from "react-router-dom";

const Input = ({ label, forgotRequired, type, className, ...props }) => {
  return (
    <div className="flex flex-col px-2 text-left">
      {type === "password" && forgotRequired === true ? (
        <div className="flex justify-between text-sm pb-1">
          {label && <label htmlFor={props.label}>{label}</label>}
          <Link
            to="/forgot-password"
            className="text-white/80 hover:text-white hover:underline transition-all"
          >
            Forgot Your Password?
          </Link>
        </div>
      ) : (
        <>{label && <label htmlFor={label}>{label}</label>}</>
      )}

      <input
        {...props}
        type={type}
        className={`${className} p-2 rounded-md  bg-[#060607] border border-white/20  `}
      />
    </div>
  );
};

export default Input;
