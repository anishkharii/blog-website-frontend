import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import Avatar from "./Avatar";
import SmallDeviceMenu from "./SmallDeviceMenu";
import LogoAndLinks from "./LogoAndLinks";
import "../../index.css";
import { useAuth } from "../../Contexts/AuthContext";
import Loading from "../Loading";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../Contexts/ThemeContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, userDetails, loading } = useAuth();
  const {theme, toggleTheme} = useTheme();
  const menuRef = useRef(null);

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {

    if (userDetails.role === "admin") {
      setMenuItems([
        { name: "Home", link: "/", current: true },
        { name: "Dashboard", link: "/dashboard", current: false },
        { name: "Manage Blogs", link: "/manage-blogs", current: false },
        { name: "Manage Users", link: "/manage-users", current: false }
      ]); 
    } else if (userDetails.role === "author") {
      setMenuItems([
        { name: "Home", link: "/", current: true },
        { name: "Blogs", link: "/blogs", current: false },
        { name: "My Blogs", link: "/my-blogs", current: false },
        { name: "Write Blog", link: "/add-blog", current: false },
        { name: "Contact Us", link: "/contact", current: false },
      ]);
    } else {
      setMenuItems([
        { name: "Home", link: "/", current: true },
        { name: "Blogs", link: "/blogs", current: false },
        { name: "Contact Us", link: "/contact", current: false },
      ]);
    }
  }, [userDetails.role, isAuthenticated]); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (index) => {
    setMenuItems((prevItems) =>
      prevItems.map((item, i) => ({
        ...item,
        current: i === index,
      }))
    );
    setMenuOpen(false);
  };


  return (
    <>
      <nav className="flex items-center justify-between h-14 text-white top-0 z-[1000] sticky px-4 border-b border-white/20 shadow-white bg-primary bg-opacity-30 backdrop-blur-lg">
        <LogoAndLinks
          menuItems={menuItems}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          onItemClick={handleItemClick}
        />
        {/* {
          theme === "dark" ? (
            <Sun
              className="text-white cursor-pointer"
              onClick={() => toggleTheme("light")}
            />
          ) : (
            <Moon
              className="text-white cursor-pointer"
              onClick={() => toggleTheme("dark")}
            />
          )
        } */}
        {
          !loading && (
            <>
            {isAuthenticated   ? (
          <Avatar name={userDetails.name} />
        ) : (
          <div className="flex md:gap-5">
            <Button variant="outline" className="scale-[0.8] md:scale-100">
              <Link to="/logIn">Login</Link>
            </Button>
            <Button>
              <Link to="/signUp">Sign Up</Link>
            </Button>
          </div>
        )}
            </>
          )
        }
        
      </nav>
      {menuOpen && (
        <div ref={menuRef} className="sticky top-14 z-[1000] transition-all ">
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
