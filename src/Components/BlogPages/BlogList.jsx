import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import PrivateBlogComponent from "./PrivateBlogComponent";
import Pagination from "../UI/Pagination";
import BlogComponent from "./BlogComponent";

const BlogList = ({ blogs, onFilter, onSort, totalBlogs, page }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="mb-5 flex items-center justify-between">
        <div className="mr-36 flex gap-2">
          <select
            onChange={(e) => onFilter(e.target.value)}
            className="rounded-md border border-white/20 bg-[#060607] p-2 text-white"
            name="filter"
            id="filter"
          >
            <option value="all">All</option>
            <option value="public">Published</option>
            <option value="private">UnPublished</option>
          </select>
          <select
            onChange={(e) => onSort(e.target.value)}
            className="rounded-md border border-white/20 bg-[#060607] p-2 text-white"
            name="sort"
            id="sort"
          >
            <option value="new">Newest</option>
            <option value="old">Oldest</option>
            <option value="views">Most Viewed</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.length === 0 && <h1 className="text-2xl">No Blogs Found</h1>}
        {blogs.map((blog, i) => (
          <BlogComponent key={i} blog={blog} />
        ))}
      </div>

      {totalBlogs > 10 && (
        <Pagination totalBlogs={totalBlogs} currPage={page} />
      )}
    </div>
  );
};

export default BlogList;
