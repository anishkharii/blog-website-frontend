import { Menu, X } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';
import Logo from './Logo';

const LogoAndLinks = ({menuItems, menuOpen, setMenuOpen, onItemClick}) => {
    
      
  return (
    <div className=" flex gap-5 items-center flex-row-reverse md:flex-row justify-between w-[55%] md:w-auto">
          <Logo/>
          <ul className="hidden md:flex gap-5">
            {menuItems.map((item, i) => (
              <Link
                to={item.href}
                onClick={() => onItemClick(i)}
                className={` ${
                  item.current ? "" : "hover:bg-[#3c3c3f]"
                } px-2 py-1 rounded-md transition-all ${
                  item.current && " bg-[#3c3c3f]"
                }`}
                key={i}
              >
                {item.name}
              </Link>
            ))}
          </ul>
          <div className="flex gap-5 cursor-pointer md:hidden">
            {menuOpen ? (
              <X onClick={() => setMenuOpen(!menuOpen)} />
            ) : (
              <Menu onClick={() => setMenuOpen(!menuOpen)} />
            )}
          </div>
        </div>
  )
}

export default LogoAndLinks