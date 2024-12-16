import React from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button";

const SmallDeviceMenu = ({ menuItems, onItemClick, isLoggedIn }) => {
  return (
    <ul className=" bg-[#09090b] flex flex-col items-center border-b border-white/20 transition-all md:hidden">
      {menuItems.map((item, i) => (
        <Link
          className={`${
            item.current ? "bg-[#3c3c3f] " : " hover:bg-[#3c3c3f]"
          } text-white w-[95%] text-left  my-[3px] px-5 py-1 mx-2 rounded-md  transition-all `}
          to={item.href}
          onClick={() => onItemClick(i)}
          key={i}
        >
          {item.name}
        </Link>
      ))}
      {!isLoggedIn && (
        <Link to="/logIn">
          <Button varient='outline'>
            Login
          </Button>
        </Link>
      )}
    </ul>
  );
};

export default SmallDeviceMenu;
