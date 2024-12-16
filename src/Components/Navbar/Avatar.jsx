import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Avatar = () => {
    const [userMenuOpen, setUserMenuOpen] = useState(false);   
    const userMenuItems =[
        { href: "/profile", name: "Your Profile", current: false },
        { href: "/sign-out", name: "Sign Out", current: false }
      ]
  return (
    <div>
            <button className="block text-sm underline underline-offset-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                alt=""
                className="w-8 h-8 rounded-full"
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                }}
              />
            </button>
            {userMenuOpen && (
              <ul className="flex flex-col justify-center items-center absolute border-[0.5px] text-sm border-slate-200 bg-white text-black shadow-md top-14 right-5 w-48 rounded-md py-1 ">
                    {userMenuItems.map((item, i) => (
                      <Link
                        className={`  w-full text-left  my-[3px] px-5 py-2 mx-2 hover:bg-slate-100  transition-all `}
                        to={item.href}
                        key={i}
                      >
                        {item.name}
                      </Link>
                    ))}
              </ul>
            )}
          </div>
  )
}

export default Avatar