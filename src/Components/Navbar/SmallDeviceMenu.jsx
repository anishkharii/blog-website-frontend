import React from "react";
import { Link, useActionData } from "react-router-dom";
import Button from "../UI/Button";
import { useAuth } from "../../Contexts/AuthContext";

const SmallDeviceMenu = ({ menuItems, onItemClick }) => {
  const {isAuthenticated} = useAuth();
  return (
    <ul className="bg-[#060607] z-[1000] sticky text-left items-center top-14 left-0 w-full flex flex-col  border-b border-white/20 transition-all md:hidden py-1 shadow-lg">
      {menuItems.map((item, i) => (
        
        <Link
          to={item.link}
          className={`${
            item.current ? "bg-[#3c3c3f]" : "hover:bg-[#3c3c3f]"
          } text-white w-[90%] text-center my-2 py-2 rounded-md transition-all`}
          onClick={() => onItemClick(i)}
          key={i}
        >
          {item.name}
        </Link>
      ))}
      {/* {!isAuthenticated && (
        <Link to="/logIn"  className="w-[90%] my-2">
          <Button variant="outline" className="w-full">
            Login
          </Button>
        </Link>
      )} */}
    </ul>
  );
};

export default SmallDeviceMenu;
