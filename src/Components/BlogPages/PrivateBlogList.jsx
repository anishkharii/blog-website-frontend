import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import PrivateBlogComponent from "./PrivateBlogComponent";
import Pagination from "../UI/Pagination";

const PrivateBlogList = ({ blogs, onFilter, onSort, totalBlogs, page }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          {/* Filter Dropdown */}
          <select
            onChange={(e) => onFilter(e.target.value)}
            className="rounded-md border border-border bg-primary p-2 text-secondary  md:w-auto max-w-36"
            name="filter"
            id="filter"
          >
            <option value="all">All</option>
            <option value="public">Published</option>
            <option value="private">Unpublished</option>
          </select>

          {/* Sort Dropdown */}
          <select
            onChange={(e) => onSort(e.target.value)}
            className="rounded-md border border-border bg-primary p-2 text-secondary  md:w-auto max-w-36"
            name="sort"
            id="sort"
          >
            <option value="new">Newest</option>
            <option value="old">Oldest</option>
            <option value="views">Most Viewed</option>
          </select>
        </div>

        {/* Create Blog Button */}
        <div className="w-full md:w-auto">
          <Button
            onClick={() => navigate("/add-blog")}
            className=" md:w-auto"
          >
            Create Blog
          </Button>
        </div>
      </div>

      {/* Blog List */}
      <div className="flex flex-col gap-3">
        {blogs.length === 0 ? (
          <h1 className="text-2xl text-center text-white">No Blogs Found</h1>
        ) : (
          blogs.map((blog, i) => (
            <PrivateBlogComponent key={i} blog={blog} />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalBlogs > 10 && (
        <div className="flex justify-center">
          <Pagination totalBlogs={totalBlogs} currPage={page} />
        </div>
      )}
    </div>
  );
};


export default PrivateBlogList;
