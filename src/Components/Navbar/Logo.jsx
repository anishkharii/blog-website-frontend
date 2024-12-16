import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link to="/">
        <h1 className="text-2xl font-bold font-sans">TechTales</h1>
      </Link>
    </div>
  );
};

export default Logo;
