import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Avatar = ({ name }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const userMenuItems = [
    { href: "/profile", name: "Your Profile", current: false },
    { href: "/sign-out", name: "Sign Out", current: false },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={userMenuRef}>
      <div
        className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer"
        onClick={() => setUserMenuOpen(!userMenuOpen)}
      >
        {name.charAt(0).toUpperCase()}
      </div>
      {userMenuOpen && (
        <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
          {userMenuItems.map((item, i) => (
            <li key={i}>
              <Link
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
                to={item.href}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Avatar;