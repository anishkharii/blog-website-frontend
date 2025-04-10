import React from "react";
import { Link } from "react-router-dom";

const Logo = ({size='small'}) => {
  return (
    <div>
      <Link
          to="/"
          className={`flex items-center space-x-2 font-heading ${size==="small"?"text-xl":"text-3xl"} font-bold text-accent`}
        >
          <span>TechTales</span>
        </Link>
    </div>
  );
};

export default Logo;
