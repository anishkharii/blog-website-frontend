import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/authSlice";
import { Link } from "react-router-dom";
import Button from "../UI/Button";

export default function AvatarMenu() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const avatarUrl = useSelector((state) => state.auth.user.image);
  const toggleMenu = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <img
        src={avatarUrl}
        alt="User Avatar"
        onClick={toggleMenu}
        className="h-10 w-10 cursor-pointer rounded-full border border-accent"
      />
      {open && (
        <div className="absolute right-0 z-50 mt-4 w-40 rounded-md bg-primary p-2 text-center shadow-lg">
          <Link
            to="/profile"
            className="mb-2 block rounded-md px-4 py-2 text-sm font-medium text-secondary hover:bg-bg_light"
            onClick={() => setOpen(false)}
          >
            View Profile
          </Link>
          <Button
            variant="destructive"
            onClick={() => {
              setOpen(false);
              dispatch(removeUser());
            }}
            className={"w-2/3 text-center text-sm"}
          >
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
}
