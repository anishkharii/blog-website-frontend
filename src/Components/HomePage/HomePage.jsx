import React, { useEffect, useState } from "react";
import Input from "../UI/Input";
import Footer from "../MainPages/Footer";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import BlogComponent from "../BlogPages/BlogComponent";
import Pagination from "../UI/Pagination";

import { BlogSkeleton } from './BlogSkeleton';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs?page=${page}`);
        console.log(res)
        const data = await res.json();
        console.log(data)
        if (!data.status) return;

        setBlogs(data.data);
        setTotalBlogs(data.total); 
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen text-white">
      <main className="container mx-auto flex-grow py-8 px-4 z-50">
        <div className="flex justify-center mb-6">
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search blogs..."
            className="w-11/12 md:w-96"
          />
        </div>

        <section>
          <h3 className="text-2xl font-semibold mb-4">Recent Blogs</h3>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 10 }).map((_, index) => (
                <BlogSkeleton key={index} />
              ))}
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <BlogComponent blog={blog} key={blog._id} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No blogs found matching your search.
            </p>
          )}
        </section>

        <Pagination currPage={page} totalBlogs={totalBlogs} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
