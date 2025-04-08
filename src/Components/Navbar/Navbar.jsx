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
        <Link
          to="/"
          className="flex items-center space-x-2 font-heading text-xl font-bold text-accent"
        >
          <span>TechTales</span>
        </Link>

        {/* Desktop Nav */}
        <div className="ml-8 hidden items-center space-x-6 lg:flex">
          {menuLinks.map((link, i) => (
            <Link
              key={i}
              to={link.link}
              className="group relative font-medium text-secondary transition"
            >
              {link.name}
              <span
                className={`absolute -bottom-0.5 left-0 h-[2px] w-full transform bg-accent transition-transform duration-300 ${
                  location.pathname === `${link.link}`
                    ? "scale-x-100"
                    : "scale-x-0"
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
        <div className="ml-auto hidden items-center space-x-4 lg:flex">
          <Button variant="simple" onClick={() => dispatch(toggleTheme())}>
            {theme === "dark" ? (
              <Sun className="h-6 w-6" />
            ) : (
              <Moon className="h-6 w-6" />
            )}
          </Button>
          {isLoggedIn ? (
            <AvatarMenu />
          ) : (
            <>
              <Button to="/login" variant="secondary">
                Login
              </Button>
              <Button to="/signup">Sign Up</Button>
            </>
          )}
        </div>

        {/* Mobile Right Controls */}
        <div className="flex items-center justify-center gap-4 lg:hidden">
          <button onClick={handleOpenSearch}>
            <Search className="h-6 w-6 text-secondary" />
          </button>
          <Button variant="simple" onClick={() => dispatch(toggleTheme())}>
            {theme === "dark" ? (
              <Sun className="h-6 w-6" />
            ) : (
              <Moon className="h-6 w-6" />
            )}
          </Button>
          {isLoggedIn ? (
            <AvatarMenu />
          ) : (
            <Button variant="small_primary" to="/signup">
              Signup
            </Button>
          )}
          <Button variant="simple" onClick={handleOpenMenu}>
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
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
          <div className="flex flex-col items-start space-y-4 pl-5">
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
                    location.pathname === `${link.link}`
                      ? "scale-x-100"
                      : "scale-x-0"
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
