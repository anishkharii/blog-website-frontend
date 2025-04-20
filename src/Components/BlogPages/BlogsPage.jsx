import React, { useEffect, useState } from 'react'
import BlogList from './BlogList'
import { useSearchParams } from 'react-router-dom';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("new");
  const [totalBlogs, setTotalBlogs] = useState(0);

  const [searchQuery, setSearchQuery] = useSearchParams()

  const page = parseInt(searchQuery.get("page")) || 1;

   useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const res = await fetch(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/blogs?page=${page}&${filter === "all" ? "" : `isPublished=${filter === "public" ? true : false}`}&sort=${sort}`
          );
          const data = await res.json();
          if (!data.status) return;
  
          setBlogs(data.data);
          setTotalBlogs(data.total);
        } catch (err) {
          console.error("Failed to fetch blogs:", err);
        }
      };
  
      fetchBlogs();
    }, [page, filter, sort]);


  return (
    <div className="text-white flex flex-col items-center justify-center  ">
      <h1 className="text-4xl font-bold mb-5">Blogs</h1>
      <BlogList blogs={blogs} onFilter={setFilter} onSort={setSort} totalBlogs={totalBlogs} page={page} />
    </div>
  )
}

export default BlogsPage