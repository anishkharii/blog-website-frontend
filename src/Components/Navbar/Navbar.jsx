import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import Avatar from "./Avatar";
import SmallDeviceMenu from "./SmallDeviceMenu";
import LogoAndLinks from "./LogoAndLinks";

const Navbar = ({isLoggedIn}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([
    { href: "/  ", name: "Home", current: true },
    { href: "/blogs", name: "Blogs", current: false },
    { href: "/about", name: "About Us", current: false },
    { href: "/contact", name: "Contact", current: false },
  ]);
  function handleItemClick(index) {
    const updatedItems = menuItems.map((item, i) => ({
      ...item,
      current: i === index,
    }));
    setMenuItems(updatedItems);
  }

  return (
    <>
      <nav className=" flex items-center justify-between h-14 text-white top-0 z-50 sticky px-4 border-b border-white/20 shadow-white bg-[#09090b]/90 backdrop-blur-[2px] ">
      
        <LogoAndLinks
          menuItems={menuItems}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          onItemClick={handleItemClick}
        />

        {isLoggedIn ? (
          <Avatar />
        ) : (
          <div className=" md:flex gap-5">
            <Button varient="outline" className='hidden md:block'>
              <Link to="/logIn">Login</Link>
            </Button>
            <Button>
              <Link to="/signUp">Sign Up</Link>
            </Button>
          </div>
        )}
      </nav>

      {menuOpen && (
        <SmallDeviceMenu
          menuItems={menuItems}
          onItemClick={handleItemClick}
          isLoggedIn={isLoggedIn}
        />
      )}
    </>
  );
};

export default Navbar;
