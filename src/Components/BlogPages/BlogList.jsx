import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import PrivateBlogComponent from "./PrivateBlogComponent";
import { useQuery } from "@tanstack/react-query";
import { useShowAllBlogs } from "../../Hooks/useBlogActions";
import BlogComponent from "./BlogComponent";
import Footer from "../MainPages/Footer";

const BlogList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("new");
  const [blogs, setBlogs] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const limit = 12;

  const fetchBlogs = async ({ page, sort }) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/blogs?page=${page}&limit=${limit}&sort=${sort}`
    );
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };

  const { data, isLoading, error, refetch, isFetching } = useShowAllBlogs({page, sort});


  // Initial + load more fetching
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const result = await fetchBlogs({ page, sort });
        if (page === 1) {
          setBlogs(result.data);
        } else {
          setBlogs((prev) => [...prev, ...result.data]);
        }

        if (result.data.length < limit) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadBlogs();
  }, [page, sort]);

  // Handlers
  const handleFilterChange = (value) => {
    setPage(1);
    if(value === "public"){
      setFilter("true");
    } else if(value === "private"){
      setFilter("false");
    }
    else{
      setFilter("all");
    }
  };

  const handleSortChange = (value) => {
    setPage(1);
    setSort(value);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };


  return (
    <div className="p-4 space-y-6">
    <h1 className="text-secondary text-3xl font-bold">Blogs</h1>
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="rounded-md border border-border bg-primary p-2 text-secondary md:w-auto max-w-36"
          >
            <option value="new">Newest</option>
            <option value="old">Oldest</option>
            <option value="views">Most Viewed</option>
          </select>
        </div>

        
      </div>

      {/* Blog List */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {error ? (
          <h1 className="text-xl text-center text-red-500">Error loading blogs</h1>
        ) : blogs.length === 0 ? (
          <h1 className="text-2xl text-center text-primary">No Blogs Found</h1>
        ) : (
          blogs.map((blog) => (
            <BlogComponent key={blog._id} blog={blog} />
          ))
        )}
      </div>

      {/* Load More */}
      {hasMore && blogs.length > 0 && (
        <div className="flex justify-center">
          <Button onClick={handleLoadMore} disabled={isFetching}>
            {isFetching ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default BlogList;
