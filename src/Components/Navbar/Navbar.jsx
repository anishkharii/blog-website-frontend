import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Sun, Moon, Search, Menu, X } from "lucide-react";

import AvatarMenu from "./AvatarMenu";
import { toggleTheme } from "../../Redux/themeSlice";
import Button from "../UI/Button";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const navRef = useRef(null);

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.user?.role);
  const theme = useSelector((state) => state.theme.theme);
  

  const handleOpenSearch = () => {
    setSearchOpen((prev) => !prev);
    setMenuOpen(false);
  };

  const handleOpenMenu = () => {
    setMenuOpen((prev) => !prev);
    setSearchOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark" : "light";
  }, [theme]);

  const getLinksByRole = () => {
    switch (role) {
      case "admin":
        return [
          { name: "Home", link: "/" },
          { name: "Dashboard", link: "/dashboard" },
          { name: "Manage Blogs", link: "/manage-blogs" },
          { name: "Manage Users", link: "/manage-users" },
        ];
      case "author":
        return [
          { name: "Home", link: "/" },
          { name: "Blogs", link: "/blogs" },
          { name: "My Blogs", link: "/my-blogs" },
          { name: "Write Blog", link: "/add-blog" },
        ];
      default:
        return [
          { name: "Home", link: "/" },
          { name: "Blogs", link: "/blogs" },
          { name: "About", link: "/about" },
          { name: "Contact", link: "/contact" },
        ];
    }
  };

  const navClasses = `fixed top-0 w-full z-[999] font-sans transition-all duration-300 ${
    scrolled
      ? `mt-2 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.25)] ${
          !menuOpen
            ? "backdrop-blur-md bg-white/80 hover:bg-white dark:bg-[rgba(23,23,23,0.7)] dark:hover:bg-[rgba(23,23,23,0.9)]"
            : "bg-primary dark:bg-[#181818]"
        }`
      : "mt-0 rounded-none bg-white dark:bg-[#121212] shadow-md"
  }`;

  const menuLinks = getLinksByRole();

  return (
    <nav ref={navRef} className={navClasses}>
      <div className="max-w-8xl mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 font-heading text-xl font-bold text-accent">
          <span>TechTales</span>
        </Link>

        {/* Desktop Nav */}
        <div className="ml-8 hidden lg:flex items-center space-x-6">
          {menuLinks.map((link, i) => (
            <Link
              key={i}
              to={link.link}
              className="group relative font-medium text-secondary transition"
            >
              {link.name}
              <span
                className={`absolute -bottom-0.5 left-0 h-[2px] w-full transform bg-accent transition-transform duration-300 ${
                  location.pathname === `${link.link}` ? "scale-x-100" : "scale-x-0"
                } group-hover:scale-x-100`}
              ></span>
            </Link>
          ))}
        </div>

        {/* Desktop Search */}
        <div className="hidden max-w-md flex-grow px-4 md:block">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full rounded-full border border-border bg-bg_light px-4 py-2 text-secondary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Right Section */}
        <div className="ml-auto hidden lg:flex space-x-4 items-center">
          <Button variant="simple" onClick={() => dispatch(toggleTheme())}>
            {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </Button>
          {isLoggedIn ? (
            <AvatarMenu />
          ) : (
            <>
              <Button to="/login" variant="secondary">Login</Button>
              <Button to="/signup">Sign Up</Button>
            </>
          )}
        </div>

        {/* Mobile Right Controls */}
        <div className="flex items-center gap-4 lg:hidden">
          <button onClick={handleOpenSearch}><Search className="h-6 w-6 text-secondary" /></button>
          <Button variant="simple" onClick={() => dispatch(toggleTheme())}>
            {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </Button>
          {isLoggedIn ? (
            <AvatarMenu />
          ) : (
            <Link to="/signup">
              <button className="rounded-full bg-secondary px-4 py-2 font-medium text-primary hover:bg-accent">
                Sign Up
              </button>
            </Link>
          )}
          <button onClick={handleOpenMenu}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && (
        <div className="px-4 pb-4 md:px-6 lg:hidden">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search blogs..."
            className="w-full rounded-full border border-accent bg-white/80 px-4 py-2 text-secondary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="px-4 pb-4 md:px-6 lg:hidden">
          <div className="flex flex-col space-y-4 pl-5">
            {menuLinks.map((link, i) => (
              <Link
                key={i}
                to={link.link}
                onClick={() => setMenuOpen(false)}
                className="group relative font-medium text-secondary transition"
              >
                {link.name}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[2px] w-full transform bg-accent transition-transform duration-300 ${
                    location.pathname === `${link.link}` ? "scale-x-100" : "scale-x-0"
                  } group-hover:scale-x-100`}
                ></span>
              </Link>
            ))}
          </div>
          {!isLoggedIn && (
            <Link to="/login">
              <button className="mt-5 w-full rounded-full border border-secondary px-4 py-2 font-medium text-secondary hover:bg-accent hover:text-primary">
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;






// import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import Button from "../UI/Button";
// import Avatar from "./Avatar";
// import SmallDeviceMenu from "./SmallDeviceMenu";
// import LogoAndLinks from "./LogoAndLinks";
// import "../../index.css";
// import { useAuth } from "../../Contexts/AuthContext";
// import Loading from "../Loading";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "../../Contexts/ThemeContext";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { isAuthenticated, userDetails, loading } = useAuth();
//   const {theme, toggleTheme} = useTheme();
//   const menuRef = useRef(null);

//   const [menuItems, setMenuItems] = useState([]);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
//   useEffect(() => {

//     if (userDetails.role === "admin") {
//       setMenuItems([
//         { name: "Home", link: "/", current: true },
//         { name: "Dashboard", link: "/dashboard", current: false },
//         { name: "Manage Blogs", link: "/manage-blogs", current: false },
//         { name: "Manage Users", link: "/manage-users", current: false }
//       ]); 
//     } else if (userDetails.role === "author") {
//       setMenuItems([
//         { name: "Home", link: "/", current: true },
//         { name: "Blogs", link: "/blogs", current: false },
//         { name: "My Blogs", link: "/my-blogs", current: false },
//         { name: "Write Blog", link: "/add-blog", current: false },
//         { name: "Contact Us", link: "/contact", current: false },
//       ]);
//     } else {
//       setMenuItems([
//         { name: "Home", link: "/", current: true },
//         { name: "Blogs", link: "/blogs", current: false },
//         { name: "Contact Us", link: "/contact", current: false },
//       ]);
//     }
//   }, [userDetails.role, isAuthenticated]); 

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleItemClick = (index) => {
//     setMenuItems((prevItems) =>
//       prevItems.map((item, i) => ({
//         ...item,
//         current: i === index,
//       }))
//     );
//     setMenuOpen(false);
//   };


//   return (
//     <>
//     <nav className={`fixed top-0 w-full z-[999] font-sans text-secondary transition-all duration-300 ${
//         scrolled
//           ? 'mt-1 rounded-xl bg-[rgba(255,255,255,0.9)] backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.25)]'
//           : 'mt-0 rounded-none bg-white shadow-[0_0px_10px_rgba(0,0,0,0.15)]'
//       }`}>
//   <div className="flex items-center justify-around px-4 md:px-8 py-3">

//     {/* Left: Logo + Links */}
//     <div className="flex items-center space-x-8">
//       {/* Logo */}
//       <Link to="/" className="flex items-center space-x-2 font-heading text-xl font-bold text-secondary">
//         <span>TechTales</span>
//       </Link>

//       {/* Nav Links */}
//       <div className="hidden md:flex space-x-6 ml-4">
//         <Link to="/" className="hover:text-accent transition font-medium">Home</Link>
//         <Link to="/blogs" className="hover:text-accent transition font-medium">Blogs</Link>
//         <Link to="/contact" className="hover:text-accent transition font-medium">Contact</Link>
//         <Link to="/about" className="hover:text-accent transition font-medium">About Us</Link>
//       </div>
//     </div>

//     {/* Center: Search Bar */}
//     <div className="flex-grow ml-16 px-6 max-w-md">
//       <input
//         type="text"
//         placeholder="Search blogs..."
//         className="w-full px-4 py-2 rounded-full border border-accent bg-white/70 text-secondary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
//       />
//     </div>

//     {/* Right: Auth Buttons */}
//     <div className="flex space-x-4 ml-auto">
//       <Button to="/login" variant="secondary" >
//         Login
//       </Button>
//       <Button to="/signup">
//         Signup
//       </Button>
//     </div>

//   </div>
// </nav>


//       {/* <nav className="flex items-center justify-between h-14 text-white top-0 z-[1000] sticky px-4 border-b border-white/20 shadow-white bg-primary bg-opacity-30 backdrop-blur-lg">
//         <LogoAndLinks
//           menuItems={menuItems}
//           menuOpen={menuOpen}
//           setMenuOpen={setMenuOpen}
//           onItemClick={handleItemClick}
//         />
//         {
//           !loading && (
//             <>
//             {isAuthenticated   ? (
//           <Avatar name={userDetails.name} />
//         ) : (
//           <div className="flex md:gap-5">
//             <Button variant="outline" className="scale-[0.8] md:scale-100">
//               <Link to="/logIn">Login</Link>
//             </Button>
//             <Button>
//               <Link to="/signUp">Sign Up</Link>
//             </Button>
//           </div>
//         )}
//             </>
//           )
//         }
        
//       </nav> */}
//       {/* {menuOpen && (
//         <div ref={menuRef} className="sticky top-14 z-[1000] transition-all ">
//           <SmallDeviceMenu
//             menuItems={menuItems}
//             onItemClick={handleItemClick}
//           />
//         </div>
//       )} */}
//     </>
//   );
// };

// export default Navbar;
