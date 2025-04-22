import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import PrivateBlogComponent from "./PrivateBlogComponent";
import { useQuery } from "@tanstack/react-query";
import { useShowAllBlogs } from "../../Hooks/useBlogActions";

const PrivateBlogList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("new");
  const [blogs, setBlogs] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const limit = 12;

  const fetchBlogs = async ({ page, filter, sort }) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/blogs?page=${page}&limit=${limit}&filter=${filter}&sort=${sort}`
    );
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };

  const { data, isLoading, error, refetch, isFetching } = useShowAllBlogs({page, filter, sort});


  // Initial + load more fetching
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const result = await fetchBlogs({ page, filter, sort });
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
  }, [page, filter, sort]);

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
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="rounded-md border border-border bg-primary p-2 text-secondary md:w-auto max-w-36"
          >
            <option value="all">All</option>
            <option value="public">Published</option>
            <option value="private">Unpublished</option>
          </select>

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

        {/* Create Blog Button */}
        <div className="w-full md:w-auto">
          <Button onClick={() => navigate("/add-blog")}>Create Blog</Button>
        </div>
      </div>

      {/* Blog List */}
      <div className="flex flex-col gap-3">
        {error ? (
          <h1 className="text-xl text-center text-red-500">Error loading blogs</h1>
        ) : blogs.length === 0 ? (
          <h1 className="text-2xl text-center text-primary">No Blogs Found</h1>
        ) : (
          blogs.map((blog) => (
            <PrivateBlogComponent key={blog._id} blog={blog} />
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
    </div>
  );
};

export default PrivateBlogList;
