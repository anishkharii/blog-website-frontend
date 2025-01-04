import { Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import PrivateBlogList from "../BlogPages/PrivateBlogList";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("new");
  const [totalBlogs, setTotalBlogs] = useState(0);
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/blogs?userId=${localStorage.getItem("id")}&sort=${sort}&${
            filter === "all"
              ? ""
              : `isPublished=${filter === "public" ? true : false}`
          }`
        );
        const data = await res.json();
        if (!data.status) return;

        setBlogs(data.data);
        setTotalBlogs(data.total);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    }
    fetchBlogs();
  }, []);

  const getDate = (date) => {
    const newDate = new Date(date).toDateString();
    return newDate;
  };
  return (
    <div className="text-white flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold text-center">My Blogs</h1>

      <PrivateBlogList
        blogs={blogs}
        onFilter={setFilter}
        onSort={setSort}
        totalBlogs={blogs.length}
        page={1}
      />
    </div>
  );
};

export default MyBlogs;
