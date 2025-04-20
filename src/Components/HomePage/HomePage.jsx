import React, { useState } from "react";
import Input from "../UI/Input";
import Footer from "../MainPages/Footer";
import { useSearchParams } from "react-router-dom";
import BlogComponent from "../BlogPages/BlogComponent";
import Pagination from "../UI/Pagination";
import { BlogSkeleton } from "./BlogSkeleton";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {

  const { isLoading, data, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/blogs`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch blogs");
      }
      return res.json();
    },
  });

  const blogs = data?.data || [];
  const totalBlogs = data?.total || 0;



  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen ">
  <main className="container mx-auto flex-grow py-8 px-4 z-50">
    <section>
      <h3 className="text-2xl font-semibold mb-6 text-dark_accent">Recent Blogs</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <BlogSkeleton key={index} />
          ))
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogComponent blog={blog} key={blog._id} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted text-lg">No blogs found matching your search.</p>
          </div>
        )}
      </div>
    </section>

    <div className="mt-10">
      {/* <Pagination currPage={page} totalBlogs={totalBlogs} /> */}
    </div>
  </main>

  <Footer />
</div>

  );
};

export default HomePage;
