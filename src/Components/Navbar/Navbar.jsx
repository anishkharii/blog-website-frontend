import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import Avatar from "./Avatar";
import SmallDeviceMenu from "./SmallDeviceMenu";
import LogoAndLinks from "./LogoAndLinks";
import '../../index.css';
import { useAuth } from "../../Hooks/useAuth";

const Navbar = () => {
  const {isAuthenticated, userDetails} = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [menuItems, setMenuItems] = useState([
    { href: "/", name: "Home", current: true },
    { href: "/blogs", name: "Blogs", current: false },
    { href: "/about", name: "About Us", current: false },
    { href: "/contact", name: "Contact", current: false },
  ]);

  const handleItemClick = (index) => {
    setMenuItems(menuItems.map((item, i) => ({
      ...item,
      current: i === index,
    })));
    setMenuOpen(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="flex items-center justify-between h-14 text-white top-0 z-[1000] sticky px-4 border-b border-white/20 shadow-white bg-primary bg-opacity-30 backdrop-blur-lg">
        <LogoAndLinks
          menuItems={menuItems}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          onItemClick={handleItemClick}
        />
        {isAuthenticated ? (
          <Avatar name={userDetails.name} />
        ) : (
          <div className="md:flex gap-5">
            <Button variant="outline" className="hidden md:block">
              <Link to="/logIn">Login</Link>
            </Button>
            <Button>
              <Link to="/signUp">Sign Up</Link>
            </Button>
          </div>
        )}
      </nav>
      {menuOpen && (
        <div ref={menuRef}>
          <SmallDeviceMenu
            menuItems={menuItems}
            onItemClick={handleItemClick}
          />
        </div>
      )}
    </>
  );
};

export default Navbar;
