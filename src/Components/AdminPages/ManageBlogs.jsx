import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useNotification } from "../../Contexts/NotificationContext";
import PrivateBlogList from "../BlogPages/PrivateBlogList";



const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("new");
  const [totalBlogs, setTotalBlogs] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;


  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/blogs?${
            filter === "all"
              ? ""
              : `isPublished=${filter === "public" ? true : false}`
          }&sort=${sort}&page=${page}`
        );
        const data = await res.json();
        if (!data.status) return;

        setBlogs(data.data);
        setTotalBlogs(data.total);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    }
    fetchBlogs();
  }, [filter, sort, page]);

  return (
    <div className="text-white flex flex-col items-center justify-center p-5 ">
      <h1 className="text-4xl font-bold mb-5">Manage Blogs</h1>
      <PrivateBlogList blogs={blogs} onFilter={setFilter} onSort={setSort} totalBlogs={totalBlogs} page={page} />
    </div>
  );
};

export default ManageBlogs;
